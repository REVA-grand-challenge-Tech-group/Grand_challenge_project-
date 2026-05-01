import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PostJob = () => {
  const [formData, setFormData] = useState({ crop: '', workType: 'Harvesting', labourersNeeded: '', wagePerDay: '', startDate: '', endDate: '', location: '' });
  const workTypes = ['Harvesting', 'Ploughing', 'Sowing', 'Pesticide Spray', 'Weeding', 'Loading', 'Irrigation'];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Job posted successfully! Workers will see your listing.');
    setTimeout(() => window.location.href = '/my-jobs', 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center"><Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link><h1 className="text-xl font-bold">Post a Job</h1></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm"><input type="text" placeholder="🌾 Crop name" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required /></div>
          <div className="bg-white rounded-2xl p-4 shadow-sm"><select className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none">{workTypes.map(type => <option key={type}>{type}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-4"><div className="bg-white rounded-2xl p-4 shadow-sm"><input type="number" placeholder="👥 Labourers needed" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required /></div>
          <div className="bg-white rounded-2xl p-4 shadow-sm"><input type="number" placeholder="💰 Wage per day" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required /></div></div>
          <div className="grid grid-cols-2 gap-4"><div className="bg-white rounded-2xl p-4 shadow-sm"><input type="date" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required /></div>
          <div className="bg-white rounded-2xl p-4 shadow-sm"><input type="date" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required /></div></div>
          <div className="bg-white rounded-2xl p-4 shadow-sm"><input type="text" placeholder="📍 Location" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required /></div>
          <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold">📢 Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;