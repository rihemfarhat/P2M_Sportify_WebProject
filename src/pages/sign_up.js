import React, { useState } from 'react';
import '../style/sign_up.css';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    height: '',
    weight: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      setSuccess('Account created successfully!');
      console.log(data);
      // Redirection possible après inscription
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='leftsection'>
        <Link to="/" className="logo-link">
          <img src={require('../assets/images/logo.png')} alt="logo" className="logosignup" />
        </Link>
        <h1>Sign Up</h1>
        <p>Let's start with some facts about you</p>
        {error && <p className='error-message'>{error}</p>}
        {success && <p className='success-message'>{success}</p>}
        <form className='formsignup' onSubmit={handleSubmit}>
          <div className='namefields'>
            <div className='input-container'>
              <input type='text' id='firstName' placeholder='First Name' required value={formData.firstName} onChange={handleChange} />
            </div>
            <div className='input-container'>
              <input type='text' id='lastName' placeholder='Last Name' required value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className='input-container'>
            <input type='email' id='email' placeholder='Email' required value={formData.email} onChange={handleChange} />
          </div>
          <div className='input-container'>
            <input type='password' id='password' placeholder='Password' required value={formData.password} onChange={handleChange} />
          </div>
          <div className='input-container'>
            <input type='password' id='confirmPassword' placeholder='Confirm Password' required value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <div className='input-container'>
            <input type='date' id='dob' required value={formData.dob} onChange={handleChange} />
          </div>
          <div className='input-container'>
            <select id='gender' required value={formData.gender} onChange={handleChange}>
              <option value='' disabled>Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </div>
          <div className='namefields'>
            <div className='input-container'>
              <input type='text' id='height' placeholder='Height' required value={formData.height} onChange={handleChange} />
            </div>
            <div className='input-container'>
              <input type='text' id='weight' placeholder='Weight' required value={formData.weight} onChange={handleChange} />
            </div>
          </div>
          <button type='submit' disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
        </form>
        <p className='loginhere'>You already have an account? <Link to='/login'>Login here</Link></p>
      </div>
      <div className='rightsection'>
        <img src={require('../assets/images/signup.jpg')} alt='signup' className='signupimg' style={{ height: '1000px' }} />
        <div className='green-deco'></div>
        <p>Track All of Your <br /> Sports Activity</p>
      </div>
    </div>
  );
}

export default Signup;
