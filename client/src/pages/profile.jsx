import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Phone, MapPin, Calendar, Sprout, Briefcase, Edit2, Save, X, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({ cropsCount: 0, jobsCount: 0 });
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    state: '',
    district: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        state: user.state || 'Karnataka',
        district: user.district || 'Mandya'
      });
    }
    loadStats();
  }, [user]);

  const loadStats = () => {
    const crops = JSON.parse(localStorage.getItem('registeredCrops') || '[]');
    const myCrops = crops.filter(c => c.farmerId === user?.id);
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const myJobs = jobs.filter(j => j.farmerId === user?.id);
    setStats({ cropsCount: myCrops.length, jobsCount: myJobs.length });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/language');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4 hover:opacity-80">
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-emerald-100 text-sm">Manage your account information</p>
      </div>

      <div className="p-5">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-4xl font-bold text-emerald-700">{user?.fullName?.charAt(0) || 'U'}</span>
            </div>
            {!isEditing ? (
              <>
                <h2 className="text-xl font-bold">{user?.fullName || 'User'}</h2>
                <p className="text-emerald-100 capitalize mt-1">{user?.role || 'Farmer'}</p>
                <button onClick={() => setIsEditing(true)} className="mt-3 bg-white/20 px-4 py-1 rounded-lg text-sm flex items-center justify-center gap-1 mx-auto">
                  <Edit2 size={14} /> Edit Profile
                </button>
              </>
            ) : (
              <div className="mt-2 space-y-2">
                <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full p-2 rounded-lg text-stone-800 text-center" placeholder="Full Name" />
                <div className="flex gap-2 justify-center">
                  <button onClick={handleSave} className="bg-white text-emerald-700 px-4 py-1 rounded-lg flex items-center gap-1"><Save size={14} /> Save</button>
                  <button onClick={() => setIsEditing(false)} className="bg-white/20 px-4 py-1 rounded-lg flex items-center gap-1"><X size={14} /> Cancel</button>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b">
              <Phone size={18} className="text-emerald-600" />
              <div><p className="text-xs text-stone-400">Phone Number</p><p className="font-medium">{user?.phoneNumber || 'Not provided'}</p></div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b">
              <MapPin size={18} className="text-emerald-600" />
              <div><p className="text-xs text-stone-400">Location</p><p className="font-medium">{formData.district}, {formData.state}</p></div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b">
              <Calendar size={18} className="text-emerald-600" />
              <div><p className="text-xs text-stone-400">Member Since</p><p className="font-medium">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <h3 className="font-bold text-stone-800 mb-3">Statistics</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <Sprout size={24} className="text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.cropsCount}</p>
            <p className="text-xs text-stone-500">Crops Registered</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <Briefcase size={24} className="text-emerald-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.jobsCount}</p>
            <p className="text-xs text-stone-500">Jobs Posted</p>
          </div>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;