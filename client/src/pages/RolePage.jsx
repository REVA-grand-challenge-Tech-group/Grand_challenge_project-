import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tractor, Users, BriefcaseBusiness } from 'lucide-react';

const RolePage = () => {
  const { updateRole } = useApp();
  const navigate = useNavigate();

  const roles = [
    { id: 'farmer', title: 'Farmer', icon: Tractor },
    { id: 'labour', title: 'Labour', icon: Users },
    { id: 'both', title: 'Both', icon: BriefcaseBusiness },
  ];

  const handleSelect = (role) => {
    console.log("Selected role:", role);
    
    // Save role to context and localStorage
    updateRole(role);
    localStorage.setItem('userRole', role);
    
    // Navigate to LOGIN page (not directly to dashboard)
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6">
      {/* Premium Background Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/role-background.jpg')" }}
      />
      
      {/* Soft Dark Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-stone-900/40 backdrop-blur-[2px]" />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Select Your Role</h1>
          <p className="text-stone-200 text-sm tracking-wide">Please choose how you will use KrishiSetu</p>
        </div>

        <div className="flex flex-col gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="group bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-stone-100 flex items-center gap-5 hover:bg-emerald-50 hover:border-emerald-200 transition-all active:scale-[0.98]"
            >
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-800">
                <role.icon size={28} strokeWidth={2} />
              </div>
              <span className="text-lg font-semibold text-stone-800">{role.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolePage;