import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, CheckCircle, XCircle, Briefcase, MapPin, User } from 'lucide-react';

const MyApplications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadApplications();
    const interval = setInterval(loadApplications, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadApplications = () => {
    const labourerId = user?.id || 'labourer_1';
    const myApps = JSON.parse(localStorage.getItem(`myApplications_${labourerId}`) || '[]');
    const allApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const myAllApps = allApps.filter(app => app.labourerId === labourerId);
    
    const merged = [...myApps, ...myAllApps];
    const unique = merged.filter((app, index, self) => self.findIndex(a => a.id === app.id) === index);
    
    // Check for status changes
    const previousStatuses = applications.map(a => ({ id: a.id, status: a.status }));
    unique.forEach(app => {
      const prev = previousStatuses.find(p => p.id === app.id);
      if (prev && prev.status !== app.status) {
        if (app.status === 'Accepted') {
          setNotification({ message: `✅ Application for ${app.jobTitle} has been ACCEPTED!`, type: 'accepted' });
        } else if (app.status === 'Rejected') {
          setNotification({ message: `❌ Application for ${app.jobTitle} has been REJECTED.`, type: 'rejected' });
        }
        setTimeout(() => setNotification(null), 5000);
      }
    });
    
    setApplications(unique);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Accepted': return <CheckCircle size={20} className="text-green-600" />;
      case 'Rejected': return <XCircle size={20} className="text-red-600" />;
      default: return <Clock size={20} className="text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Accepted': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Accepted</span>;
      case 'Rejected': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">Rejected</span>;
      default: return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Pending</span>;
    }
  };

  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const acceptedCount = applications.filter(a => a.status === 'Accepted').length;
  const rejectedCount = applications.filter(a => a.status === 'Rejected').length;

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4"><ArrowLeft size={20} /><span>Back</span></button>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-emerald-100 text-sm">Track your job applications</p>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className={`mx-5 mt-4 p-3 rounded-lg ${notification.type === 'accepted' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'}`}>
          <p className="text-sm font-semibold">{notification.message}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 p-5">
        <div className="bg-white rounded-xl p-3 text-center shadow-sm"><div className="text-yellow-600 text-xl mb-1">⏳</div><div className="text-2xl font-bold">{pendingCount}</div><div className="text-xs text-stone-500">Pending</div></div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm"><div className="text-green-600 text-xl mb-1">✅</div><div className="text-2xl font-bold">{acceptedCount}</div><div className="text-xs text-stone-500">Accepted</div></div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm"><div className="text-red-600 text-xl mb-1">❌</div><div className="text-2xl font-bold">{rejectedCount}</div><div className="text-xs text-stone-500">Rejected</div></div>
      </div>

      <div className="px-5 space-y-4">
        {applications.length === 0 ? (
          <div className="text-center py-12"><div className="text-6xl mb-4">📋</div><p className="text-stone-500">No applications yet</p><button onClick={() => navigate('/find-jobs')} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg">Browse Jobs</button></div>
        ) : (
          applications.map(app => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">{getStatusIcon(app.status)}<h3 className="font-bold text-stone-800">{app.jobTitle}</h3></div>
                  <div className="space-y-1">
                    <p className="text-sm text-stone-600 flex items-center"><User size={14} className="mr-1 text-emerald-600" />Farmer: {app.farmerName}</p>
                    <p className="text-sm text-stone-600 flex items-center"><MapPin size={14} className="mr-1 text-emerald-600" />{app.location}</p>
                    <p className="text-xs text-stone-400">Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                    {app.message && <p className="text-sm text-stone-600 italic mt-2 bg-stone-50 p-2 rounded-lg">"{app.message}"</p>}
                  </div>
                  <div className="mt-3">{getStatusBadge(app.status)}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;