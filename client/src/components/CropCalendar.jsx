import React from 'react';
import { useApp } from '../context/AppContext';

const CropCalendar = ({ crop, onClose }) => {
  const { t } = useApp();
  
  // Crop calendar data
  const calendarData = {
    'Ginger': {
      icon: '🫚',
      phases: [
        { name: '🌱 Sow', month: 'April-May', color: 'bg-green-500', days: '20-25 days' },
        { name: '💧 Fertilize', month: 'June-July', color: 'bg-yellow-500', days: '30-35 days' },
        { name: '🌾 Harvest', month: 'December-January', color: 'bg-orange-500', days: '210-240 days' },
        { name: '💰 Sell', month: 'January-March', color: 'bg-purple-500', days: 'Export demand' }
      ]
    },
    'Rice': {
      icon: '🌾',
      phases: [
        { name: '🌱 Sow', month: 'June-July', color: 'bg-green-500', days: '30-35 days' },
        { name: '🌿 Transplant', month: 'July-August', color: 'bg-blue-500', days: '25-30 days' },
        { name: '💧 Fertilize', month: 'August-September', color: 'bg-yellow-500', days: '15-20 days' },
        { name: '🌾 Harvest', month: 'October-November', color: 'bg-orange-500', days: '20-25 days' },
        { name: '💰 Sell', month: 'November-December', color: 'bg-purple-500', days: 'Best price' }
      ]
    },
    'Tomato': {
      icon: '🍅',
      phases: [
        { name: '🌱 Sow', month: 'January-February', color: 'bg-green-500', days: '10-15 days' },
        { name: '🌿 Transplant', month: 'February-March', color: 'bg-blue-500', days: '20-25 days' },
        { name: '💧 Fertilize', month: 'March-April', color: 'bg-yellow-500', days: '15-20 days' },
        { name: '🌾 Harvest', month: 'April-June', color: 'bg-orange-500', days: '60-75 days' },
        { name: '💰 Sell', month: 'May-July', color: 'bg-purple-500', days: 'High demand' }
      ]
    },
    'Onion': {
      icon: '🧅',
      phases: [
        { name: '🌱 Sow', month: 'October-November', color: 'bg-green-500', days: '15-20 days' },
        { name: '🌿 Transplant', month: 'November-December', color: 'bg-blue-500', days: '20-25 days' },
        { name: '💧 Fertilize', month: 'December-January', color: 'bg-yellow-500', days: '15-20 days' },
        { name: '🌾 Harvest', month: 'February-April', color: 'bg-orange-500', days: '90-120 days' },
        { name: '💰 Sell', month: 'March-May', color: 'bg-purple-500', days: 'Peak price' }
      ]
    }
  };

  const cropInfo = calendarData[crop] || calendarData['Rice'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{cropInfo.icon}</span>
            <h3 className="font-bold text-xl text-green-700">{crop} - Crop Calendar</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 text-2xl hover:text-gray-600">✕</button>
        </div>

        <div className="space-y-4">
          {cropInfo.phases.map((phase, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center text-white text-xl`}>
                {phase.name.split(' ')[0]}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{phase.name}</p>
                <p className="text-xs text-gray-500">{phase.month} • {phase.days}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">💡 Plan your farming activities according to this calendar for best results</p>
        </div>

        <button onClick={onClose} className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold">
          Close
        </button>
      </div>
    </div>
  );
};

export default CropCalendar;