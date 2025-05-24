import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const [loading, setLoading] = useState(false);
  
  // Initialiser navigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    // Réinitialisez également l'input file si nécessaire
    document.getElementById('image').value = '';
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
      console.log('Sending data...', formData);
      
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (image) data.append('image', image);
      
      const response = await fetch('http://localhost:5000/api/coach/signup', { 
        method: 'POST',
        body: data,
        // Don't set Content-Type header - FormData sets it automatically with boundary
      });
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }
      
      // Proper token handling
      if (!result.token) {
        throw new Error('No authentication token received');
      }
      
      localStorage.setItem('token', result.token);
      setSuccess('Account created successfully!');
      navigate('/coach_form');
      
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };
    

  return (
    <div className='container'>
      <div className='leftsection'>
        <img src={require('../assets/images/logo.png')} alt='logo' className='logosignup' />
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
          <div className='uploadedimg'>
  <label htmlFor="image">Upload Image</label>
  <input
    type="file"
    id="image"
    accept="image/*"
    onChange={handleImageChange}
  />
  <label htmlFor="image" className="custom-upload">
    <div className="upload-icon">🖼️</div>
    <div className="upload-text">Glissez-déposez votre image ici</div>
    <div className="upload-subtext">ou cliquez pour parcourir</div>
    {selectedImage && (
      <div className="file-preview">
        <span>{selectedImage.name}</span>
        <button type="button" onClick={handleRemoveImage}>×</button>
      </div>
    )}
  </label>
</div>


          <div className='namefields'>
          </div>
          <button type='submit' disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
        </form>
        <p className='loginhere'>You already have an account? <Link to='/login_coach'>Login here</Link></p>
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
