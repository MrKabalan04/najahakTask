import { useState, useEffect } from 'react';
import { getRequests, createRequest } from '../api/requests';
import RequestTable from '../components/RequestTable';
import '../styles/pages/Dashboard.css';

function Dashboard({ onLogout }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientName, setClientName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRequests();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    setSubmitting(true);
    try {
      const newRequest = await createRequest(clientName.trim());
      setRequests((prev) => [newRequest, ...prev]); // add to top, matches backend sort order
      setClientName('');
    } catch (err) {
      alert('Failed to create request: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Client Requests</h2>
        <button className="logout-button" onClick={onLogout}>
          Log Out
        </button>
      </div>

      <form className="create-request-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Client name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <button className="create-request-button" type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Request'}
        </button>
      </form>

      <RequestTable requests={requests} setRequests={setRequests} />
    </div>
  );
}

export default Dashboard;