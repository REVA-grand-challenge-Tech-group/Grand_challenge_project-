import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Phone, MapPin, Star, CheckCircle, XCircle, Clock, UserPlus, Briefcase } from 'lucide-react';

const LabourSupport = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [labourers, setLabourers] = useState([]);
  const [selectedLabour, setSelectedLabour] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyMessage, setApplyMessage] = useState('');
  const [myJobs, setMyJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('available');

  // Demo labourers
  const demoLabourers = [
    { id: 1, name: 'Ravi Kumar', phone: '9876543210', skills: 'Harvesting, Planting', district: 'Mandya', experience: '5 years', rating: 4.8, completedJobs: 45, wage: 350 },
    { id: 2, name: 'Suresh Hegde', phone: '9876543211', skills: 'Pesticide Spray, Weeding', district: 'Hassan', experience: '3 years', rating: 4.5, completedJobs: 28, wage: 320 },
    { id: 3, name: 'Lakshmi Bai', phone: '9876543212', skills: 'Vegetable Picking, Sorting', district: 'Mysore', experience: '4 years', rating: 4.9, completedJobs: 52, wage: 300 },
    { id: 4, name: 'Krishna Reddy', phone: '9876543213', skills: 'Irrigation, Ploughing', district: 'Belgaum', experience: '6 years', rating: 4.7, completedJobs: 38, wage: 400 },
    { id: 5, name: 'Gowthami', phone: '9876543214', skills: 'Planting, Weeding', district: 'Hubli', experience: '2 years', rating: 4.3, completedJobs: 15, wage: 280 }
  ];

  useEffect(() => {
    loadLabourers();
    loadMyJobs();
    loadApplications();
  }, []);

  const loadLabourers = () => {
    const stored = localStorage.getItem('labourers');
    if (stored) {
      setLabourers(JSON.parse(stored));
    } else {
      setLabourers(demoLabourers);
      localStorage.setItem('labourers', JSON.stringify(demoLabourers));
    }
  };

  const loadMyJobs = () => {
    const jobs = JSON.parse(localStorage.getItem('myPostedJobs') || '[]');
    setMyJobs(jobs);
  };

  const loadApplications = () => {
    const apps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    setApplications(apps);
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleApply = (labourer, job) => {
    setSelectedLabour(labourer);
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const submitApplication = () => {
    const application = {
      id: Date.now(),
      jobId: selectedJob.id,
      jobTitle: `${selectedJob.cropName} - ${selectedJob.workType}`,
      labourerId: selectedLabour.id,
      labourerName: selectedLabour.name,
      labourerPhone: selectedLabour.phone,
      labourerDistrict: selectedLabour.district,
      message: applyMessage,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };
    
    const existingApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    existingApps.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(existingApps));
    
    // Update job applicants
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = jobs.findIndex(j => j.id === selectedJob.id);
    if (jobIndex !== -1) {
      if (!jobs[jobIndex].applicants) jobs[jobIndex].applicants = [];
      jobs[jobIndex].applicants.push(application);
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
    
    setShowApplyModal(false);
    setApplyMessage('');
    alert('Application submitted successfully!');
    loadApplications();
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Accepted': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center"><CheckCircle size={12} className="mr-1" />Accepted</span>;
      case 'Rejected': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs flex items-center"><XCircle size={12} className="mr-1" />Rejected</span>;
      default: return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center"><Clock size={12} className="mr-1" />Pending</span>;
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'Pending');
  const acceptedApplications = applications.filter(app => app.status === 'Accepted');
  const rejectedApplications = applications.filter(app => app.status === 'Rejected');

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">Labour Support</h1>
        <p className="text-emerald-100 text-sm">Find & manage workers for your farm</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-white px-5">
        <button
          onClick={() => setActiveTab('available')}
          className={`py-3 px-4 font-medium text-sm transition ${activeTab === 'available' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-stone-500'}`}
        >
          <UserPlus size={16} className="inline mr-1" />
          Available Workers
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`py-3 px-4 font-medium text-sm transition ${activeTab === 'applications' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-stone-500'}`}
        >
          <Briefcase size={16} className="inline mr-1" />
          Applications ({pendingApplications.length})
        </button>
      </div>

      {activeTab === 'available' ? (
        // Available Labourers List
        <div className="p-5 space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 mb-2">
            <p className="text-sm text-emerald-800">👥 {labourers.length} workers available near you</p>
          </div>
          
          {labourers.map(labourer => (
            <div key={labourer.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-stone-800">{labourer.name}</h3>
                    <div className="flex items-center text-sm text-stone-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      {labourer.district}
                    </div>
                  </div>
                  <div className="flex items-center bg-emerald-50 px-2 py-1 rounded-lg">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold">{labourer.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {labourer.skills.split(',').map((skill, i) => (
                      <span key={i} className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">{skill.trim()}</span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Experience: {labourer.experience}</span>
                    <span className="text-emerald-700 font-semibold">₹{labourer.wage}/day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Completed Jobs: {labourer.completedJobs}</span>
                    <span className="text-stone-500">📞 {labourer.phone}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCall(labourer.phone)}
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center"
                  >
                    <Phone size={16} className="mr-2" />
                    Call
                  </button>
                  <button
                    onClick={() => {
                      const job = myJobs.find(j => j.status === 'Open');
                      if (job) {
                        handleApply(labourer, job);
                      } else {
                        alert('Please post a job first!');
                        navigate('/post-job');
                      }
                    }}
                    className="flex-1 border-2 border-emerald-600 text-emerald-700 py-2 rounded-lg text-sm font-semibold"
                  >
                    Hire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Applications List
        <div className="p-5 space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-stone-500">No applications yet</p>
              <p className="text-xs text-stone-400 mt-1">When workers apply, you'll see them here</p>
            </div>
          ) : (
            <>
              {/* Pending Applications */}
              {pendingApplications.length > 0 && (
                <div>
                  <h3 className="font-semibold text-stone-700 mb-2">Pending ({pendingApplications.length})</h3>
                  {pendingApplications.map(app => (
                    <div key={app.id} className="bg-yellow-50 rounded-xl p-4 mb-3 border border-yellow-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{app.labourerName}</p>
                          <p className="text-sm text-stone-600">{app.jobTitle}</p>
                          <p className="text-xs text-stone-500 mt-1">{app.labourerDistrict}</p>
                          {app.message && <p className="text-xs text-stone-600 mt-2 italic">"{app.message}"</p>}
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => {
                            const updated = applications.map(a => 
                              a.id === app.id ? { ...a, status: 'Accepted' } : a
                            );
                            localStorage.setItem('jobApplications', JSON.stringify(updated));
                            setApplications(updated);
                            alert(`Accepted ${app.labourerName} for the job!`);
                          }}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            const updated = applications.map(a => 
                              a.id === app.id ? { ...a, status: 'Rejected' } : a
                            );
                            localStorage.setItem('jobApplications', JSON.stringify(updated));
                            setApplications(updated);
                            alert(`Rejected ${app.labourerName}'s application`);
                          }}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Accepted Applications */}
              {acceptedApplications.length > 0 && (
                <div>
                  <h3 className="font-semibold text-stone-700 mb-2">Accepted ({acceptedApplications.length})</h3>
                  {acceptedApplications.map(app => (
                    <div key={app.id} className="bg-green-50 rounded-xl p-4 mb-3 border border-green-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{app.labourerName}</p>
                          <p className="text-sm text-stone-600">{app.jobTitle}</p>
                          <button onClick={() => handleCall(app.labourerPhone)} className="mt-2 text-emerald-600 text-sm flex items-center">
                            <Phone size={14} className="mr-1" /> Call {app.labourerPhone}
                          </button>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && selectedLabour && selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Hire {selectedLabour.name}</h2>
            </div>
            <div className="p-5">
              <div className="bg-emerald-50 p-3 rounded-xl mb-4">
                <p className="text-sm text-stone-600">Job: {selectedJob.cropName} - {selectedJob.workType}</p>
                <p className="text-sm text-stone-600">Wage: ₹{selectedJob.wagePerDay}/day</p>
                <p className="text-sm text-stone-600">Location: {selectedJob.location}</p>
              </div>
              <textarea
                placeholder="Message to worker (optional)"
                value={applyMessage}
                onChange={(e) => setApplyMessage(e.target.value)}
                rows="3"
                className="w-full p-3 border rounded-xl mb-4"
              />
              <div className="flex gap-2">
                <button onClick={() => setShowApplyModal(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                <button onClick={submitApplication} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg">Send Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabourSupport;