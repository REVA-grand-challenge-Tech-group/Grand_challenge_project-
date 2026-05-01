import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const RoleSelector = () => {
  const { setRole, t } = useApp();
  const navigate = useNavigate();

  const roles = [
    { id: 'farmer', icon: '🌾', gradient: 'from-green-500 to-green-600' },
    { id: 'labour', icon: '👨‍🌾', gradient: 'from-blue-500 to-blue-600' },
    { id: 'both', icon: '🤝', gradient: 'from-purple-500 to-purple-600' }
  ];

  const handleSelect = (roleId) => {
    setRole(roleId);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">👋</div>
          <h1 className="text-2xl font-bold text-gray-800">{t('welcome')}</h1>
          <p className="text-gray-500 mt-2">{t('select_role')}</p>
        </div>
        
        <div className="space-y-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="w-full p-5 bg-white rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all group text-left"
            >
              <div className="flex items-center">
                <div className={`w-14 h-14 bg-gradient-to-r ${role.gradient} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                  {role.icon}
                </div>
                <div className="flex-1 ml-4">
                  <div className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">
                    {t(role.id)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{t(`${role.id}_desc`)}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-green-500 flex items-center justify-center transition-all group-hover:translate-x-1">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-6 py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('back_to_language')}
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;