import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import VoiceInput from '../components/VoiceInput';
import EmergencyButton from '../components/EmergencyButton';

const LabourSupport = () => {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  
  const labourers = [
    { name: 'Ramesh Kumar', skills: 'Harvesting, Ploughing', location: '2 km', available: true, rating: 4.5 },
    { name: 'Suresh Patil', skills: 'Irrigation, Pesticides', location: '5 km', available: true, rating: 4.2 },
    { name: 'Mahesh Sharma', skills: 'Ploughing, Sowing', location: '3 km', available: false, rating: 4.0 },
    { name: 'Ganesh Rao', skills: 'Harvesting, Loading', location: '1 km', available: true, rating: 4.8 },
  ];

  const handleVoiceSearch = (text) => {
    setSearch(text);
  };

  const filtered = labourers.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.skills.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <div><h1 className="text-xl font-bold">{t('labour_connect')}</h1><p className="text-xs text-green-200">{t('labour_subtitle')}</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-4">
          <input type="text" placeholder="🔍 Search labourers by name or skill..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 p-4 border-2 rounded-xl focus:border-green-500 outline-none" />
          <VoiceInput onResult={handleVoiceSearch} />
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-4">
          <div className="flex justify-between items-center"><span className="text-sm font-semibold text-blue-800">📊 Available Today</span><span className="text-2xl font-bold text-blue-600">{labourers.filter(l => l.available).length}</span></div>
        </div>

        <div className="space-y-4">
          {filtered.map((labour, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center"><div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl">👨‍🌾</div><div className="ml-3"><div className="font-bold text-gray-800">{labour.name}</div><div className="flex items-center mt-1"><span className="text-yellow-500">⭐</span><span className="text-xs text-gray-600 ml-1">{labour.rating}</span></div></div></div>
                <span className={labour.available ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold' : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold'}>{labour.available ? 'Available' : 'Busy'}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{labour.skills}</p>
              <p className="text-xs text-gray-400 mt-1">📍 {labour.location} away</p>
              {labour.available && <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700">📞 Request Worker</button>}
            </div>
          ))}
        </div>
        
        {filtered.length === 0 && <div className="text-center py-8"><p className="text-gray-500">No labourers found matching "{search}"</p></div>}
      </div>
      
      <EmergencyButton />
    </div>
  );
};

export default LabourSupport;