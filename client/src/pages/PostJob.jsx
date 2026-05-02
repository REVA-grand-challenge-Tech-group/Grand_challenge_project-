import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PostJob = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.crop || !formData.labourersNeeded || !formData.wagePerDay || !formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    
    const jobData = {
      farmerId: localStorage.getItem('userId') || 'farmer_001',
      farmerName: localStorage.getItem('userName') || 'Demo Farmer',
      farmerPhone: localStorage.getItem('userPhone') || '9876543210',
      farmerDistrict: 'Hassan',
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
      location: formData.location || 'Hassan, Karnataka'
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalCost = formData.labourersNeeded && formData.wagePerDay && calculateDays() 
    ? parseInt(formData.labourersNeeded) * parseInt(formData.wagePerDay) * calculateDays() 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <h1 className="text-xl font-bold">Post a Job</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <input type="text" name="crop" value={formData.crop} onChange={handleChange} placeholder="🌾 Crop name (e.g., Rice, Wheat)" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <select name="workType" value={formData.workType} onChange={handleChange} className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none">
              {workTypes.map(type => <option key={type}>{type}</option>)}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <input type="number" name="labourersNeeded" value={formData.labourersNeeded} onChange={handleChange} placeholder="👥 Labourers needed" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <input type="number" name="wagePerDay" value={formData.wagePerDay} onChange={handleChange} placeholder="💰 Wage per day (₹)" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="📍 Location (e.g., Hassan, Karnataka)" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" />
          </div>

          {totalCost > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
              <p className="font-semibold text-gray-800">💰 Total Payment: <span className="text-green-700">₹{totalCost.toLocaleString()}</span></p>
              <p className="text-xs text-gray-500 mt-1">For {calculateDays()} days × {formData.labourersNeeded} workers × ₹{formData.wagePerDay}/day</p>
            </div>
          )}
          
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50">
            {loading ? 'Posting...' : '📢 Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;