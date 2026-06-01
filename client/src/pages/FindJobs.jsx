import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, MapPin, DollarSign, Users, Calendar, Mic, Search, CheckCircle, Clock } from 'lucide-react';

const FindJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showSuccess, setShowSuccess] = useState(null);
  const [voiceActive, setVoiceActive] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(null);
  const [applyMessage, setApplyMessage] = useState('');

  // Demo jobs
  const demoJobs = [
    { id: 101, cropName: '🌾 Rice', workType: 'Harvesting', labourersNeeded: 5, wagePerDay: 350, location: 'Mandya, Karnataka', workingDays: 3, farmerName: 'Ramesh Kumar', farmerId: 'farmer_1', postedDate: '2024-01-15', status: 'Open', applicants: [] },
    { id: 102, cropName: '🍅 Tomato', workType: 'Planting', labourersNeeded: 3, wagePerDay: 300, location: 'Hassan, Karnataka', workingDays: 2, farmerName: 'Suresh Hegde', farmerId: 'farmer_2', postedDate: '2024-01-14', status: 'Open', applicants: [] },
    { id: 103, cropName: '🧅 Onion', workType: 'Weeding', labourersNeeded: 4, wagePerDay: 280, location: 'Mysore, Karnataka', workingDays: 4, farmerName: 'Mahesh Reddy', farmerId: 'farmer_3', postedDate: '2024-01-13', status: 'Open', applicants: [] },
  ];

  useEffect(() => {
    initializeJobs();
    loadAppliedJobs();
  }, []);

  const initializeJobs = () => {
    const storedJobs = localStorage.getItem('jobs');
    if (!storedJobs || JSON.parse(storedJobs).length === 0) {
      localStorage.setItem('jobs', JSON.stringify(demoJobs));
      setJobs(demoJobs);
      setFilteredJobs(demoJobs);
    } else {
      const allJobs = JSON.parse(storedJobs);
      const availableJobs = allJobs.filter(job => job.status === 'Open');
      setJobs(availableJobs);
      setFilteredJobs(availableJobs);
    }
  };

  const loadAppliedJobs = () => {
    const labourerId = user?.id || 'labourer_1';
    const applied = JSON.parse(localStorage.getItem(`applied_${labourerId}`) || '[]');
    setAppliedJobs(applied);
  };

  const startVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    setVoiceActive(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      filterJobs(transcript);
      setVoiceActive(false);
    };
    recognition.onerror = () => setVoiceActive(false);
    recognition.start();
  };

  const filterJobs = (term) => {
    if (!term.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    const filtered = jobs.filter(job => 
      job.cropName.toLowerCase().includes(term.toLowerCase()) ||
      job.workType.toLowerCase().includes(term.toLowerCase()) ||
      job.location.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterJobs(term);
  };

  const handleApplyClick = (job) => {
    setShowMessageModal(job);
    setApplyMessage(`I am interested in the ${job.cropName} ${job.workType} job.`);
  };

  const submitApplication = () => {
    const job = showMessageModal;
    const labourerId = user?.id || 'labourer_' + Date.now();
    const applicationId = Date.now();
    
    if (appliedJobs.includes(job.id)) {
      alert(`You have already applied for ${job.cropName} - ${job.workType}`);
      setShowMessageModal(null);
      return;
    }

    const application = {
      id: applicationId,
      jobId: job.id,
      jobTitle: `${job.cropName} - ${job.workType}`,
      cropName: job.cropName,
      workType: job.workType,
      farmerName: job.farmerName,
      farmerId: job.farmerId,
      location: job.location,
      wage: job.wagePerDay,
      labourerId: labourerId,
      labourerName: user?.fullName || 'Labourer',
      labourerPhone: user?.phoneNumber || '9876543210',
      labourerDistrict: user?.district || 'Mandya',
      message: applyMessage,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    };

    // Save to jobApplications
    const existingApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    existingApps.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(existingApps));

    // Update job with applicant
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = allJobs.findIndex(j => j.id === job.id);
    if (jobIndex !== -1) {
      if (!allJobs[jobIndex].applicants) allJobs[jobIndex].applicants = [];
      allJobs[jobIndex].applicants.push(application);
      localStorage.setItem('jobs', JSON.stringify(allJobs));
    }

    // Update applied jobs for this labourer
    const updatedApplied = [...appliedJobs, job.id];
    setAppliedJobs(updatedApplied);
    localStorage.setItem(`applied_${labourerId}`, JSON.stringify(updatedApplied));

    // Save to labourer's myApplications
    const myApps = JSON.parse(localStorage.getItem(`myApplications_${labourerId}`) || '[]');
    myApps.push(application);
    localStorage.setItem(`myApplications_${labourerId}`, JSON.stringify(myApps));

    setShowSuccess(job.id);
    setShowMessageModal(null);
    setApplyMessage('');
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const isApplied = (jobId) => appliedJobs.includes(jobId);

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6 sticky top-0 z-10">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4 hover:opacity-80">
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold">Find Jobs</h1>
        <p className="text-emerald-100 text-sm mt-1">Available work opportunities near you</p>
      </div>

      <div className="bg-white px-5 py-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-stone-600">Available Jobs</span>
          <span className="font-bold text-emerald-700">{filteredJobs.length} positions</span>
        </div>
      </div>

      <div className="sticky top-28 z-10 bg-stone-50 px-5 pt-4 pb-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-stone-400" />
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by crop, work type, or location..." className="w-full pl-10 pr-12 p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500" />
          <button onClick={startVoiceSearch} className={`absolute right-3 top-2 p-2 rounded-full transition ${voiceActive ? 'bg-red-500 text-white animate-pulse' : 'text-emerald-600'}`}><Mic size={18} /></button>
        </div>
        {voiceActive && <p className="text-xs text-emerald-600 mt-2 text-center animate-pulse">🎤 Listening... Speak crop name, work type, or location</p>}
      </div>

      <div className="px-5 pb-24 space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12"><div className="text-6xl mb-4">🔍</div><p className="text-stone-500">No jobs found</p></div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div><h3 className="font-bold text-lg text-stone-800">{job.cropName}</h3><p className="text-sm text-emerald-600">{job.workType}</p></div>
                  {isApplied(job.id) && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center"><CheckCircle size={12} className="mr-1" />Applied</span>}
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-stone-600"><DollarSign size={16} className="mr-1 text-emerald-600" /><span className="font-semibold text-emerald-700">₹{job.wagePerDay}</span><span className="ml-1">per day</span><span className="mx-2">•</span><Users size={16} className="mr-1 text-emerald-600" /><span>{job.labourersNeeded} workers needed</span></div>
                  <div className="flex items-center text-sm text-stone-600"><MapPin size={16} className="mr-1 text-emerald-600" /><span>{job.location}</span><span className="mx-2">•</span><Calendar size={16} className="mr-1 text-emerald-600" /><span>{job.workingDays} days</span></div>
                </div>
                <div className="bg-stone-50 rounded-lg p-3 mb-4"><div className="flex justify-between items-center"><p className="text-xs text-stone-500">👨‍🌾 Posted by: {job.farmerName}</p><p className="text-xs text-stone-400">📅 {new Date(job.postedDate).toLocaleDateString()}</p></div></div>
                <button onClick={() => handleApplyClick(job)} disabled={isApplied(job.id)} className={`w-full py-2.5 rounded-lg text-sm font-semibold transition ${isApplied(job.id) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>{isApplied(job.id) ? '✓ Application Submitted' : '📝 Apply Now'}</button>
                {showSuccess === job.id && <div className="mt-2 bg-green-50 text-green-700 text-xs p-2 rounded-lg text-center">✅ Application submitted! Check "My Applications" for status.</div>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowMessageModal(null)} />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 p-5 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-3">Application Message</h2>
            <p className="text-sm text-stone-600 mb-2">Job: {showMessageModal.cropName} - {showMessageModal.workType}</p>
            <textarea value={applyMessage} onChange={(e) => setApplyMessage(e.target.value)} rows="4" className="w-full p-3 border rounded-xl mb-4" placeholder="Add a message to the farmer..."></textarea>
            <div className="flex gap-3"><button onClick={() => setShowMessageModal(null)} className="flex-1 py-2 border rounded-lg">Cancel</button><button onClick={submitApplication} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg">Submit Application</button></div>
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg">
        <div className="flex justify-around py-2 max-w-md mx-auto">
          <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center py-2 px-6 text-stone-400"><span className="text-xl">🏠</span><span className="text-xs mt-1">Home</span></button>
          <button onClick={() => navigate('/my-applications')} className="flex flex-col items-center py-2 px-6 text-emerald-600"><span className="text-xl">📋</span><span className="text-xs mt-1">My Apps</span></button>
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center py-2 px-6 text-stone-400"><span className="text-xl">👤</span><span className="text-xs mt-1">Profile</span></button>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;