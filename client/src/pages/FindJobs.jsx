import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const FindJobs = () => {
  const [applied, setApplied] = useState({});
  const jobs = [
    { id: 1, crop: 'Rice', work: 'Harvesting', workers: 5, wage: 400, location: 'Hassan', days: 6, farmer: 'Ramesh', phone: '9876543210' },
    { id: 2, crop: 'Tomato', work: 'Plucking', workers: 3, wage: 350, location: 'Belgaum', days: 4, farmer: 'Suresh', phone: '9876543211' },
    { id: 3, crop: 'Sugarcane', work: 'Cutting', workers: 8, wage: 450, location: 'Mysore', days: 10, farmer: 'Mahesh', phone: '9876543212' },
  ];

  const handleApply = (id) => {
    setApplied({ ...applied, [id]: true });
    toast.success('Application submitted! Farmer will contact you.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center"><Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link><h1 className="text-xl font-bold">Find Work</h1></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl shadow-md p-4 mb-4 border">
            <div className="flex justify-between items-start"><div><h3 className="font-bold text-lg text-green-700">🌾 {job.crop} - {job.work}</h3><p className="text-sm text-gray-600">📍 {job.location} • 👤 {job.farmer}</p></div><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{job.workers} spots</span></div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm"><div>💰 Wage: ₹{job.wage}/day</div><div>📅 Days: {job.days} days</div><div>📞 Contact: {job.phone}</div></div>
            <button onClick={() => handleApply(job.id)} disabled={applied[job.id]} className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 disabled:bg-gray-400">{applied[job.id] ? '✓ Applied' : '📝 Apply Now'}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindJobs;