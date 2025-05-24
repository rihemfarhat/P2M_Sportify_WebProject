import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/MobilityWorkouts.css';

const CardioWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/workouts');
        const filtered = response.data.filter(w => w.Objectif === 'Cardio exercises');
        setWorkouts(filtered);
        
        const initialIndexes = {};
        filtered.forEach(workout => {
          initialIndexes[workout._id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const toggleExpand = (workoutId) => {
    setExpandedCards(prev => ({
      ...prev,
      [workoutId]: !prev[workoutId]
    }));
  };

  const nextImage = (workoutId, totalImages, e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [workoutId]: (prev[workoutId] + 1) % totalImages
    }));
  };

  const prevImage = (workoutId, totalImages, e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [workoutId]: (prev[workoutId] - 1 + totalImages) % totalImages
    }));
  };

  const categorizedWorkouts = {
    all: workouts,
    beginner: workouts.filter(workout => workout.difficulty.toLowerCase() === 'beginner'),
    intermediate: workouts.filter(workout => workout.difficulty.toLowerCase() === 'intermediate'),
    expert: workouts.filter(workout => workout.difficulty.toLowerCase() === 'expert')
  };

  const filteredWorkouts = categorizedWorkouts[activeTab].filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading Workouts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="workout-container1">
      <div className="workout-container">
        <h1 className="main-title">Cardio Exercises 🏃‍♂️</h1>
        <p className="subtitle">Boost your heart health with these cardiovascular workouts</p>

        <div className="controls-section">
          <input
            type="text"
            placeholder="🔍 Search workouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="difficulty-tabs">
            <button
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Levels
            </button>
            <button
              className={`tab-button beginner ${activeTab === 'beginner' ? 'active' : ''}`}
              onClick={() => setActiveTab('beginner')}
            >
              Beginner
            </button>
            <button
              className={`tab-button intermediate ${activeTab === 'intermediate' ? 'active' : ''}`}
              onClick={() => setActiveTab('intermediate')}
            >
              Intermediate
            </button>
            <button
              className={`tab-button expert ${activeTab === 'expert' ? 'active' : ''}`}
              onClick={() => setActiveTab('expert')}
            >
              Expert
            </button>
          </div>
        </div>

        <div className="workout-grid">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <div 
                key={workout._id} 
                className={`workout-card ${workout.difficulty.toLowerCase()}`}
              >
                <div className="workout-images">
                  <div 
                    className="image-slider"
                    style={{ transform: `translateX(-${currentImageIndex[workout._id] * 100}%)` }}
                  >
                    {workout.images.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000${image}`}
                        alt={`${workout.name} ${index + 1}`}
                        className="workout-image"
                      />
                    ))}
                  </div>
                  
                  {workout.images.length > 1 && (
                    <>
                      <button 
                        className="slider-arrow prev"
                        onClick={(e) => prevImage(workout._id, workout.images.length, e)}
                      >
                        &lt;
                      </button>
                      <button 
                        className="slider-arrow next"
                        onClick={(e) => nextImage(workout._id, workout.images.length, e)}
                      >
                        &gt;
                      </button>
                      <div className="slider-controls">
                        {workout.images.map((_, index) => (
                          <div
                            key={index}
                            className={`slider-dot ${currentImageIndex[workout._id] === index ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(prev => ({
                                ...prev,
                                [workout._id]: index
                              }));
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="workout-info">
                  <h2>{workout.name}</h2>
                  <div className="workout-meta">
                    <span className={`difficulty-badge ${workout.difficulty.toLowerCase()}`}>
                      {workout.difficulty}
                    </span>
                    <span className="duration-badge">{workout.duration} min</span>
                  </div>
                  <div className="workout-description">
                    {expandedCards[workout._id] || workout.description.length <= 150 
                      ? workout.description 
                      : `${workout.description.substring(0, 150)}...`
                    }
                    {workout.description.length > 150 && (
                      <span 
                        className="read-more" 
                        onClick={() => toggleExpand(workout._id)}
                      >
                        {expandedCards[workout._id] ? ' Show Less' : ' Read More'}
                      </span>
                    )}
                  </div>

                  <div className="workout-footer">
                    <span className="calories-badge">🔥 {Math.round(workout.duration * 9)} cal</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No cardio workouts found matching your criteria.</p>
              <button className="reset-button" onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
              }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardioWorkouts;