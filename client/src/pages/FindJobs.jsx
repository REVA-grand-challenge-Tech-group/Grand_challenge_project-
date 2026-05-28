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

  // Demo jobs to show initially
  const demoJobs = [
    {
      id: 101,
      cropName: '🌾 Rice',
      workType: 'Harvesting',
      labourersNeeded: 5,
      wagePerDay: 350,
      location: 'Mandya, Karnataka',
      workingDays: 3,
      farmerName: 'Ramesh Kumar',
      postedDate: '2024-01-15',
      status: 'Open',
      applicants: []
    },
    {
      id: 102,
      cropName: '🍅 Tomato',
      workType: 'Planting',
      labourersNeeded: 3,
      wagePerDay: 300,
      location: 'Hassan, Karnataka',
      workingDays: 2,
      farmerName: 'Suresh Hegde',
      postedDate: '2024-01-14',
      status: 'Open',
      applicants: []
    },
    {
      id: 103,
      cropName: '🧅 Onion',
      workType: 'Weeding',
      labourersNeeded: 4,
      wagePerDay: 280,
      location: 'Mysore, Karnataka',
      workingDays: 4,
      farmerName: 'Mahesh Reddy',
      postedDate: '2024-01-13',
      status: 'Open',
      applicants: []
    },
    {
      id: 104,
      cropName: '🥔 Potato',
      workType: 'Pesticide Spray',
      labourersNeeded: 2,
      wagePerDay: 400,
      location: 'Belgaum, Karnataka',
      workingDays: 2,
      farmerName: 'Shivakumar',
      postedDate: '2024-01-12',
      status: 'Open',
      applicants: []
    },
    {
      id: 105,
      cropName: '🌾 Wheat',
      workType: 'Irrigation',
      labourersNeeded: 3,
      wagePerDay: 320,
      location: 'Hubli, Karnataka',
      workingDays: 5,
      farmerName: 'Paramesh',
      postedDate: '2024-01-11',
      status: 'Open',
      applicants: []
    },
    {
      id: 106,
      cropName: '🌽 Maize',
      workType: 'Harvesting',
      labourersNeeded: 6,
      wagePerDay: 350,
      location: 'Shimoga, Karnataka',
      workingDays: 4,
      farmerName: 'Ganesh',
      postedDate: '2024-01-10',
      status: 'Open',
      applicants: []
    }
  ];

  useEffect(() => {
    initializeJobs();
    loadAppliedJobs();
  }, []);

  const initializeJobs = () => {
    // Check if jobs exist in localStorage, if not, add demo jobs
    const storedJobs = localStorage.getItem('jobs');
    if (!storedJobs || JSON.parse(storedJobs).length === 0) {
      // Add demo jobs to localStorage
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
    const applied = JSON.parse(localStorage.getItem(`applied_${user?.id || 'demo'}`) || '[]');
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
    
    recognition.onerror = () => {
      setVoiceActive(false);
    };
    
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

  const handleApply = (jobId, jobTitle) => {
    const userId = user?.id || 'demo';
    
    if (appliedJobs.includes(jobId)) {
      alert(`You have already applied for ${jobTitle}`);
      return;
    }

    const updatedApplied = [...appliedJobs, jobId];
    setAppliedJobs(updatedApplied);
    localStorage.setItem(`applied_${userId}`, JSON.stringify(updatedApplied));

    // Update job applicants
    const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const jobIndex = allJobs.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
      allJobs[jobIndex].applicants = allJobs[jobIndex].applicants || [];
      allJobs[jobIndex].applicants.push({
        labourerId: userId,
        labourerName: user?.fullName || 'Labourer',
        appliedAt: new Date().toISOString(),
        status: 'Pending'
      });
      localStorage.setItem('jobs', JSON.stringify(allJobs));
    }

    // Save to labourer's applications
    const myApps = JSON.parse(localStorage.getItem(`myApplications_${userId}`) || '[]');
    myApps.push({
      jobId: jobId,
      jobTitle: jobTitle,
      cropName: allJobs.find(j => j.id === jobId)?.cropName,
      location: allJobs.find(j => j.id === jobId)?.location,
      wage: allJobs.find(j => j.id === jobId)?.wagePerDay,
      appliedDate: new Date().toISOString(),
      status: 'Pending'
    });
    localStorage.setItem(`myApplications_${userId}`, JSON.stringify(myApps));

    setShowSuccess(jobId);
    setTimeout(() => setShowSuccess(null), 3000);
  };

  const isApplied = (jobId) => appliedJobs.includes(jobId);

  // Get user ID for localStorage
  const userId = user?.id || 'demo';

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6 sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center space-x-2 mb-4 hover:opacity-80 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold">Find Jobs</h1>
        <p className="text-emerald-100 text-sm mt-1">Available work opportunities near you</p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white px-5 py-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-stone-600">Available Jobs</span>
          <span className="font-bold text-emerald-700">{filteredJobs.length} positions</span>
        </div>
      </div>

      {/* Search Bar with Voice */}
      <div className="sticky top-28 z-10 bg-stone-50 px-5 pt-4 pb-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by crop, work type, or location..."
            className="w-full pl-10 pr-12 p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={startVoiceSearch}
            className={`absolute right-3 top-2 p-2 rounded-full transition ${voiceActive ? 'bg-red-500 text-white animate-pulse' : 'text-emerald-600'}`}
          >
            <Mic size={18} />
          </button>
        </div>
        {voiceActive && (
          <p className="text-xs text-emerald-600 mt-2 text-center animate-pulse">
            🎤 Listening... Speak crop name, work type, or location
          </p>
        )}
      </div>

      {/* Jobs List */}
      <div className="px-5 pb-24 space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-stone-500">No jobs found</p>
            <p className="text-xs text-stone-400 mt-1">Try "rice", "harvesting", or "Mandya"</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-stone-800">{job.cropName}</h3>
                    <p className="text-sm text-emerald-600">{job.workType}</p>
                  </div>
                  {isApplied(job.id) && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      Applied
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-stone-600">
                    <DollarSign size={16} className="mr-1 text-emerald-600" />
                    <span className="font-semibold text-emerald-700">₹{job.wagePerDay}</span>
                    <span className="ml-1">per day</span>
                    <span className="mx-2">•</span>
                    <Users size={16} className="mr-1 text-emerald-600" />
                    <span>{job.labourersNeeded} workers needed</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-stone-600">
                    <MapPin size={16} className="mr-1 text-emerald-600" />
                    <span>{job.location}</span>
                    <span className="mx-2">•</span>
                    <Calendar size={16} className="mr-1 text-emerald-600" />
                    <span>{job.workingDays} days</span>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-stone-500">👨‍🌾 Posted by: {job.farmerName}</p>
                    <p className="text-xs text-stone-400">📅 {new Date(job.postedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.id, `${job.cropName} - ${job.workType}`)}
                  disabled={isApplied(job.id)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition ${
                    isApplied(job.id)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98'
                  }`}
                >
                  {isApplied(job.id) ? '✓ Application Submitted' : '📝 Apply Now'}
                </button>

                {showSuccess === job.id && (
                  <div className="mt-2 bg-green-50 text-green-700 text-xs p-2 rounded-lg text-center">
                    ✅ Application submitted! Check "My Applications" for status update.
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg">
        <div className="flex justify-around py-2 max-w-md mx-auto">
          <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center py-2 px-6 text-stone-400">
            <span className="text-xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button onClick={() => navigate('/my-applications')} className="flex flex-col items-center py-2 px-6 text-emerald-600">
            <span className="text-xl">📋</span>
            <span className="text-xs mt-1">My Apps</span>
          </button>
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center py-2 px-6 text-stone-400">
            <span className="text-xl">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;