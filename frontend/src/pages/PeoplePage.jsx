import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditModal from '../components/EditModal';
import '../PeoplePage.css'; // Yeni CSS dosyası


export default function PeoplePage() {
  const navigate = useNavigate();  // ← bunu ekle
  const [people, setPeople] = useState([]);
  const [editPerson, setEditPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPeople = async () => {
  setLoading(true);
  const res = await axios.get('/api/people');
  setPeople(res.data);
  setLoading(false);
};

  useEffect(() => { fetchPeople(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;
    await axios.delete(`/api/people/${id}`);
    fetchPeople();
  };

  if (loading) {
    return (
      <div className="people-loading">
        <div className="spinner"></div>
        <p>Loading people...</p>
      </div>
    );
  }

 return (
    <div className="people-container">
      <div className="people-header">
        <h2>👥 Registered People</h2>
        <button className="btn-add" onClick={() => navigate('/')}>
          ➕ Add New Person
        </button>
      </div>
      
      {people.length === 0 ? (
        <div className="empty-state">
          <p>No people registered yet.</p>
          <button className="btn-add-empty" onClick={() => navigate('/')}>
            Create your first person
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map(p => (
                <tr key={p.id}>
                  <td className="id-cell">#{p.id}</td>
                  <td className="name-cell">{p.full_name}</td>
                  <td className="email-cell">{p.email}</td>
                  <td className="actions-cell">
                    <button 
                      className="action-btn edit-btn" 
                      onClick={() => setEditPerson(p)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editPerson && (
        <EditModal
          person={editPerson}
          onClose={() => setEditPerson(null)}
          onSave={() => { setEditPerson(null); fetchPeople(); }}
        />
      )}
    </div>
  );
}