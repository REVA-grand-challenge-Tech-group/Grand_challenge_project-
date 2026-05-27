import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import VoiceInputWithValidation from '../components/VoiceInputWithValidation';

const Profile = () => {
  const { user, setUser, token } = useAuth();
  const { translations, currentLanguage } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    farmSize: '',
    state: '',
    district: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        bio: user.bio || '',
        farmSize: user.farmSize || '',
        state: user.state || '',
        district: user.district || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVoiceInput = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Update user context immediately
        setUser({
          ...user,
          ...formData
        });
        
        // Also update localStorage
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...storedUser,
          ...formData
        }));
        
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Stats based on role
  const getStats = () => {
    const stats = [];
    
    if (user?.role === 'farmer' || user?.role === 'both') {
      stats.push(
        { label: 'Crops Registered', value: user?.cropsCount || 0, icon: '🌾' },
        { label: 'Jobs Posted', value: user?.jobsPosted || 0, icon: '📝' }
      );
    }
    
    if (user?.role === 'labourer' || user?.role === 'both') {
      stats.push(
        { label: 'Applications', value: user?.applicationsCount || 0, icon: '📄' }
      );
    }
    
    return stats;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-600 text-3xl font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.fullName}</h1>
            <p className="text-green-100 capitalize">{user?.role}</p>
            <p className="text-green-100 text-sm">{user?.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {getStats().map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-2xl font-bold text-green-600">{stat.value}</span>
            </div>
            <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-md m-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {translations?.profileInfo || 'Profile Information'}
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ✏️ Edit
            </button>
          )}
        </div>

        {message && (
          <div className={`p-3 rounded-lg mb-4 ${
            message.includes('success') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <VoiceInputWithValidation
                  onTranscript={(text) => handleVoiceInput('fullName', text)}
                  fieldType="name"
                  language={currentLanguage}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
            </div>

            {user?.role !== 'labourer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Size (acres)
                </label>
                <input
                  type="text"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 5 acres"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select State</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Punjab">Punjab</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter your district"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    fullName: user.fullName,
                    bio: user.bio,
                    farmSize: user.farmSize,
                    state: user.state,
                    district: user.district
                  });
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{user?.fullName}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{user?.phoneNumber}</span>
            </div>
            {user?.bio && (
              <div className="py-2 border-b">
                <span className="text-gray-600 block mb-1">Bio:</span>
                <p className="text-gray-800">{user?.bio}</p>
              </div>
            )}
            {user?.farmSize && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Farm Size:</span>
                <span className="font-medium">{user?.farmSize}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{user?.district}, {user?.state}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Member Since:</span>
              <span className="font-medium">
                {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;