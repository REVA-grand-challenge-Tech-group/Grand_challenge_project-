import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const [applications, setApplications] = useState([
    { id: 1, crop: 'Rice', work: 'Harvesting', location: 'Hassan', wage: 400, status: 'Pending', appliedDate: '2024-01-15' },
    { id: 2, crop: 'Tomato', work: 'Plucking', location: 'Belgaum', wage: 350, status: 'Accepted', appliedDate: '2024-01-14' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center"><Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link><h1 className="text-xl font-bold">My Applications</h1></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl shadow-md p-4 mb-4 border">
            <div className="flex justify-between items-start"><div><h3 className="font-bold text-lg text-green-700">🌾 {app.crop} - {app.work}</h3><p className="text-sm text-gray-600">📍 {app.location}</p></div>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${app.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{app.status}</span></div>
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm"><div>💰 Wage: ₹{app.wage}/day</div><div>📅 Applied: {app.appliedDate}</div></div>
            {app.status === 'Accepted' && <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl text-sm font-medium">📞 Contact Farmer</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;