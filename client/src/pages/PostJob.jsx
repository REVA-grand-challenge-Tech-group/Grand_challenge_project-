import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, DollarSign, Users, MapPin, Mic, AlertCircle, CheckCircle } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    cropName: '',
    workType: 'Harvesting',
    labourersNeeded: '',
    wagePerDay: '',
    startDate: '',
    endDate: '',
    location: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [voiceActive, setVoiceActive] = useState(null);
  const [errors, setErrors] = useState({});

  const workTypes = ['Planting', 'Harvesting', 'Irrigation', 'Pesticide Spray', 'Weeding', 'Ploughing', 'Fertilizer Application', 'Other'];

  // Calculate total payment
  const calculateTotal = () => {
    const labourers = parseInt(formData.labourersNeeded) || 0;
    const wage = parseInt(formData.wagePerDay) || 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    if (labourers && wage && start && end && start <= end) {
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return labourers * wage * days;
    }
    return 0;
  };

  const totalPayment = calculateTotal();
  const workingDays = formData.startDate && formData.endDate ? 
    Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1 : 0;

  // Voice input function using Bhashini
  const startVoiceInput = (field, validationType) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    setVoiceActive(field);
    
    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;
      let isValid = true;
      let errorMsg = '';
      
      // Validate based on field type
      switch(validationType) {
        case 'crop':
          const cropKeywords = ['rice', 'wheat', 'tomato', 'onion', 'potato', 'chilli', 'sugarcane', 'cotton', 'maize', 'paddy'];
          const foundCrop = cropKeywords.find(crop => transcript.toLowerCase().includes(crop));
          if (foundCrop) {
            transcript = foundCrop.charAt(0).toUpperCase() + foundCrop.slice(1);
          } else {
            isValid = false;
            errorMsg = 'Please speak a valid crop name (e.g., Rice, Tomato, Wheat)';
          }
          break;
        case 'number':
          const numbers = transcript.replace(/\D/g, '');
          if (numbers) {
            transcript = numbers;
          } else {
            isValid = false;
            errorMsg = 'Please speak a valid number';
          }
          break;
        case 'date':
          const dateMatch = transcript.match(/\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}-\d{2}-\d{2}/);
          if (dateMatch) {
            transcript = dateMatch[0];
          } else {
            isValid = false;
            errorMsg = 'Please speak a valid date (e.g., 2024-01-15)';
          }
          break;
        case 'location':
          if (transcript.length < 3) {
            isValid = false;
            errorMsg = 'Please speak a valid location name';
          }
          break;
        default:
          break;
      }
      
      if (isValid) {
        setFormData(prev => ({ ...prev, [field]: transcript }));
        setErrors(prev => ({ ...prev, [field]: '' }));
      } else {
        setErrors(prev => ({ ...prev, [field]: errorMsg }));
        setTimeout(() => setErrors(prev => ({ ...prev, [field]: '' })), 3000);
      }
      setVoiceActive(null);
    };
    
    recognition.onerror = () => {
      setErrors(prev => ({ ...prev, [field]: 'Voice recognition failed. Please try again.' }));
      setVoiceActive(null);
      setTimeout(() => setErrors(prev => ({ ...prev, [field]: '' })), 3000);
    };
    
    recognition.start();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cropName) newErrors.cropName = 'Crop name is required';
    if (!formData.labourersNeeded || formData.labourersNeeded < 1) newErrors.labourersNeeded = 'Valid number of labourers required';
    if (!formData.wagePerDay || formData.wagePerDay < 100) newErrors.wagePerDay = 'Valid wage per day required (min ₹100)';
    if (!formData.startDate) newErrors.startDate = 'Start date required';
    if (!formData.endDate) newErrors.endDate = 'End date required';
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!formData.location) newErrors.location = 'Location required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    // Create job object
    const jobData = {
      id: Date.now(),
      farmerId: user?.id || Date.now(),
      farmerName: user?.fullName || 'Farmer',
      ...formData,
      labourersNeeded: parseInt(formData.labourersNeeded),
      wagePerDay: parseInt(formData.wagePerDay),
      totalPayment: totalPayment,
      workingDays: workingDays,
      status: 'Open',
      applicants: [],
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage (simulate backend)
    const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    existingJobs.push(jobData);
    localStorage.setItem('jobs', JSON.stringify(existingJobs));
    
    // Update farmer's posted jobs count
    const postedJobs = JSON.parse(localStorage.getItem('myPostedJobs') || '[]');
    postedJobs.push({ ...jobData, status: 'Open' });
    localStorage.setItem('myPostedJobs', JSON.stringify(postedJobs));
    
    setSuccess(true);
    setSubmitting(false);
    
    setTimeout(() => {
      navigate('/my-jobs');
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">Job Posted Successfully!</h2>
          <p className="text-stone-500 mt-2">Redirecting to My Jobs...</p>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">Post a Job</h1>
        <p className="text-emerald-100 text-sm mt-1">Hire workers for your farm</p>
      </div>

      <div className="max-w-2xl mx-auto p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Crop Name with Voice */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Crop Name *</label>
            <div className="relative">
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleChange}
                placeholder="e.g., Rice, Tomato, Wheat"
                className={`w-full p-3 pr-12 bg-white border rounded-xl focus:ring-2 focus:ring-emerald-500 ${errors.cropName ? 'border-red-500' : 'border-stone-200'}`}
              />
              <button
                type="button"
                onClick={() => startVoiceInput('cropName', 'crop')}
                className={`absolute right-3 top-3 p-1 rounded ${voiceActive === 'cropName' ? 'bg-red-500 text-white' : 'text-emerald-600'}`}
              >
                <Mic size={18} />
              </button>
            </div>
            {errors.cropName && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle size={12} className="mr-1" />{errors.cropName}</p>}
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Work Type *</label>
            <select
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
            >
              {workTypes.map(type => <option key={type}>{type}</option>)}
            </select>
          </div>

          {/* Labourers & Wage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Labourers Needed *</label>
              <div className="relative">
                <Users size={18} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="number"
                  name="labourersNeeded"
                  value={formData.labourersNeeded}
                  onChange={handleChange}
                  placeholder="Number"
                  className={`w-full pl-10 pr-12 p-3 bg-white border rounded-xl ${errors.labourersNeeded ? 'border-red-500' : 'border-stone-200'}`}
                />
                <button
                  type="button"
                  onClick={() => startVoiceInput('labourersNeeded', 'number')}
                  className={`absolute right-3 top-3 p-1 rounded ${voiceActive === 'labourersNeeded' ? 'bg-red-500 text-white' : 'text-emerald-600'}`}
                >
                  <Mic size={18} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Wage per Day (₹) *</label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="number"
                  name="wagePerDay"
                  value={formData.wagePerDay}
                  onChange={handleChange}
                  placeholder="Amount"
                  className={`w-full pl-10 pr-12 p-3 bg-white border rounded-xl ${errors.wagePerDay ? 'border-red-500' : 'border-stone-200'}`}
                />
                <button
                  type="button"
                  onClick={() => startVoiceInput('wagePerDay', 'number')}
                  className={`absolute right-3 top-3 p-1 rounded ${voiceActive === 'wagePerDay' ? 'bg-red-500 text-white' : 'text-emerald-600'}`}
                >
                  <Mic size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Start Date *</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 p-3 bg-white border rounded-xl ${errors.startDate ? 'border-red-500' : 'border-stone-200'}`}
                />
                <button
                  type="button"
                  onClick={() => startVoiceInput('startDate', 'date')}
                  className={`absolute right-3 top-3 p-1 rounded ${voiceActive === 'startDate' ? 'bg-red-500 text-white' : 'text-emerald-600'}`}
                >
                  <Mic size={18} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">End Date *</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 p-3 bg-white border rounded-xl ${errors.endDate ? 'border-red-500' : 'border-stone-200'}`}
                />
                <button
                  type="button"
                  onClick={() => startVoiceInput('endDate', 'date')}
                  className={`absolute right-3 top-3 p-1 rounded ${voiceActive === 'endDate' ? 'bg-red-500 text-white' : 'text-emerald-600'}`}
                >
                  <Mic size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Location with Voice */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Location *</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Mandya, Karnataka"
                className={`w-full pl-10 pr-12 p-3 bg-white border rounded-xl ${errors.location ? 'border-red-500' : 'border-stone-200'}`}
              />
              <button
                type="button"
                onClick={() => startVoiceInput('location', 'location')}
                className={`absolute right-3 top-3 p-1 rounded ${voiceActive === 'location' ? 'bg-red-500 text-white' : 'text-emerald-600'}`}
              >
                <Mic size={18} />
              </button>
            </div>
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Additional Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any specific requirements..."
              rows="3"
              className="w-full p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Live Summary Card */}
          {(formData.cropName || formData.labourersNeeded || formData.wagePerDay) && (
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2">📋 Job Summary</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-stone-600">Crop:</span> <span className="font-medium">{formData.cropName || '—'}</span></p>
                <p><span className="text-stone-600">Work:</span> <span className="font-medium">{formData.workType}</span></p>
                <p><span className="text-stone-600">Labourers:</span> <span className="font-medium">{formData.labourersNeeded || '0'} persons</span></p>
                <p><span className="text-stone-600">Wage:</span> <span className="font-medium">₹{formData.wagePerDay || '0'}/day</span></p>
                <p><span className="text-stone-600">Duration:</span> <span className="font-medium">{workingDays || '0'} days</span></p>
                <div className="pt-2 mt-2 border-t border-emerald-200">
                  <p className="flex justify-between">
                    <span className="font-semibold">Total Payment:</span>
                    <span className="font-bold text-emerald-700 text-lg">₹{totalPayment.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {submitting ? 'Posting...' : '📢 Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;