import { updateRequestStatus } from '../api/requests';

const STATUS_FLOW = {
  'New': 'In Progress',
  'In Progress': 'Done',
  'Done': 'Done',
};

function RequestTable({ requests, setRequests }) {
  const handleStatusUpdate = async (id, currentStatus) => {
    const nextStatus = STATUS_FLOW[currentStatus];
    if (nextStatus === currentStatus) return; // already Done, nothing to do

    try {
      const updated = await updateRequestStatus(id, nextStatus);
      setRequests((prev) =>
        prev.map((req) => (req._id === updated._id ? updated : req))
      );
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  if (requests.length === 0) {
    return <p>No client requests yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Status</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req._id}>
            <td>{req.clientName}</td>
            <td>{req.status}</td>
            <td>{new Date(req.createdAt).toLocaleDateString()}</td>
            <td>
              <button
                onClick={() => handleStatusUpdate(req._id, req.status)}
                disabled={req.status === 'Done'}
              >
                {req.status === 'Done' ? 'Completed' : `Move to ${STATUS_FLOW[req.status]}`}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RequestTable;