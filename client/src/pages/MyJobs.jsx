import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyJobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, crop: 'Rice', work: 'Harvesting', workers: 5, wage: 400, location: 'Hassan', status: 'Open', applicants: 3 },
    { id: 2, crop: 'Tomato', work: 'Plucking', workers: 3, wage: 350, location: 'Belgaum', status: 'In Progress', applicants: 5 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center"><Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link><h1 className="text-xl font-bold">My Jobs</h1></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl shadow-md p-4 mb-4 border">
            <div className="flex justify-between items-start"><div><h3 className="font-bold text-lg text-green-700">🌾 {job.crop} - {job.work}</h3><p className="text-sm text-gray-600">📍 {job.location}</p></div><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">{job.status}</span></div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm"><div>👥 Needed: {job.workers}</div><div>💰 Wage: ₹{job.wage}/day</div><div>📝 Applicants: {job.applicants}</div></div>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700">View Applicants</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;