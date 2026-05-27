import React, { useState } from 'react';

const EmergencySOS = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: '👮', color: 'bg-red-600' },
    { name: 'Ambulance', number: '102', icon: '🚑', color: 'bg-red-500' },
    { name: 'Fire', number: '101', icon: '🔥', color: 'bg-orange-600' },
    { name: 'Kisan Call Center', number: '1551', icon: '🌾', color: 'bg-green-600' }
  ];

  const makeCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 bg-red-600 rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-all"
      >
        <span className="text-white text-xl font-bold">SOS</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-24 right-4 z-50 w-64 bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-red-600 text-white p-3">
              <h3 className="font-bold text-center">Emergency Contacts</h3>
            </div>
            {emergencyContacts.map((contact, index) => (
              <button
                key={index}
                onClick={() => makeCall(contact.number)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-50 border-b"
              >
                <div className="flex items-center space-x-2">
                  <span>{contact.icon}</span>
                  <span>{contact.name}</span>
                </div>
                <span className="text-blue-600 font-semibold">{contact.number}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EmergencySOS;