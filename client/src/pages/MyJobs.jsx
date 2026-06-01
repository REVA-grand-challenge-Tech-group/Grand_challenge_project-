import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Users, Phone, MapPin, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const MyJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const myJobs = allJobs.filter(job => job.farmerId === user?.id || job.farmerName === user?.fullName);
    setJobs(myJobs);
  };

  const handleStatusUpdate = (jobId, applicationId, newStatus) => {
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = allJobs.findIndex(j => j.id === jobId);
    
    if (jobIndex !== -1) {
      const appIndex = allJobs[jobIndex].applicants.findIndex(a => a.id === applicationId);
      if (appIndex !== -1) {
        allJobs[jobIndex].applicants[appIndex].status = newStatus;
        localStorage.setItem('jobs', JSON.stringify(allJobs));
        
        // Update jobApplications
        const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
        const appIndex2 = applications.findIndex(a => a.id === applicationId);
        if (appIndex2 !== -1) {
          applications[appIndex2].status = newStatus;
          localStorage.setItem('jobApplications', JSON.stringify(applications));
        }
        
        // Update labourer's myApplications
        const applicant = allJobs[jobIndex].applicants[appIndex];
        const labourerId = applicant.labourerId;
        const myApps = JSON.parse(localStorage.getItem(`myApplications_${labourerId}`) || '[]');
        const myAppIndex = myApps.findIndex(a => a.id === applicationId);
        if (myAppIndex !== -1) {
          myApps[myAppIndex].status = newStatus;
          localStorage.setItem(`myApplications_${labourerId}`, JSON.stringify(myApps));
        }
        
        // Set notification
        setNotification({ message: `Application ${newStatus === 'Accepted' ? 'accepted' : 'rejected'} successfully!`, type: 'success' });
        setTimeout(() => setNotification(null), 3000);
        
        loadJobs();
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Accepted': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center"><CheckCircle size={12} className="mr-1" />Accepted</span>;
      case 'Rejected': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs flex items-center"><XCircle size={12} className="mr-1" />Rejected</span>;
      default: return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center"><Clock size={12} className="mr-1" />Pending</span>;
    }
  };

  const selectedCount = (job) => job.applicants?.filter(a => a.status === 'Accepted').length || 0;
  const newApplicantsCount = jobs.reduce((total, job) => total + (job.applicants?.filter(a => a.status === 'Pending').length || 0), 0);

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4"><ArrowLeft size={20} /><span>Back</span></button>
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <p className="text-emerald-100 text-sm">Manage your posted jobs and applicants</p>
      </div>

      {/* Notification Banner */}
      {newApplicantsCount > 0 && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 mx-5 mt-4 rounded-lg">
          <p className="text-sm font-semibold">📋 {newApplicantsCount} New Applicant{newApplicantsCount > 1 ? 's' : ''}! Check your jobs.</p>
        </div>
      )}

      {notification && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mx-5 mt-4 rounded-lg">
          <p className="text-sm font-semibold">✅ {notification.message}</p>
        </div>
      )}

      <div className="p-5 space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12"><div className="text-6xl mb-4">📝</div><p className="text-stone-500">No jobs posted yet</p><button onClick={() => navigate('/post-job')} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg">Post a Job</button></div>
        ) : (
          jobs.map(job => {
            const applicantsCount = job.applicants?.length || 0;
            return (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b bg-stone-50">
                  <div className="flex justify-between items-start">
                    <div><h3 className="font-bold text-lg">{job.cropName} - {job.workType}</h3><div className="flex items-center gap-3 mt-1"><span className="text-sm text-stone-500">📍 {job.location}</span><span className="text-sm text-emerald-700 font-semibold">₹{job.wagePerDay}/day</span></div></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>{job.status}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center"><p className="text-2xl font-bold text-emerald-700">{job.labourersNeeded}</p><p className="text-xs text-stone-500">Required</p></div>
                    <div className="text-center"><p className="text-2xl font-bold text-blue-700">{applicantsCount}</p><p className="text-xs text-stone-500">Applied</p></div>
                    <div className="text-center"><p className="text-2xl font-bold text-green-700">{selectedCount(job)}/{job.labourersNeeded}</p><p className="text-xs text-stone-500">Selected</p></div>
                  </div>
                  {applicantsCount > 0 && <button onClick={() => { setSelectedJob(job); setShowApplicants(true); }} className="w-full bg-emerald-100 text-emerald-700 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"><Eye size={16} /> View Applicants ({applicantsCount})</button>}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Applicants Modal */}
      {showApplicants && selectedJob && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowApplicants(false)} />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center"><h2 className="text-xl font-bold">Applicants for {selectedJob.cropName}</h2><button onClick={() => setShowApplicants(false)} className="text-stone-500">✕</button></div>
            <div className="p-4 space-y-3">
              {selectedJob.applicants?.map(applicant => (
                <div key={applicant.id} className="border rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">{applicant.labourerName}</p>
                      <p className="text-sm text-stone-500 flex items-center gap-1 mt-1"><Phone size={14} /> {applicant.labourerPhone || 'Not provided'}</p>
                      <p className="text-sm text-stone-500 flex items-center gap-1 mt-1"><MapPin size={14} /> {applicant.labourerDistrict || 'Mandya'}</p>
                      <p className="text-xs text-stone-400 mt-2">Applied: {new Date(applicant.appliedAt).toLocaleDateString()}</p>
                      {applicant.message && <p className="text-sm text-stone-600 italic mt-2 bg-stone-50 p-2 rounded-lg">"{applicant.message}"</p>}
                    </div>
                    <div>{getStatusBadge(applicant.status)}</div>
                  </div>
                  {applicant.status === 'Pending' && (
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleStatusUpdate(selectedJob.id, applicant.id, 'Accepted')} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold">Accept</button>
                      <button onClick={() => handleStatusUpdate(selectedJob.id, applicant.id, 'Rejected')} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold">Reject</button>
                      <button onClick={() => window.location.href = `tel:${applicant.labourerPhone}`} className="px-4 bg-emerald-100 text-emerald-700 rounded-lg"><Phone size={18} /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyJobs;