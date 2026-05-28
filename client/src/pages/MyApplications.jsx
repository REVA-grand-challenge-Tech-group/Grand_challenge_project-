import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Load applications from localStorage
    const saved = localStorage.getItem('myApplications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock size={16} className="text-yellow-500" />;
      case 'Accepted': return <CheckCircle size={16} className="text-green-500" />;
      case 'Rejected': return <XCircle size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Accepted': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4">
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-emerald-100 text-sm">Track your job applications</p>
      </div>

      <div className="p-5 pb-24">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-stone-500">No applications yet</p>
            <button 
              onClick={() => navigate('/find-jobs')}
              className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-stone-800">{app.jobTitle}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    <span>{app.status}</span>
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Applied on: {new Date(app.appliedDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;