import React, { useState } from 'react';

const EmergencyButton = () => {
  const [showNumbers, setShowNumbers] = useState(false);

  const helplines = [
    { name: '🚓 Police', number: '100', color: 'bg-red-600' },
    { name: '🚑 Ambulance', number: '102', color: 'bg-red-500' },
    { name: '🔥 Fire', number: '101', color: 'bg-orange-600' },
    { name: '🌾 Kisan Call Center', number: '1800-180-1551', color: 'bg-green-600' },
    { name: '📞 Krishi Setu Support', number: '1800-123-4567', color: 'bg-blue-600' },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {showNumbers ? (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 mb-2 animate-slide-up">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-red-600">🚨 Emergency Helplines</h3>
            <button onClick={() => setShowNumbers(false)} className="text-gray-400 text-xl">✕</button>
          </div>
          <div className="space-y-2">
            {helplines.map((item, i) => (
              <button
                key={i}
                onClick={() => handleCall(item.number)}
                className={`w-full ${item.color} text-white p-3 rounded-xl flex justify-between items-center hover:opacity-90 transition-all`}
              >
                <span className="text-sm">{item.name}</span>
                <span className="font-mono text-sm">{item.number}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">24/7 Support | Toll Free</p>
        </div>
      ) : (
        <button
          onClick={() => setShowNumbers(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all animate-pulse"
        >
          <span className="text-2xl">🚨 SOS</span>
        </button>
      )}
    </div>
  );
};

export default EmergencyButton;