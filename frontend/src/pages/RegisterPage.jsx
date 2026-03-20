import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: '', email: '' });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation Mantığı
  const validate = () => {
    if (!form.full_name.trim()) return 'Name cannot be empty.';
    if (!form.email.trim()) return 'Email cannot be empty.';
    if (!emailRegex.test(form.email)) return 'Please enter a valid email address.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(`❌ ${validationError}`);
      return;
    }

    try {
      // Proxy ayarın olduğu için direkt /api/people (veya projenin yoluna göre /people)
      await axios.post('/api/people', form);
      setMessage('✅ Person added successfully!');
      setForm({ full_name: '', email: '' });
      
      // Opsiyonel: 2 saniye sonra listeye otomatik yönlendirsin istersen:
      // setTimeout(() => navigate('/people'), 2000);
    } catch (err) {
      const code = err.response?.data?.error;
      if (code === 'EMAIL_ALREADY_EXISTS') {
        setError('❌ This email is already in use by another person.');
      } else {
        setError('❌ An error occurred while saving.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="form-card">
        <h2>✨ Create New Person</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              placeholder="👤 Full Name"
              value={form.full_name}
              onChange={e => setForm({ ...form, full_name: e.target.value })}
              className="styled-input"
            />
          </div>

          <div className="input-wrapper">
            <input
              placeholder="📧 Email Address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="styled-input"
            />
          </div>

          {/* Mesaj Bildirimleri */}
          {message && <div className="status-message success">{message}</div>}
          {error && <div className="status-message error">{error}</div>}

          {/* Buton Grubu - Modern görünüm */}
          <div className="button-group">
            <button type="submit" className="btn btn-save">
              💾 Save Person
            </button>
            <button 
              type="button" 
              className="btn btn-people" 
              onClick={() => navigate('/people')}
            >
              👥 People List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;