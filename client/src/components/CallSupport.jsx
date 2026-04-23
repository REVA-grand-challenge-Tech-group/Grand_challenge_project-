import React, { useState } from 'react';

const CallSupport = () => {
  const [showCallOptions, setShowCallOptions] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {!showCallOptions ? (
        <button
          onClick={() => setShowCallOptions(true)}
          className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all animate-bounce"
        >
          <span className="text-2xl">📞</span>
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-orange-200 animate-slide-up">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-orange-800">Need Help?</h3>
            <button onClick={() => setShowCallOptions(false)} className="text-gray-400">✕</button>
          </div>
          
          <div className="space-y-3">
            <button className="w-full bg-green-600 text-white p-3 rounded-xl flex items-center justify-between">
              <span>📞 Farmer Helpline</span>
              <span>1800-123-4567</span>
            </button>
            
            <button className="w-full bg-blue-600 text-white p-3 rounded-xl flex items-center justify-between">
              <span>👨‍🌾 Labour Helpline</span>
              <span>1800-123-4568</span>
            </button>
            
            <button className="w-full bg-orange-600 text-white p-3 rounded-xl flex items-center justify-between">
              <span>📝 Register via Call</span>
              <span>1800-123-4569</span>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            Toll free | 24/7 Support | Hindi/Kannada/English
          </p>
        </div>
      )}
    </div>
  );
};

export default CallSupport;