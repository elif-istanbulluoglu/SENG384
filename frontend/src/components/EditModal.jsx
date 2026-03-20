import { useState } from 'react';
import axios from 'axios';

export default function EditModal({ person, onClose, onSave }) {
  const [form, setForm] = useState({ full_name: person.full_name, email: person.email });
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setError(null);
    try {
      await axios.put(`/api/people/${person.id}`, form);
      onSave();
    } catch (err) {
      const code = err.response?.data?.error;
      if (code === 'EMAIL_ALREADY_EXISTS') setError('This email is already in use by another person.');
      else setError('An error occurred.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: 8, minWidth: 350 }}>
        <h3>Edit Person</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            value={form.full_name}
            onChange={e => setForm({ ...form, full_name: e.target.value })}
            placeholder="Full Name"
            style={{ padding: '0.5rem' }}
          />
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            style={{ padding: '0.5rem' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleSave} style={{ padding: '0.5rem 1rem', background: '#2196f3', color: 'white', border: 'none', cursor: 'pointer' }}>
              💾 Save
            </button>
            <button onClick={onClose} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}