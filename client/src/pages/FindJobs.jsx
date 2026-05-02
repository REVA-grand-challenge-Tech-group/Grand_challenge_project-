import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/jobs/open');
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    setApplied({ ...applied, [jobId]: true });
    
    const applicationData = {
      jobId: jobId,
      labourerId: localStorage.getItem('userId') || 'labourer_001',
      labourerName: localStorage.getItem('userName') || 'Demo Labourer',
      labourerPhone: localStorage.getItem('userPhone') || '9876543211',
      labourerType: 'smartphone'
    };

    try {
      const response = await fetch('http://localhost:5001/api/jobs/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Application submitted! Farmer will contact you.');
        fetchJobs();
      } else {
        toast.error(data.message || 'Failed to apply');
        setApplied({ ...applied, [jobId]: false });
      }
    } catch (error) {
      toast.error('Server error');
      setApplied({ ...applied, [jobId]: false });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <h1 className="text-xl font-bold">Find Work</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <div className="text-6xl mb-3">🔍</div>
            <p className="text-gray-500">No jobs available right now</p>
            <p className="text-sm text-gray-400 mt-1">Check back later for new opportunities</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-2xl shadow-md p-4 mb-4 border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-green-700">🌾 {job.crop} - {job.workType}</h3>
                  <p className="text-sm text-gray-600">📍 {job.location}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{job.labourersNeeded} spots</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div>👥 Need: <strong>{job.labourersNeeded}</strong> workers</div>
                <div>💰 Wage: <strong>₹{job.wagePerDay}/day</strong></div>
                <div>📅 Days: <strong>{job.totalDays} days</strong></div>
                <div>👤 Posted by: {job.farmerName}</div>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                📅 {job.startDate} to {job.endDate}
              </div>
              
              <button
                onClick={() => handleApply(job._id)}
                disabled={applied[job._id]}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {applied[job._id] ? '✓ Applied' : '📝 Apply Now'}
              </button>
            </div>
          ))
        )}

        <div className="mt-6 bg-orange-50 rounded-2xl p-4 border border-orange-200">
          <h3 className="font-bold text-orange-800">📞 No Smartphone?</h3>
          <p className="text-sm text-orange-700 mt-1">Call our helpline to find work</p>
          <a href="tel:18001234567" className="block mt-3 bg-orange-600 text-white text-center py-2 rounded-lg">
            📞 Call 1800-123-4567
          </a>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;