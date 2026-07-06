const BASE_URL = 'http://localhost:5000/api/requests'

export async function getRequests() {
    const res = await fetch(BASE_URL)
    if (!res.ok) {
        throw new Error('Failed to fetch requests')
    }
    return res.json()
}

export async function createRequest(clientName) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientName }),
  });
  if (!res.ok) throw new Error('Failed to create request');
  return res.json();
}

export async function updateRequestStatus(id, status) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}