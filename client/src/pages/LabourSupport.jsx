import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LabourSupport = () => {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState({});
  
  const labourers = [
    { id: 1, name: 'KAMALA', skills: 'Harvesting, Ploughing, Irrigation', location: '2 km', available: true, rating: 4.9, wage: 450, phone: '8660991961', phoneType: 'smartphone' },
    { id: 2, name: 'BASAMMA', skills: 'Pesticide Spray, Harvesting', location: '3 km', available: true, rating: 4.7, wage: 400, phone: '9380514411', phoneType: 'smartphone' },
    { id: 3, name: 'SAKAMMA', skills: 'Loading, Ploughing', location: '5 km', available: true, rating: 4.5, wage: 380, phone: '7411124763', phoneType: 'keypad' },
    { id: 4, name: 'VISHVANNA', skills: 'Weeding, Sowing', location: '4 km', available: true, rating: 4.6, wage: 370, phone: '8217432456', phoneType: 'keypad' },
    { id: 5, name: 'ZIAUDDIN', skills: 'Harvesting, Sorting', location: '6 km', available: true, rating: 4.8, wage: 420, phone: '9229935920', phoneType: 'smartphone' },
  ];

  const filtered = labourers.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.skills.toLowerCase().includes(search.toLowerCase()));

  const handleApply = (id) => {
    setApplied({ ...applied, [id]: true });
    alert('Application sent to farmer! They will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <div><h1 className="text-xl font-bold">Labour Connect</h1><p className="text-xs text-green-200">Find workers near you</p></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <input type="text" placeholder="🔍 Search labourers by name or skill..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none mb-4" />
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-4">
          <div className="flex justify-between items-center"><span className="text-sm font-semibold text-blue-800">📊 Available Today</span><span className="text-2xl font-bold text-blue-600">{labourers.filter(l => l.available).length}</span></div>
        </div>

        <div className="space-y-4">
          {filtered.map((labour) => (
            <div key={labour.id} className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div><div className="flex items-center"><span className="text-2xl mr-2">👨‍🌾</span><span className="font-bold text-gray-800 text-lg">{labour.name}</span></div>
                <p className="text-sm text-gray-600 mt-1">{labour.skills}</p>
                <p className="text-xs text-gray-400 mt-1">📍 {labour.location} away • ⭐ {labour.rating} • 💰 ₹{labour.wage}/day</p>
                <p className="text-xs text-blue-500 mt-1">📞 {labour.phone}</p></div>
                <div>{labour.available ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Available</span> : <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Busy</span>}</div>
              </div>
              
              {labour.available && (
                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleApply(labour.id)} disabled={applied[labour.id]} className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 disabled:bg-gray-400">
                    {applied[labour.id] ? '✓ Applied' : '📝 Request Worker'}
                  </button>
                  <div className="flex-1 border-2 border-green-600 bg-green-50 text-green-700 py-2 rounded-xl text-sm font-medium text-center">
                    📞 {labour.phone}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-orange-50 rounded-2xl p-4 border border-orange-200">
          <h3 className="font-bold text-orange-800">📞 No Smartphone?</h3>
          <p className="text-sm text-orange-700 mt-1">Call our helpline to find work</p>
          <div className="block mt-3 bg-orange-600 text-white text-center py-2 rounded-lg">
            📞 Call 1800-123-4567
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabourSupport;