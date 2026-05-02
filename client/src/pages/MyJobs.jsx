import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get farmer ID from localStorage
  const farmerId = localStorage.getItem('userId') || 'farmer_001';

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/jobs/farmer/${farmerId}`);
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load your jobs');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'filled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <h1 className="text-xl font-bold">My Jobs</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <div className="text-6xl mb-3">📝</div>
            <p className="text-gray-500">You haven't posted any jobs yet</p>
            <Link to="/post-job">
              <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg">
                Post Your First Job
              </button>
            </Link>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-2xl shadow-md p-4 mb-4 border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-green-700">🌾 {job.crop} - {job.workType}</h3>
                  <p className="text-sm text-gray-600">📍 {job.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(job.status)}`}>
                  {job.status || 'Open'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div>👥 Needed: <strong>{job.labourersNeeded}</strong> workers</div>
                <div>💰 Wage: <strong>₹{job.wagePerDay}/day</strong></div>
                <div>📅 Days: <strong>{job.totalDays} days</strong></div>
                <div>📝 Applicants: <strong>{job.applicantsCount || 0}</strong></div>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                📅 Posted: {new Date(job.createdAt).toLocaleDateString()}
              </div>
              
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700">
                View Applicants
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyJobs;