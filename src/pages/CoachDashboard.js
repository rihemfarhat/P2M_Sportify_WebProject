import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/CoachDashboard.css';

function CoachDashboard() {
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [coachName, setCoachName] = useState('');
  const [coachImage, setCoachImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login_coach');

    const firstName = localStorage.getItem('coachFirstName');
    const lastName = localStorage.getItem('coachLastName');
    const image = localStorage.getItem('coachImage');

    if (firstName && lastName) setCoachName(`${firstName} ${lastName}`);
    if (image) setCoachImage(image);

    fetchVideos();
  }, [navigate]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      setVideos(res.data);
    } catch (error) {
      setErrorMsg('Unable to fetch videos.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login_coach');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !duration || !level || (!video && images.length === 0)) {
      return alert('All fields plus at least one video or image are required.');
    }

    const formData = new FormData();
    formData.append('coachName', coachName);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration);
    formData.append('level', level);

    if (video) formData.append('video', video);
    images.forEach((img) => formData.append('images', img));

    try {
      await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchVideos();
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="coach-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="profile-card">
          <div className="avatar pulse">
            {coachImage ? (
              <img src={`http://localhost:5000/uploads/${coachImage}`} alt="Coach" />
            ) : (
              <span>👤</span>
            )}
          </div>
          <h2 className="coach-name">{coachName || "Your Name"}</h2>
          <p className="coach-level">{level || "Level"}</p>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-value">{videos.length}</span>
              <span className="stat-label">Videos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{images.length}</span>
              <span className="stat-label">Images</span>
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="logout-icon">→</span> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        {/* Replace dashboardBanner if you have an image */}
        {/* <img src={dashboardBanner} alt="Dashboard Banner" className="dashboard-banner" /> */}

        <header className="dashboard-header">
          <h1>Coach <span className="highlight">Dashboard</span></h1>
          <div className="tabs">
            <button className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>Upload</button>
            <button className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`} onClick={() => setActiveTab('library')}>Library</button>
          </div>
        </header>

        {activeTab === 'upload' && (
          <section className="upload-section slide-in">
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-grid">
                <div className="form-group floating">
                  <input type="text" value={coachName} disabled />
                  <label>Coach Name</label>
                </div>
                <div className="form-group floating">
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <label>Title</label>
                </div>

                <div className="form-group floating">
                  <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                  <label>Duration</label>
                </div>
                <div className="form-group floating">
                  <select value={level} onChange={(e) => setLevel(e.target.value)} required>
                    <option value="">Select a level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <label>Level</label>
                </div>
                <div className="form-group floating">
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                  <label>Description</label>
                </div>
              </div>

              <div className="file-uploads">
                {/* Video */}
                <div className="upload-card">
                  <label htmlFor="video-upload" className="upload-label">
                    <div className="upload-icon">🎬</div>
                    <h3>Add a video</h3>
                    <p>Supported formats: MP4, MOV</p>
                    {video && (
                      <div className="file-preview">
                        {video.name}
                        <button type="button" onClick={() => setVideo(null)}>×</button>
                      </div>
                    )}
                  </label>
                  <input id="video-upload" type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
                </div>

                {/* Images */}
                <div className="upload-card">
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">🖼️</div>
                    <h3>Add images</h3>
                    <p>Supported formats: JPG, PNG</p>
                    {images.length > 0 && (
                      <div className="file-preview">
                        {images.length} image(s)
                        <button type="button" onClick={() => setImages([])}>×</button>
                      </div>
                    )}
                  </label>
                  <input id="image-upload" type="file" accept="image/*" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
                </div>
              </div>

              <button type="submit" className="submit-btn">Publish</button>
            </form>
          </section>
        )}

        {activeTab === 'library' && (
          <section className="library-section">
            {loading ? (
              <div className="loading-animation">
                <div className="spinner"></div>
                <p>Loading videos...</p>
              </div>
            ) : errorMsg ? (
              <div className="error-message">
                <div className="error-icon">❌</div>
                <p>{errorMsg}</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="empty-library">
                <div className="empty-icon">🎥</div>
                <h3>No videos available</h3>
                <p>Start by uploading your first video</p>
              </div>
            ) : (
              <div className="video-gallery">
                {videos.map((vid) => (
                  <div key={vid._id} className="video-card">
                    <div className="video-container">
                      <video
                        className="video-player"
                        controls
                      >
                        <source src={`http://localhost:5000/uploads/${vid.filename}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">{vid.title}</h3>
                      <div className="video-meta">
                        <span><strong>Duration:</strong> {vid.duration}</span>
                        <span className="video-level">{vid.level}</span>
                      </div>
                      <p className="video-description">{vid.description}</p>

                      {/* Show associated images */}
                      {vid.images && vid.images.length > 0 && (
                        <div className="image-gallery">
                          {vid.images.map((image, index) => (
                            <img
                              key={index}
                              src={`http://localhost:5000/uploads/${image}`}
                              alt={`Image ${index + 1}`}
                              className="video-image"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default CoachDashboard;
