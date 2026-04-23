import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Emergency = () => {
  const { t } = useApp();
  const [calling, setCalling] = useState(null);

  const helplines = [
    {
      id: 1,
      name: 'Kisan Call Center',
      number: '1800-180-1551',
      timing: '24/7',
      description: 'Government helpline for farming queries',
      icon: '🌾',
      color: 'bg-green-600'
    },
    {
      id: 2,
      name: 'Weather Emergency',
      number: '1800-123-4567',
      timing: '24/7',
      description: 'Weather alerts and disaster support',
      icon: '🌤️',
      color: 'bg-blue-600'
    },
    {
      id: 3,
      name: 'Crop Insurance',
      number: '1800-234-5678',
      timing: '9 AM - 6 PM',
      description: 'PMFBY crop insurance claims',
      icon: '📋',
      color: 'bg-purple-600'
    },
    {
      id: 4,
      name: 'Local Agriculture Office',
      number: '1800-345-6789',
      timing: '10 AM - 5 PM',
      description: 'Get help from local agriculture officer',
      icon: '🏢',
      color: 'bg-orange-600'
    },
    {
      id: 5,
      name: 'Soil Health Card',
      number: '1800-456-7890',
      timing: '9 AM - 6 PM',
      description: 'Soil testing and fertilizer advice',
      icon: '🧪',
      color: 'bg-teal-600'
    },
    {
      id: 6,
      name: 'Krishi Setu Support',
      number: '1800-567-8901',
      timing: '24/7',
      description: 'App support and technical help',
      icon: '📱',
      color: 'bg-green-600'
    }
  ];

  const handleCall = (number) => {
    setCalling(number);
    setTimeout(() => {
      alert(`Calling ${number}...\nIn real app, this would make a phone call.`);
      setCalling(null);
    }, 1000);
  };

  const emergencyNumbers = [
    { name: 'Police', number: '100', color: 'bg-red-600' },
    { name: 'Ambulance', number: '102', color: 'bg-red-500' },
    { name: 'Fire', number: '101', color: 'bg-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Emergency Helpline</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Emergency Alert Banner */}
        <div className="bg-red-600 rounded-xl p-4 mb-6 text-white animate-pulse">
          <div className="flex items-center">
            <span className="text-4xl mr-3">🚨</span>
            <div>
              <h2 className="font-bold text-lg">24/7 Emergency Support</h2>
              <p className="text-red-100 text-sm">For immediate help, call any of these numbers</p>
            </div>
          </div>
        </div>

        {/* Quick Emergency Numbers */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {emergencyNumbers.map((emergency) => (
            <button
              key={emergency.number}
              onClick={() => handleCall(emergency.number)}
              className={`${emergency.color} rounded-xl p-4 text-white text-center hover:opacity-90 transition-all transform hover:scale-105`}
            >
              <div className="text-2xl mb-1">
                {emergency.name === 'Police' && '👮'}
                {emergency.name === 'Ambulance' && '🚑'}
                {emergency.name === 'Fire' && '🔥'}
              </div>
              <div className="font-bold text-lg">{emergency.number}</div>
              <div className="text-xs mt-1">{emergency.name}</div>
            </button>
          ))}
        </div>

        {/* Helpline List */}
        <h3 className="font-semibold text-gray-800 mb-3">Agricultural Helplines</h3>
        <div className="space-y-3 mb-6">
          {helplines.map((helpline) => (
            <div key={helpline.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${helpline.color} rounded-xl flex items-center justify-center text-white text-xl mr-3`}>
                      {helpline.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{helpline.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{helpline.description}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-green-600 font-mono font-bold">{helpline.number}</span>
                        <span className="text-xs text-gray-400 ml-2">{helpline.timing}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(helpline.number)}
                    disabled={calling === helpline.number}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      calling === helpline.number
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {calling === helpline.number ? 'Calling...' : '📞 Call'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* One-Tap SOS Button */}
        <button
          onClick={() => handleCall('112')}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all transform hover:scale-102 mb-6"
        >
          <div className="flex items-center justify-center space-x-3">
            <span className="text-3xl animate-pulse">🆘</span>
            <div>
              <div className="font-bold text-lg">SOS Emergency</div>
              <div className="text-sm text-red-200">Tap for immediate help</div>
            </div>
          </div>
        </button>

        {/* Share Location Option */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center">
            <span className="text-2xl mr-3">📍</span>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-800">Share Your Location</h3>
              <p className="text-sm text-blue-700">Help emergency services find you faster</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Share
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            For life-threatening emergencies, always call 112 first
          </p>
        </div>
      </div>
    </div>
  );
};

export default Emergency;