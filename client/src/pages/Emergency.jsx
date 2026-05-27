import React, { useState } from 'react';

const EmergencySOS = () => {
  const [showMenu, setShowMenu] = useState(false);

  const contacts = [
    { name: '🚓 Police', number: '100' },
    { name: '🚑 Ambulance', number: '102' },
    { name: '🔥 Fire', number: '101' },
    { name: '🌾 Kisan Call', number: '1551' }
  ];

  const makeCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-red-600 rounded-full shadow-lg flex items-center justify-center z-50 animate-pulse"
      >
        <span className="text-white font-bold text-lg">SOS</span>
      </button>
      
      {showMenu && (
        <div className="fixed bottom-36 right-4 bg-white rounded-xl shadow-xl z-50 w-48 overflow-hidden">
          {contacts.map((contact, i) => (
            <button
              key={i}
              onClick={() => makeCall(contact.number)}
              className="w-full p-3 text-left hover:bg-red-50 flex justify-between items-center border-b"
            >
              <span>{contact.name}</span>
              <span className="text-blue-600">{contact.number}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default EmergencySOS;