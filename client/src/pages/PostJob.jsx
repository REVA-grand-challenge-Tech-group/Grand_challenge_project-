import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import VoiceInputWithValidation from '../components/VoiceInputWithValidation';
import NavigationMenu from '../components/NavigationMenu';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    crop: '',
    workType: 'Harvesting',
    labourersNeeded: '',
    wagePerDay: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  const workTypes = ['Harvesting', 'Ploughing', 'Sowing', 'Pesticide Spray', 'Weeding', 'Loading', 'Irrigation'];

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  const handleVoiceCrop = (value) => {
    setFormData(prev => ({ ...prev, crop: value }));
  };

  const handleVoiceLabourers = (value) => {
    setFormData(prev => ({ ...prev, labourersNeeded: value }));
  };

  const handleVoiceWage = (value) => {
    setFormData(prev => ({ ...prev, wagePerDay: value }));
  };

  const handleVoiceDate = (value, field) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.crop || !formData.labourersNeeded || !formData.wagePerDay || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    
    const jobData = {
      farmerId: user?.id || localStorage.getItem('userId'),
      farmerName: user?.name || localStorage.getItem('userName'),
      farmerPhone: user?.phone || localStorage.getItem('userPhone'),
      farmerDistrict: user?.district || 'Hassan',
      crop: formData.crop,
      workType: formData.workType,
      labourersNeeded: parseInt(formData.labourersNeeded),
      wagePerDay: parseInt(formData.wagePerDay),
      hoursPerDay: 8,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalDays: calculateDays(),
      mealProvided: false,
      toolsProvided: false,
      location: formData.location || `${user?.district || 'Hassan'}, ${user?.state || 'Karnataka'}`
    };

    try {
      const response = await fetch('http://localhost:5001/api/jobs/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Job posted successfully!');
        setTimeout(() => navigate('/my-jobs'), 2000);
      } else {
        toast.error(data.message || 'Failed to post job');
      }
    } catch (error) {
      toast.error('Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalCost = formData.labourersNeeded && formData.wagePerDay && calculateDays() 
    ? parseInt(formData.labourersNeeded) * parseInt(formData.wagePerDay) * calculateDays() 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <NavigationMenu />

      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">Post a Job</h1>
            <p className="text-xs text-green-200">Hire workers for your farm</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crop Name with Voice */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">🌾 Crop Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="crop"
                value={formData.crop}
                onChange={(e) => setFormData(prev => ({ ...prev, crop: e.target.value }))}
                placeholder="e.g., Rice, Wheat, Tomato"
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                required
              />
              <VoiceInputWithValidation onResult={handleVoiceCrop} fieldType="crop" />
            </div>
            <p className="text-xs text-gray-400 mt-1">🎤 Tap mic and speak only the crop name (e.g., "Rice")</p>
          </div>
          
          {/* Work Type */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">🔧 Type of Work</label>
            <select
              name="workType"
              value={formData.workType}
              onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
            >
              {workTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          
          {/* Labourers Needed with Voice */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">👥 Number of Labourers</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="labourersNeeded"
                value={formData.labourersNeeded}
                onChange={(e) => setFormData(prev => ({ ...prev, labourersNeeded: e.target.value }))}
                placeholder="e.g., 5"
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                required
              />
              <VoiceInputWithValidation onResult={handleVoiceLabourers} fieldType="number" />
            </div>
          </div>
          
          {/* Wage with Voice */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Wage per Day (₹)</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="wagePerDay"
                value={formData.wagePerDay}
                onChange={(e) => setFormData(prev => ({ ...prev, wagePerDay: e.target.value }))}
                placeholder="e.g., 400"
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                required
              />
              <VoiceInputWithValidation onResult={handleVoiceWage} fieldType="wage" />
            </div>
            <p className="text-xs text-gray-400 mt-1">🎤 Speak a number between ₹200 and ₹1000</p>
          </div>
          
          {/* Start Date with Voice */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Start Date</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                required
              />
              <VoiceInputWithValidation onResult={(val) => handleVoiceDate(val, 'startDate')} fieldType="date" />
            </div>
            <p className="text-xs text-gray-400 mt-1">🎤 Speak date like "15th January 2025"</p>
          </div>
          
          {/* End Date with Voice */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">📅 End Date</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                required
              />
              <VoiceInputWithValidation onResult={(val) => handleVoiceDate(val, 'endDate')} fieldType="date" />
            </div>
          </div>
          
          {/* Location */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder={`${user?.district || 'Hassan'}, ${user?.state || 'Karnataka'}`}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
            />
          </div>

          {/* Cost Summary */}
          {totalCost > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
              <p className="font-semibold text-gray-800">💰 Total Payment: <span className="text-green-700">₹{totalCost.toLocaleString()}</span></p>
              <p className="text-xs text-gray-500 mt-1">For {calculateDays()} days × {formData.labourersNeeded} workers × ₹{formData.wagePerDay}/day</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Posting...' : '📢 Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;