import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Calculator, Briefcase, 
  Layers, AlertTriangle, ShieldX, LineChart, PlusCircle, CheckCircle2 
} from 'lucide-react';

const MarketPrediction = () => {
  // Extract user parameters setup in Step 2/3
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {
    name: 'Thulasi',
    role: 'FARMER', // Options: 'FARMER', 'BUYER', 'BOTH'
    state: 'Karnataka',
    district: 'Mysuru'
  });

  const [marketData, setMarketData] = useState([]);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profit Calculator State Inputs
  const [calcSelectedCrop, setCalcSelectedCrop] = useState('');
  const [calcAcreage, setCalcAcreage] = useState('');
  const [calcCost, setCalcCost] = useState('');
  const [calculatedProfit, setCalculatedProfit] = useState(null);

  // New Crop Registration Fields State
  const [regCropName, setRegCropName] = useState('');
  const [regAcreage, setRegAcreage] = useState('');
  const [regYield, setRegYield] = useState('');
  const [regDate, setRegDate] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // STRICT SECURITY ACCESS CHECK
  const isFarmer = user?.role === 'FARMER' || user?.role === 'BOTH';

  useEffect(() => {
    if (!isFarmer) return;

    // Simulate fetching stable backend predictions configured for the logged-in location context
    setTimeout(() => {
      const stablePredictions = [
        {
          cropName: 'Ragi (Finger Millet)',
          currentPrice: 3400,
          historicalPrices: [3100, 3200, 3350, 3400],
          predictedPriceNextMonth: 3650,
          demandLevel: 'HIGH',
          riskFactor: 'LOW',
          seasonalInsight: 'Pre-monsoon crop cycles indicate robust trading margins with high regional market pull.'
        },
        {
          cropName: 'Paddy (Rice)',
          currentPrice: 2180,
          historicalPrices: [2100, 2150, 2160, 2180],
          predictedPriceNextMonth: 2240,
          demandLevel: 'MEDIUM',
          riskFactor: 'MODERATE',
          seasonalInsight: 'Supply volume arriving from neighboring channel segments will flatten price acceleration spikes.'
        },
        {
          cropName: 'Maize',
          currentPrice: 2250,
          historicalPrices: [2400, 2350, 2300, 2250],
          predictedPriceNextMonth: 2100,
          demandLevel: 'LOW',
          riskFactor: 'HIGH',
          seasonalInsight: 'Elevated supply yields across local districts creates temporary price reduction flags.'
        }
      ];

      setMarketData(stablePredictions);
      setCalcSelectedCrop(stablePredictions[0]?.cropName || '');
      setLoading(false);
    }, 800);
  }, [isFarmer]);

  // LIVE INLINE PROFIT CALCULATOR MATRICES
  const executeProfitCalculation = (e) => {
    e.preventDefault();
    const targetedCrop = marketData.find(c => c.cropName === calcSelectedCrop);
    if (!targetedCrop) return;

    // Multipliers: Assume avg 15 quintals yield per acre base line
    const averageYieldPerAcre = 15; 
    const totalEstimatedYield = parseFloat(calcAcreage) * averageYieldPerAcre;
    const grossRevenue = totalEstimatedYield * targetedCrop.predictedPriceNextMonth;
    const netProfit = grossRevenue - parseFloat(calcCost);

    setCalculatedProfit({
      yieldTotal: totalEstimatedYield,
      revenue: grossRevenue,
      profit: netProfit
    });
  };

  // ADD NEW PRODUCTION REGISTRATION TO LEDGER
  const handleRegisterCrop = (e) => {
    e.preventDefault();
    if (!regCropName || !regAcreage || !regYield) return;

    const newLog = {
      id: Date.now(),
      cropName: regCropName,
      acreage: regAcreage,
      estimatedYield: regYield,
      expectedHarvestDate: regDate || '2026-09-15',
      timestamp: new Date().toLocaleDateString()
    };

    setMyRegistrations([newLog, ...myRegistrations]);
    setRegSuccess(true);
    
    // Clear registration controls
    setRegCropName('');
    setRegAcreage('');
    setRegYield('');
    setRegDate('');
    
    setTimeout(() => setRegSuccess(false), 4000);
  };

  // 🛑 SECURITY SHIELD TRIGGER: Render blocker dashboard warning if role check falls short
  if (!isFarmer) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-24">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
            <ShieldX className="w-6 h-6" />
          </div>
          <h2 className="text-base font-black text-white uppercase tracking-wide">Access Protocol Denied</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            The Market Prediction Intelligence Module is configured exclusively for registered **Farmers**. Please update your account persona setting inside the System Navigation hub to gain access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 pt-24 max-w-6xl mx-auto space-y-8 font-sans">
      
      {/* 📍 AUTOMATED LOCATION TRACKER HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-widest">
            <LineChart className="w-4 h-4" /> AI Predictive Intelligence
          </div>
          <h1 className="text-xl font-black tracking-tight text-white">Stable Market Horizons</h1>
          <p className="text-xs text-slate-400 font-medium">
            Analyzing historical vectors, supply volumes, and seasonal factors for your profile area.
          </p>
        </div>
        
        {/* Location Display Blocks (Completely automatic, no duplicate selector inputs) */}
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800/80 shrink-0">
          <div className="px-3 py-1 bg-slate-900 border border-slate-700/60 rounded-xl text-center">
            <span className="block text-[9px] font-black uppercase tracking-wider text-slate-500">State</span>
            <span className="text-xs font-bold text-slate-200">{user.state}</span>
          </div>
          <div className="px-3 py-1 bg-slate-900 border border-slate-700/60 rounded-xl text-center">
            <span className="block text-[9px] font-black uppercase tracking-wider text-slate-500">District Focus</span>
            <span className="text-xs font-bold text-emerald-400">{user.district}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs font-bold text-slate-500 animate-pulse">Running location forecasting tables...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ================= COLUMN 1 & 2: CROP FORECASTS & MARKET DATA ================= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 📊 CORE PREDICTION AND PRICE MATRIX TABLE */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" /> District Pricing Forecasting Ledger
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-bold">
                      <th className="pb-3 font-bold text-[10px] uppercase">Crop Specimen</th>
                      <th className="pb-3 font-bold text-[10px] uppercase text-right">Current Price</th>
                      <th className="pb-3 font-bold text-[10px] uppercase text-right">Forecast (Next Mo.)</th>
                      <th className="pb-3 font-bold text-[10px] uppercase text-center">Market Demand</th>
                      <th className="pb-3 font-bold text-[10px] uppercase text-center">Risk Vector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {marketData.map((crop, idx) => {
                      const isUp = crop.predictedPriceNextMonth >= crop.currentPrice;
                      return (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                          <td className="py-3.5 font-bold text-slate-200 group-hover:text-white">{crop.cropName}</td>
                          <td className="py-3.5 font-mono font-bold text-slate-300 text-right">₹{crop.currentPrice}/q</td>
                          <td className="py-3.5 font-mono font-extrabold text-right">
                            <span className={`inline-flex items-center gap-1 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                              ₹{crop.predictedPriceNextMonth}/q
                              {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            </span>
                          </td>
                          <td className="py-3.5 text-center">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${crop.demandLevel === 'HIGH' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'}`}>{crop.demandLevel}</span>
                          </td>
                          <td className="py-3.5 text-center">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${crop.riskFactor === 'LOW' ? 'bg-slate-800 text-slate-400' : 'bg-rose-500/10 text-rose-400'}`}>{crop.riskFactor}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 🌾 SEASONAL INSIGHTS AND RISK ANALYSIS MAPS */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">AI Analytical Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketData.map((crop, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-200">{crop.cropName}</span>
                      <span className="text-[10px] font-bold text-slate-500 font-mono">Region Capped Data</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/40">
                      {crop.seasonalInsight}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Risk profile rated {crop.riskFactor.toLowerCase()} for this yield window.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📋 SECTION: MY REGISTRATIONS PROFILE ENGINE */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-500" /> My Current Crop Registrations
              </h3>
              
              {myRegistrations.length === 0 ? (
                <div className="text-center py-8 bg-slate-950 rounded-2xl border border-slate-800/60 border-dashed text-slate-500 text-xs font-bold">
                  No active cultivation cycles logged for this section yet, bruhh. Use the configuration form to add one.
                </div>
              ) : (
                <div className="space-y-2">
                  {myRegistrations.map((reg) => (
                    <div key={reg.id} className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3.5 rounded-xl hover:border-slate-700 transition-colors">
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-slate-200">{reg.cropName}</p>
                        <p className="text-[10px] text-slate-500 font-bold">
                          Acreage: <span className="text-slate-300">{reg.acreage} Acres</span> • Target Harvest: <span className="text-slate-300">{reg.expectedHarvestDate}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-black text-emerald-400 block">~{reg.estimatedYield} quintals</span>
                        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Logged {reg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ================= COLUMN 3: SIDEBAR MANAGEMENT CALCULATORS ================= */}
          <div className="space-y-6">
            
            {/* 🧮 INTERACTIVE PROFIT ARITHMETIC ENGINE */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-500" /> Farm Yield Profit Calculator
              </h3>
              
              <form onSubmit={executeProfitCalculation} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Target Commodity</label>
                  <select 
                    value={calcSelectedCrop} onChange={(e) => setCalcSelectedCrop(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {marketData.map((c, i) => (
                      <option key={i} value={c.cropName}>{c.cropName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Total Acreage</label>
                  <input type="number" required placeholder="e.g., 3" value={calcAcreage} onChange={(e) => setCalcAcreage(e.target.value)} className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold focus:outline-none focus:border-emerald-500" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Estimated Input Cost (₹)</label>
                  <input type="number" required placeholder="Seed, fertilizer, labor costs" value={calcCost} onChange={(e) => setCalcCost(e.target.value)} className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold focus:outline-none focus:border-emerald-500" />
                </div>

                <button type="submit" className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 text-xs font-black text-slate-200 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  Run Cost Calculation
                </button>
              </form>

              {/* Arithmetic Output Readouts */}
              {calculatedProfit && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mt-2 space-y-2.5 animate-slide-up">
                  <div className="flex justify-between border-b border-slate-900 pb-1.5 text-[11px]">
                    <span className="text-slate-500 font-bold">Estimated Yield Volume</span>
                    <span className="font-mono text-slate-300 font-bold">{calculatedProfit.yieldTotal} quintals</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-1.5 text-[11px]">
                    <span className="text-slate-500 font-bold">Projected Gross Returns</span>
                    <span className="font-mono text-slate-300 font-bold">₹{calculatedProfit.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-emerald-500 font-black uppercase tracking-wider">Net Profit Horizon</span>
                    <span className={`font-mono font-black text-sm ${calculatedProfit.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ₹{calculatedProfit.profit.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 📝 CROP REGISTRATION INPUT BOARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-emerald-500" /> Cultivation Registration Form
              </h3>
              
              <form onSubmit={handleRegisterCrop} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Crop Name</label>
                  <input type="text" required placeholder="e.g., Ragi, Wheat" value={regCropName} onChange={(e) => setRegCropName(e.target.value)} className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-emerald-500" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Acreage</label>
                    <input type="number" required placeholder="Acres" value={regAcreage} onChange={(e) => setRegAcreage(e.target.value)} className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Est. Yield (q)</label>
                    <input type="number" required placeholder="Quintals" value={regYield} onChange={(e) => setRegYield(e.target.value)} className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">Target Harvest Date</label>
                  <input type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold focus:outline-none focus:border-emerald-500" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-xs font-black rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
                  Log Crop To System Ledger
                </button>
              </form>

              {regSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Crop sequence recorded inside regional data registers successfully!</span>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default MarketPrediction;