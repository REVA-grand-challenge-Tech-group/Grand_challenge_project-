import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tractor, Users, BriefcaseBusiness } from 'lucide-react';

const RolePage = () => {
  const navigate = useNavigate();

  const roles = [
    { id: 'farmer', title: 'Farmer', icon: Tractor },
    { id: 'labour', title: 'Labour', icon: Users },
    { id: 'both', title: 'Both', icon: BriefcaseBusiness },
  ];

  const handleSelect = (role) => {
    console.log('=== ROLE SELECTED ===', role);
    localStorage.setItem('userRole', role);
    console.log('Saved to localStorage:', localStorage.getItem('userRole'));
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/role-background.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-stone-900/40 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Select Your Role</h1>
          <p className="text-stone-200 text-sm">How will you use KrishiSetu?</p>
        </div>

        <div className="flex flex-col gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="group bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-stone-100 flex items-center gap-5 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
            >
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-800">
                <role.icon size={28} />
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