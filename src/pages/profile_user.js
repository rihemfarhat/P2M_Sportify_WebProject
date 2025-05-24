import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/profile.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch("http://localhost:5000/api/auth/user-profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("Failed to load profile");
                
                const data = await response.json();
                setUser({
                    ...data,
                    points: data.points || 0,
                    gender: data.gender || 'Not specified'
                });
            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!user) {
        return <div className="error-message">No profile data available</div>;
    }

    const pointsToNextLevel = 500;
    const progressPercentage = Math.min((user.points / pointsToNextLevel) * 100, 100);

    return (
        <div className="fitness-profile-container">
            {/* Header with avatar and info */}
            <div className="profile-header">
                <div className="avatar-container">
                    <div className="avatar-circle">
                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                </div>
                <h1>{user.firstName} {user.lastName}</h1>
                <div className="club-tag">Free Athletes</div>
            </div>

            {/* Level card */}
            <div className="level-card">
                <div className="level-display">
                    <span className="level-label">LEVEL</span>
                    <span className="level-number">1</span>
                </div>
                <div className="progress-container">
                    <div className="progress-text">
                        <span>{user.points} points</span>
                        <span>{pointsToNextLevel} to level 2</span>
                    </div>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Profile section */}
            <div className="profile-section">
                <h2 className="section-title">
                    <span className="title-icon">👤</span>
                    Athlete Profile
                </h2>

                <div className="profile-grid">
                    <div className="profile-item">
                        <label>First Name</label>
                        <div className="profile-value">{user.firstName || '-'}</div>
                    </div>
                    <div className="profile-item">
                        <label>Last Name</label>
                        <div className="profile-value">{user.lastName || '-'}</div>
                    </div>
                    <div className="profile-item">
                        <label>Membership</label>
                        <div className="profile-value">Premium</div>
                    </div>
                </div>

                {/* Gender display (read-only) */}
                <div className="gender-display">
                    <h3 className="section-subtitle">
                        <span className="title-icon">⚧️</span>
                        Gender
                    </h3>
                    <div className="gender-badge">
                        {user.gender === 'Male' && <span className="male">Male</span>}
                        {user.gender === 'Female' && <span className="female">Female</span>}
                        {user.gender === 'Non-binary' && <span className="non-binary">Non-binary</span>}
                        {!['Male', 'Female', 'Non-binary'].includes(user.gender) && (
                            <span className="unknown">{user.gender}</span>
                        )}
                    </div>
                </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                Sign Out
                <span className="logout-icon">→</span>
            </button>
        </div>
    );
}

export default Profile;