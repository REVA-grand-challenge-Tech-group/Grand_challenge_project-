import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut, Languages, UserCheck, ShieldAlert, 
  Menu, X, User, Edit2, Check, Smartphone
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Profile State Setup
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || 'Thulasi');
  const [profilePhone, setProfilePhone] = useState(() => localStorage.getItem('profilePhone') || '9876543210');
  const [phoneError, setPhoneError] = useState('');

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsOpen(false);
    navigate('/');
  };

  // Strictly enforce 10-digit format during live profile edits
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Strip non-digits
    if (value.length <= 10) {
      setProfilePhone(value);
    }
  };

  const saveProfileChanges = () => {
    if (profilePhone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits!');
      return;
    }
    setPhoneError('');
    localStorage.setItem('profileName', profileName);
    localStorage.setItem('profilePhone', profilePhone);
    setIsEditingProfile(false);
  };

  return (
    <>
      {/* ==================== MAIN HEADER BAR ==================== */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white z-50 px-4 flex items-center justify-between shadow-lg">
        <div onClick={() => handleNavigation('/dashboard')} className="flex items-center gap-2 cursor-pointer active:scale-95 transition-all">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-sm text-white">KS</div>
          <span className="font-black text-xs md:text-sm tracking-wider text-slate-200">
            KRISHI<span className="text-emerald-400">SETU</span>
          </span>
        </div>

        {/* Desktop View Links */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => handleNavigation('/')} className={`p-2 px-3 rounded-xl text-xs font-bold transition-all ${isActive('/') ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-white'}`}><Languages className="w-4 h-4 inline mr-1" />Language</button>
          <button onClick={() => handleNavigation('/role')} className={`p-2 px-3 rounded-xl text-xs font-bold transition-all ${isActive('/role') || isActive('/select-role') ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-white'}`}><UserCheck className="w-4 h-4 inline mr-1" />Role</button>
          <button onClick={() => handleNavigation('/login')} className={`p-2 px-3 rounded-xl text-xs font-bold transition-all ${isActive('/login') || isActive('/register') ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-white'}`}><ShieldAlert className="w-4 h-4 inline mr-1" />Auth</button>
          <div className="h-6 w-px bg-slate-800 mx-2" />
          <button onClick={() => setIsOpen(true)} className="p-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 hover:bg-slate-700"><User className="w-4 h-4 text-emerald-400" />Profile / Menu</button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button onClick={() => setIsOpen(true)} className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300"><Menu className="w-5 h-5" /></button>
      </nav>

      {/* ==================== HALF-SIDE RIGHT DRAWER PANEL ==================== */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Dark Backdrop Mask */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        
        {/* Right Half Drawer Chassis (Width restricted to half/side on mobile & desktop) */}
        <div className={`absolute top-0 right-0 bottom-0 w-[85%] sm:w-[50%] md:w-[35%] bg-slate-900 border-l border-slate-800 shadow-2xl p-6 overflow-y-auto transition-transform duration-300 flex flex-col justify-between ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="space-y-6">
            
            {/* Header Module */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Account Center</span>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            {/* 🔥 PRIORITY 1: INTEGRATED USER PROFILE MANAGEMENT AGENT */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400"><User className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-white">Your Profile</span>
                </div>
                {!isEditingProfile ? (
                  <button onClick={() => setIsEditingProfile(true)} className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 hover:underline"><Edit2 className="w-3 h-3" /> Edit</button>
                ) : (
                  <button onClick={saveProfileChanges} className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20"><Check className="w-3 h-3" /> Save</button>
                )}
              </div>

              {/* Data View / Input Field Toggle */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">User Account Name</label>
                  {isEditingProfile ? (
                    <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full mt-1 p-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-bold focus:outline-none focus:border-emerald-500" />
                  ) : (
                    <p className="text-xs font-bold text-slate-200 mt-0.5">{profileName}</p>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1">Verified Phone Line</label>
                  {isEditingProfile ? (
                    <div className="space-y-1">
                      <input type="text" value={profilePhone} onChange={handlePhoneChange} placeholder="10 Digit Number" className="w-full mt-1 p-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-bold focus:outline-none focus:border-emerald-500" />
                      {phoneError && <p className="text-[10px] text-rose-400 font-bold">{phoneError}</p>}
                    </div>
                  ) : (
                    <p className="text-xs font-mono font-bold text-slate-200 mt-0.5">+{profilePhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Flow Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-widest block px-1">Application Steps</span>
              <button onClick={() => handleNavigation('/')} className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-bold transition-colors border ${isActive('/') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/40 border-transparent'}`}><Languages className="w-4 h-4" /> Step 1: Language</button>
              <button onClick={() => handleNavigation('/role')} className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-bold transition-colors border ${isActive('/role') || isActive('/select-role') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/40 border-transparent'}`}><UserCheck className="w-4 h-4" /> Step 2: Select Role</button>
              <button onClick={() => handleNavigation('/login')} className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-bold transition-colors border ${isActive('/login') || isActive('/register') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/40 border-transparent'}`}><ShieldAlert className="w-4 h-4" /> Step 3: Security Login</button>
            </div>

          </div>

          {/* Bottom Session Destruction Unit */}
          <button onClick={handleLogout} className="w-full p-3 mt-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 flex items-center justify-center gap-2 hover:bg-rose-600 hover:text-white transition-all"><LogOut className="w-4 h-4" /> Close Session (Logout)</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;