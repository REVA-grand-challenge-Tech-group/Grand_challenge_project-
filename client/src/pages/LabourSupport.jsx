import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LabourSupport = () => {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState({});
  
  const labourers = [
    { id: 1, name: 'Ramesh Kumar', skills: 'Harvesting, Ploughing', location: '2 km', available: true, rating: 4.5, wage: 400, experience: '5 years' },
    { id: 2, name: 'Suresh Patil', skills: 'Irrigation, Pesticides', location: '5 km', available: true, rating: 4.2, wage: 350, experience: '3 years' },
    { id: 3, name: 'Mahesh Sharma', skills: 'Ploughing, Sowing', location: '3 km', available: false, rating: 4.0, wage: 400, experience: '4 years' },
    { id: 4, name: 'Ganesh Rao', skills: 'Harvesting, Loading', location: '1 km', available: true, rating: 4.8, wage: 450, experience: '7 years' },
  ];

  const handleApply = (id) => {
    setApplied({ ...applied, [id]: true });
    setTimeout(() => {
      alert('Application sent to farmer! They will contact you soon.');
    }, 100);
  };

  const filtered = labourers.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.skills.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <div><h1 className="text-xl font-bold">{t('labour_support')}</h1><p className="text-xs text-green-200">Find workers near you</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <input type="text" placeholder={t('search_placeholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none mb-4" />
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-4">
          <div className="flex justify-between items-center"><span className="text-sm font-semibold text-blue-800">{t('available_today')}</span><span className="text-2xl font-bold text-blue-600">{labourers.filter(l => l.available).length}</span></div>
        </div>

        <div className="space-y-4">
          {filtered.map((labour) => (
            <div key={labour.id} className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div><div className="flex items-center"><span className="text-2xl mr-2">👨‍🌾</span><span className="font-bold text-gray-800 text-lg">{labour.name}</span></div>
                <p className="text-sm text-gray-600 mt-1">{labour.skills}</p>
                <p className="text-xs text-gray-400 mt-1">📍 {labour.location} away • ⭐ {labour.rating} • 💰 ₹{labour.wage}/day</p></div>
                <div>{labour.available ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Available</span> : <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Busy</span>}</div>
              </div>
              {labour.available && (
                <button onClick={() => handleApply(labour.id)} disabled={applied[labour.id]} className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400">
                  {applied[labour.id] ? '✓ Applied' : '📞 Request Worker'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabourSupport;