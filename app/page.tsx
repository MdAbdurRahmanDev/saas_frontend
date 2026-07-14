import { fetchUsers, fetchBalanceSettings, fetchGiftOrders } from '@/services/api';

export default async function Home() {
  let totalUsers = 0;
  let activeUsers = 0;
  let bannedUsers = 0;
  let deactiveUsers = 0;
  let beansActive = true;
  let diamondsActive = true;
  let defaultBalance = 'diamonds';
  let totalSalesBeans = 0;
  let totalSalesDiamonds = 0;
  let totalDeductedBeans = 0;
  let totalDeductedDiamonds = 0;
  let totalOrders = 0;

  try {
    // API থেকে ইউজারদের ডেটা ফেচ করে স্ট্যাটাস অনুযায়ী টোটাল এবং অন্যান্য কাউন্ট বের করা হচ্ছে
    const users = await fetchUsers();
    if (users && Array.isArray(users)) {
      totalUsers = users.length;
      activeUsers = users.filter((u: any) => u.status?.toLowerCase() === 'active').length;
      bannedUsers = users.filter((u: any) => u.status?.toLowerCase() === 'banned').length;
      deactiveUsers = users.filter((u: any) => u.status?.toLowerCase() === 'deactive' || u.status?.toLowerCase() === 'inactive').length;
    }
  } catch (error) {
    console.error("Failed to fetch users for dashboard:", error);
  }

  try {
    // ডাটাবেজ থেকে ব্যালেন্স সেটিংস ফেচ করা হচ্ছে 
    const balanceSettings = await fetchBalanceSettings();
    if (balanceSettings) {
      beansActive = balanceSettings.beans_active;
      diamondsActive = balanceSettings.diamonds_active;
      defaultBalance = balanceSettings.default_balance || 'diamonds';
    }
  } catch (error) {
    console.error("Failed to fetch balance settings:", error);
  }

  try {
    const ordersData = await fetchGiftOrders();
    if (ordersData) {
      totalSalesBeans = ordersData.totalSalesBeans || 0;
      totalSalesDiamonds = ordersData.totalSalesDiamonds || 0;
      totalDeductedBeans = ordersData.totalDeductedBeans || 0;
      totalDeductedDiamonds = ordersData.totalDeductedDiamonds || 0;
      totalOrders = (ordersData.orders || []).length;
    }
  } catch (error) {
    console.error("Failed to fetch orders data:", error);
  }

  let showCurrency = 'both';
  if (beansActive && diamondsActive) {
    showCurrency = defaultBalance;
  } else if (beansActive) {
    showCurrency = 'beans';
  } else if (diamondsActive) {
    showCurrency = 'diamonds';
  }

  const displayTotalSales = showCurrency === 'beans' ? totalSalesBeans : totalSalesDiamonds;
  const displayTotalDeducted = showCurrency === 'beans' ? totalDeductedBeans : totalDeductedDiamonds;
  const displayCurrencyName = showCurrency === 'beans' ? 'Beans' : 'Diamonds';

  return (
    <div className="flex flex-col space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-end gap-4 xl:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
          <p className="text-[var(--text-secondary)] text-sm">Real-time platform analytics and reporting.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          {/* বিনস অ্যাকটিভ থাকলে এই বাটনটি দেখাবে */}
          {beansActive && (
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-yellow-900/40 text-yellow-500 rounded-md text-xs font-semibold border border-yellow-900/50 hover:bg-yellow-900/60 transition">
              <span className="w-2 h-2 rounded-sm bg-yellow-500 block"></span>
              <span>Empty Beans</span>
            </button>
          )}
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-green-900/40 text-green-500 rounded-md text-xs font-semibold border border-green-900/50 hover:bg-green-900/60 transition">
            <span className="text-lg leading-none">✨</span>
            <span>Clean Empty Rooms</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-pink-900/40 text-pink-500 rounded-md text-xs font-semibold border border-pink-900/50 hover:bg-pink-900/60 transition">
            <span className="text-lg leading-none">⚡</span>
            <span>Clear Stuck Streams</span>
          </button>
          {/* ডায়মন্ডস অ্যাকটিভ থাকলে এই বাটনটি দেখাবে */}
          {diamondsActive && (
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-cyan-900/40 text-cyan-500 rounded-md text-xs font-semibold border border-cyan-900/50 hover:bg-cyan-900/60 transition">
              <span className="text-lg leading-none">💎</span>
              <span>Empty Diamonds</span>
            </button>
          )}
          <button className="px-4 py-1.5 bg-[#1f2937] text-gray-300 rounded-md text-xs font-semibold border border-gray-700 hover:bg-gray-700 transition uppercase tracking-wider">
            Live Updates
          </button>
        </div>
      </div>

      {/* Grid 1: Top 6 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1 */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--card-bg-blue)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-blue)] text-blue-400 flex items-center justify-center mb-4 relative z-10">
            👥
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Total Users</div>
            <div className="text-2xl font-bold text-white">{totalUsers}</div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--card-bg-green)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-green)] text-green-400 flex items-center justify-center mb-4 relative z-10">
            🟢
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Active Users</div>
            <div className="text-2xl font-bold text-green-400">{activeUsers}</div>
          </div>
        </div>

        {/* Banned Users Card */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-900 rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-red-900/40 text-red-400 flex items-center justify-center mb-4 relative z-10">
            ⛔
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Banned Users</div>
            <div className="text-2xl font-bold text-red-400">{bannedUsers}</div>
          </div>
        </div>

        {/* Deactive Users Card */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--card-bg-yellow)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-yellow)] text-yellow-400 flex items-center justify-center mb-4 relative z-10">
            ⏸️
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Deactive Users</div>
            <div className="text-2xl font-bold text-yellow-400">{deactiveUsers}</div>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--card-bg-green)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-green)] text-green-400 flex items-center justify-center mb-4 relative z-10">
            🏢
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Total Agencies</div>
            <div className="text-2xl font-bold text-white">52</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--card-bg-purple)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-purple)] text-purple-400 flex items-center justify-center mb-4 relative z-10">
            🛡️
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Total Resellers</div>
            <div className="text-2xl font-bold text-white">8</div>
          </div>
        </div>


      </div>

      {/* Grid 2: Bottom 5 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--card-bg-green)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-green)] text-green-400 flex items-center justify-center mb-4 relative z-10">
            💲
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Total Sales</div>
            <div className="text-2xl font-bold text-white">{displayTotalSales.toLocaleString()} <span className="text-sm font-normal">{displayCurrencyName}</span></div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-900 rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-red-900/40 text-red-400 flex items-center justify-center mb-4 relative z-10">
            📉
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Total Deducted</div>
            <div className="text-2xl font-bold text-white">{displayTotalDeducted.toLocaleString()} <span className="text-sm font-normal">{displayCurrencyName}</span></div>
          </div>
        </div>
        
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--card-bg-brown)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-brown)] text-orange-400 flex items-center justify-center mb-4 relative z-10">
            🛍️
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-white">{totalOrders.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--card-bg-pink)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-pink)] text-pink-400 flex items-center justify-center mb-4 relative z-10">
            🎁
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Platform Gifts</div>
            <div className="text-2xl font-bold text-white">23</div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--card-bg-brown)] rounded-bl-full opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="w-8 h-8 rounded-lg bg-[var(--card-bg-brown)] text-orange-400 flex items-center justify-center mb-4 relative z-10">
            🛒
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Gift Store Items</div>
            <div className="text-2xl font-bold text-white">0</div>
          </div>
        </div>
      </div>

      {/* Grid 3: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 pb-10">
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-semibold">Agent Coin Sales Overview</h2>
            <button className="px-2 py-1 bg-gray-800 text-[10px] text-gray-400 uppercase tracking-wider rounded border border-gray-700">Rankings</button>
          </div>
          <div className="flex-1 flex items-end space-x-6 px-4">
            {/* Mock Chart Bars */}
            <div className="w-12 bg-indigo-500/80 h-32 rounded-t-sm"></div>
            <div className="w-12 bg-indigo-500/80 h-4 rounded-t-sm"></div>
            <div className="w-12 bg-indigo-500/80 h-2 rounded-t-sm"></div>
            <div className="w-12 bg-indigo-500/80 h-1 rounded-t-sm"></div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 relative overflow-hidden shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-semibold">Reseller Coin Sales Overview</h2>
            <button className="px-2 py-1 bg-gray-800 text-[10px] text-gray-400 uppercase tracking-wider rounded border border-gray-700">Rankings</button>
          </div>
          <div className="flex-1 flex items-end space-x-6 px-4">
            {/* Mock Chart Bars */}
            <div className="w-12 bg-orange-500/80 h-40 rounded-t-sm"></div>
            <div className="w-12 bg-orange-500/80 h-6 rounded-t-sm"></div>
            <div className="w-12 bg-orange-500/80 h-1 rounded-t-sm"></div>
            <div className="w-12 bg-orange-500/80 h-1 rounded-t-sm"></div>
          </div>
        </div>
      </div>

      {/* Grid 4: Advanced Reports (New) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-10">
        
        {/* Coin Economy Health */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl -mr-20 -mt-20"></div>
          <h2 className="text-white font-bold mb-4 flex items-center gap-2 relative z-10"><span className="text-amber-500">🪙</span> Coin Economy Pulse</h2>
          <div className="space-y-4 relative z-10">
             <div>
               <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                 <span>Coins Minted (Today)</span>
                 <span className="text-green-400">+1.2M</span>
               </div>
               <div className="w-full bg-gray-800 rounded-full h-2">
                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
               </div>
             </div>
             <div>
               <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                 <span>Coins Consumed (Gifts)</span>
                 <span className="text-red-400">-850K</span>
               </div>
               <div className="w-full bg-gray-800 rounded-full h-2">
                 <div className="bg-red-500 h-2 rounded-full" style={{ width: '60%' }}></div>
               </div>
             </div>
             <div className="pt-3 border-t border-gray-800 mt-2">
               <div className="text-xs text-gray-500">Net Platform Profit Margin</div>
               <div className="text-xl font-bold text-emerald-400 mt-1">+ $8,500.00</div>
             </div>
          </div>
        </div>

        {/* Trending Platform Gifts */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm flex flex-col">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2"><span className="text-pink-500">🎁</span> Trending Gifts (24h)</h2>
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between p-2 bg-[#18181b] rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-900/30 rounded-lg flex items-center justify-center text-xl">🏎️</div>
                <div>
                  <div className="text-sm font-bold text-white">Sports Car</div>
                  <div className="text-xs text-gray-500">Sent 145 times</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-400">1.45M 🪙</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#18181b] rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-900/30 rounded-lg flex items-center justify-center text-xl">🚀</div>
                <div>
                  <div className="text-sm font-bold text-white">Space Rocket</div>
                  <div className="text-xs text-gray-500">Sent 89 times</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-400">890K 🪙</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#18181b] rounded-lg border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center text-xl">🌹</div>
                <div>
                  <div className="text-sm font-bold text-white">Magic Rose</div>
                  <div className="text-xs text-gray-500">Sent 1,204 times</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-400">120K 🪙</div>
              </div>
            </div>
          </div>
        </div>

        {/* Livekit & Stream Stats */}
        <div className="bg-[var(--card-bg)] rounded-xl p-5 border border-gray-800 shadow-sm flex flex-col">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2"><span className="text-indigo-500">📡</span> System & Streams</h2>
          
          <div className="flex gap-4 mb-4">
             <div className="flex-1 bg-[#18181b] border border-gray-800 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 font-bold uppercase mb-1">Audio Rooms</div>
                <div className="text-xl font-bold text-purple-400">68%</div>
             </div>
             <div className="flex-1 bg-[#18181b] border border-gray-800 rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 font-bold uppercase mb-1">Video Live</div>
                <div className="text-xl font-bold text-blue-400">32%</div>
             </div>
          </div>

          <div className="mt-auto space-y-2">
             <div className="flex justify-between items-center text-sm">
               <span className="text-gray-400">Livekit Server Status</span>
               <span className="flex items-center gap-1 text-green-400 font-bold"><span className="w-2 h-2 rounded-full bg-green-500"></span> Optimal</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-gray-400">Active Connections</span>
               <span className="text-white font-mono">1,204 / 5,000</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-gray-400">Top Region</span>
               <span className="text-white font-bold">🇺🇸 United States (45%)</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
