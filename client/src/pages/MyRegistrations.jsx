import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Calendar, DollarSign } from 'lucide-react';

const MyRegistrations = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('registeredCrops');
    if (saved) {
      setRegistrations(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Remove this registration?')) {
      const updated = registrations.filter(r => r.id !== id);
      setRegistrations(updated);
      localStorage.setItem('registeredCrops', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold">My Registered Crops</h1>
        <p className="text-emerald-100 text-sm">Track your registered crops</p>
      </div>

      <div className="p-5">
        {registrations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <p className="text-stone-500">No crops registered yet</p>
            <button 
              onClick={() => navigate('/market-prediction')}
              className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg"
            >
              Register a Crop
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map(crop => (
              <div key={crop.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-stone-800">{crop.cropName}</h3>
                    <p className="text-xs text-stone-500">Registered: {new Date(crop.registrationDate).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDelete(crop.id)} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <p className="text-xs text-stone-500">Area</p>
                    <p className="font-semibold">{crop.area} acres</p>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <p className="text-xs text-stone-500">Expected Yield</p>
                    <p className="font-semibold">{crop.expectedYield} quintals</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div>
                    <p className="text-xs text-stone-500">Market Price</p>
                    <p className="font-bold text-emerald-700">₹{crop.currentPrice}/qtl</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-500">Expected Profit</p>
                    <p className="font-bold text-emerald-700">₹{crop.expectedProfit?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;