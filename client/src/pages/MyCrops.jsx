import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Sprout, Calendar, DollarSign, Plus } from 'lucide-react';

const MyCrops = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [registeredCrops, setRegisteredCrops] = useState([]);

  useEffect(() => {
    loadRegisteredCrops();
    // Listen for storage events
    window.addEventListener('storage', loadRegisteredCrops);
    return () => window.removeEventListener('storage', loadRegisteredCrops);
  }, [user]);

  const loadRegisteredCrops = () => {
    const allCrops = JSON.parse(localStorage.getItem('registeredCrops') || '[]');
    
    // Get user ID from multiple possible sources
    const userId = user?.id || user?._id || localStorage.getItem('userId') || 'farmer_1';
    const userPhone = user?.phoneNumber || localStorage.getItem('userPhone');
    const userEmail = user?.email || localStorage.getItem('userEmail');
    
    console.log('=== MY CROPS DEBUG ===');
    console.log('User object:', user);
    console.log('User ID from various sources:', { userId, userPhone, userEmail });
    console.log('All crops in storage:', allCrops);
    
    // Filter crops - try multiple matching criteria
    let myCrops = [];
    
    if (userId && userId !== 'farmer_1') {
      myCrops = allCrops.filter(crop => crop.farmerId === userId);
    }
    
    // If no crops found by ID, try by phone number
    if (myCrops.length === 0 && userPhone) {
      myCrops = allCrops.filter(crop => crop.farmerPhone === userPhone);
    }
    
    // If still no crops, show all crops for demo (temporary fix)
    if (myCrops.length === 0 && allCrops.length > 0) {
      console.log('No matching crops found by ID, showing all crops for demo');
      myCrops = allCrops;
    }
    
    console.log('Filtered crops:', myCrops);
    setRegisteredCrops(myCrops);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Growing': return 'bg-green-100 text-green-700';
      case 'Harvested': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4 hover:opacity-80">
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold">My Crops</h1>
        <p className="text-emerald-100 text-sm mt-1">Track your registered crops</p>
      </div>

      <div className="p-5">
        {registeredCrops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-semibold text-stone-700 mb-2">No Crops Registered Yet</h3>
            <p className="text-stone-500 mb-6">Register your crops to track prices and get recommendations</p>
            <button 
              onClick={() => navigate('/market-prediction')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center mx-auto gap-2"
            >
              <Plus size={18} />
              Go to Market Prediction
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {registeredCrops.map((crop, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-stone-800 flex items-center">
                        <Sprout size={18} className="mr-2 text-emerald-600" />
                        {crop.cropName}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">Registered: {new Date(crop.registrationDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(crop.status || 'Growing')}`}>
                      {crop.status || 'Registered'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-emerald-50 p-2 rounded-lg">
                      <p className="text-xs text-stone-500">Area</p>
                      <p className="font-semibold">{crop.area || 0} acres</p>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-lg">
                      <p className="text-xs text-stone-500">Expected Yield</p>
                      <p className="font-semibold">{crop.expectedYield || 0} quintals</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <p className="text-xs text-stone-500">Expected Price</p>
                      <p className="font-bold text-emerald-700">₹{crop.currentPrice || crop.expectedPrice}/qtl</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-stone-500">Demand</p>
                      <p className="font-bold text-emerald-700">{crop.demand || 'Medium'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => navigate('/market-prediction')}
              className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mt-4"
            >
              <Plus size={18} />
              Register More Crops
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCrops;