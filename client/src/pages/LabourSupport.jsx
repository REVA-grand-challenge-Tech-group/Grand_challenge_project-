import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import NavigationMenu from '../components/NavigationMenu';

const LabourSupport = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [labourers, setLabourers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState({});

  useEffect(() => { fetchLabourers(); }, []);

  const fetchLabourers = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/labour');
      const data = await response.json();
      if (data.success && data.labourers.length > 0) setLabourers(data.labourers);
      else {
        setLabourers([
          { id: 1, name: 'Ramesh Kumar', skills: ['Harvesting', 'Ploughing'], location: '2 km', available: true, rating: 4.5, wage: 400, phone: '9876543210', experience: '5 years' },
          { id: 2, name: 'Suresh Patil', skills: ['Irrigation', 'Pesticides'], location: '5 km', available: true, rating: 4.2, wage: 350, phone: '9876543211', experience: '3 years' },
          { id: 3, name: 'Mahesh Sharma', skills: ['Ploughing', 'Sowing'], location: '3 km', available: false, rating: 4.0, wage: 400, phone: '9876543212', experience: '4 years' },
          { id: 4, name: 'Ganesh Rao', skills: ['Harvesting', 'Loading'], location: '1 km', available: true, rating: 4.8, wage: 450, phone: '9876543213', experience: '7 years' },
        ]);
      }
    } catch (error) {
      setLabourers([
        { id: 1, name: 'Ramesh Kumar', skills: ['Harvesting', 'Ploughing'], location: '2 km', available: true, rating: 4.5, wage: 400, phone: '9876543210', experience: '5 years' },
        { id: 2, name: 'Suresh Patil', skills: ['Irrigation', 'Pesticides'], location: '5 km', available: true, rating: 4.2, wage: 350, phone: '9876543211', experience: '3 years' },
        { id: 3, name: 'Mahesh Sharma', skills: ['Ploughing', 'Sowing'], location: '3 km', available: false, rating: 4.0, wage: 400, phone: '9876543212', experience: '4 years' },
        { id: 4, name: 'Ganesh Rao', skills: ['Harvesting', 'Loading'], location: '1 km', available: true, rating: 4.8, wage: 450, phone: '9876543213', experience: '7 years' },
      ]);
    } finally { setLoading(false); }
  };

  const handleApply = (id) => { setApplied({ ...applied, [id]: true }); toast.success('Application sent to labourer! They will contact you soon.'); };

  const filtered = labourers.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.skills.some(s => s.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <NavigationMenu />
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4"><div className="text-center"><h1 className="text-xl font-bold">Labour Connect</h1><p className="text-xs text-green-200">Find workers near you</p></div></div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <input type="text" placeholder="🔍 Search labourers by name or skill..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none mb-4" />
        
        {/* Only Post a Job button - removed duplicate "Post Labour Requirement" */}
        <div className="mb-6">
          <Link to="/post-job">
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              📢 Post a Job (Hire Workers)
            </button>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 mb-4"><div className="flex justify-between items-center"><span className="text-sm font-semibold text-blue-800">📊 Available Today</span><span className="text-2xl font-bold text-blue-600">{labourers.filter(l => l.available).length}</span></div></div>
        
        {loading ? <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div></div> : (
          <div className="space-y-4">{filtered.map((labour) => (
            <div key={labour.id} className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
              <div className="flex justify-between items-start"><div><div className="flex items-center"><span className="text-2xl mr-2">👨‍🌾</span><span className="font-bold text-gray-800 text-lg">{labour.name}</span></div><p className="text-sm text-gray-600 mt-1">{labour.skills.join(', ')}</p><p className="text-xs text-gray-400 mt-1">📍 {labour.location} away • ⭐ {labour.rating} • 💰 ₹{labour.wage}/day</p><p className="text-xs text-blue-500 mt-1">📞 {labour.phone}</p></div><div>{labour.available ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Available</span> : <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Busy</span>}</div></div>
              {labour.available && <div className="mt-3 flex gap-2"><button onClick={() => handleApply(labour.id)} disabled={applied[labour.id]} className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 disabled:bg-gray-400">{applied[labour.id] ? '✓ Requested' : '📞 Request Worker'}</button><a href={`tel:${labour.phone}`} className="flex-1 border-2 border-green-600 text-green-600 py-2 rounded-xl text-sm font-medium hover:bg-green-50 transition-colors text-center">📞 Call Now</a></div>}
            </div>
          ))}</div>)}
        {filtered.length === 0 && <div className="text-center py-12"><p className="text-gray-500">No labourers found matching "{search}"</p></div>}
      </div>
    </div>
  );
};

export default LabourSupport;