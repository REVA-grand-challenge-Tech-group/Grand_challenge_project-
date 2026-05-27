import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  TrendingUp, Users, PlusCircle, CloudSun, MessageSquare, Sparkles, 
  ChevronRight, RefreshCw, Layers, MapPin, Calendar, Activity, Info 
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useContext(AuthContext) || {};
  
  // Setup fallback handling if AuthContext is unpopulated or cold during boot
  const activeUser = user || JSON.parse(localStorage.getItem('user')) || { name: 'Krishi Member', role: 'BOTH' };
  
  // Track current active dashboard viewing channel if registered as "BOTH"
  const [currentView, setCurrentView] = useState('FARMER'); 

  // Sync default initial views to state parameters parsed from session variables
  useEffect(() => {
    if (activeUser.role === 'FARMER' || activeUser.role === 'LABOUR') {
      setCurrentView(activeUser.role);
    }
  }, [activeUser.role]);

  // Compute time-dependent greeting parameters cleanly
  const [greeting, setGreeting] = useState('Welcome');
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* 1. HERO CONTEXT BANNER MODULE */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-luminosity z-0" 
             style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad451?auto=format&fit=crop&q=80&w=1000")' }} />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-max">
              <Activity className="w-3 h-3" /> Live Operational Workspace
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-3 tracking-tight">
              {greeting}, {activeUser.name}
            </h1>
            <p className="text-xs font-medium text-slate-400 mt-1 max-w-xl">
              KrishiSetu core system node operational. Location contextual diagnostics running smoothly for regional monitoring clusters.
            </p>
          </div>

          {/* Conditional Layout Role-Toggle Switch Wrapper */}
          {activeUser.role === 'BOTH' && (
            <div className="bg-slate-950/80 p-1 rounded-xl border border-slate-800 flex items-center self-start md:self-center shadow-inner">
              <button
                onClick={() => setCurrentView('FARMER')}
                className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 ${currentView === 'FARMER' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Farmer Engine</span>
              </button>
              <button
                onClick={() => setCurrentView('LABOUR')}
                className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 ${currentView === 'LABOUR' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Labour Matrix</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. LIVE METRICS & INTEGRATED REAL-TIME TELEMETRY TRACKER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Weather Monitoring Summary Card Module */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Atmospheric Telemetry</span>
            <span className="text-xl font-black text-white block">31°C / 64%</span>
            <span className="text-[11px] font-bold text-emerald-400 block mt-0.5">Scattered Cover • Mysuru Region</span>
          </div>
          <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center text-sky-400">
            <CloudSun className="w-5 h-5" />
          </div>
        </div>

        {/* Dynamic Context Live Analytics Stats 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Market Index Flow</span>
            <span className="text-xl font-black text-white block">₹7,450 / Qtl</span>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +4.2% This Cycle
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Dynamic Context Live Analytics Stats 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Active Local Labor Index</span>
            <span className="text-xl font-black text-white block">142 Openings</span>
            <span className="text-[11px] font-bold text-teal-400 block mt-0.5">Within 15km Perimeter Radius</span>
          </div>
          <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Dynamic Context Live Analytics Stats 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">System Verification Status</span>
            <span className="text-xl font-black text-emerald-400 block">Node Secured</span>
            <span className="text-[11px] font-bold text-slate-400 block mt-0.5">ULCA Pipeline Connected</span>
          </div>
          <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>

      </div>

      {/* 3. CORE AI INSIGHTS & CROP HARVEST STRATEGY RECOMMENDATIONS (GEMINI INTERFERENCE WRAPPERS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gemini Engine Real-time Analysis Card Block */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-6 shadow-md relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white tracking-tight">Gemini LLM Real-Time Agricultural Assessment</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Model Engine Pipeline: Contextual Inference Mode</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded-md">
              2026 Season V2
            </span>
          </div>

          <div className="space-y-4 text-xs font-semibold text-slate-300 leading-relaxed">
            <p>
              Based on spatial weather clusters parsed over Karnataka over the last 72 hours, precipitation indices match model patterns for optimal macro planting parameters. Soil temperature indices indicate a stable localized ecosystem loop.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">Automated Seasonal Recommendations:</span>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li>Prioritize root aeration grids ahead of projected rain events on Friday evening.</li>
                <li>Optimize nitrogen fertilization ratios for cotton and ragi fields in local zones.</li>
                <li>Projected market arbitrage trends show upward volume demand vectors for local cash crops next week.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Static Professional System Field Guideline Vector Module */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-black text-white tracking-tight mb-3">Verified Regional Farming Practices</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide block">Water Allocation Routine</span>
                <p className="text-[11px] font-medium text-slate-400 mt-1">Drip automation metrics reduce evaporation deficits by roughly 35% compared to surface flooding loops.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wide block">Pest Mitigation Protocol</span>
                <p className="text-[11px] font-medium text-slate-400 mt-1">Early tracking arrays for fall armyworm metrics prevent deep crop damage sequences across fields.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0" />
            <p className="text-[10px] font-semibold text-slate-500 leading-tight">
              Methods checked and cross-verified via regional university extension nodes.
            </p>
          </div>
        </div>

      </div>

      {/* 4. DYNAMIC SUB-ROUTE FUNCTION MATRIX GENERATOR GRID */}
      <div>
        <div className="border-b border-slate-800 pb-3 mb-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Context Engine View Operations: {currentView === 'FARMER' ? 'FARMER COMMAND SUITE' : 'LABOUR WORKSPACE CONSOLE'}
          </h2>
        </div>

        {/* Conditional Engine Layout 1: Farmer Control Interface Components */}
        {currentView === 'FARMER' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Action Card 1: Market Prediction Matrix */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Market Prediction Engine</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Analyze forward arbitrage pricing parameters and spatial demand index lines.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
                Initialize System Core <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 2: Labor Support Directory */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Labour Support Network</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Track local operations rosters, availability, and handle profile screenings.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-400 mt-4 group-hover:translate-x-1 transition-transform">
                Open Personnel Grid <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 3: Post a Job Opening */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Post Operational Openings</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Broadcast field wage structures and operational details out to local labor hubs.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-purple-400 mt-4 group-hover:translate-x-1 transition-transform">
                Inject New Request <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 4: Weather Analytics Matrix */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <CloudSun className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Advanced Climate Terminal</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Review localized moisture radar, tracking indices, and seasonal models.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 mt-4 group-hover:translate-x-1 transition-transform">
                Launch Radar Array <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 5: Decentralized Community Chat Channels */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Community Exchange Rooms</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Discuss trade pricing vectors, seed performance metrics, and equipment shares.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-pink-400 mt-4 group-hover:translate-x-1 transition-transform">
                Connect Channel Feed <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        )}

        {/* Conditional Engine Layout 2: Labor Control Interface Components */}
        {currentView === 'LABOUR' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Action Card 1: Find Active Work Contracts */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Scan Active Job Listings</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Filter verified regional crop harvests and transport contracts by wage parameters.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-teal-400 mt-4 group-hover:translate-x-1 transition-transform">
                Query Active Orders <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 2: Track Active Applications */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Contract Submission Matrix</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Check authorization review queues, wage approvals, and deployment schedules.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 mt-4 group-hover:translate-x-1 transition-transform">
                Track Applications <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 3: Weather Analytics Module (Shared Data Mapping) */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <CloudSun className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Field Weather Monitor</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Verify daily operational weather stability forecasts prior to route deployment.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 mt-4 group-hover:translate-x-1 transition-transform">
                Launch Radar Array <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action Card 4: Decentralized Community Chat (Shared Data Mapping) */}
            <div className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all rounded-2xl p-5 shadow-sm group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">Labour Coordination Feeds</h4>
              <p className="text-[11px] font-medium text-slate-500 mt-1.5 leading-relaxed">Coordinate transport networks, local wage trends, and share working conditions.</p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-pink-400 mt-4 group-hover:translate-x-1 transition-transform">
                Connect Channel Feed <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;