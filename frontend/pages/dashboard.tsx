import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { sitesAPI, statsAPI } from '@/lib/api';
import { Site, Stats, User } from '@/types';
import OnboardingModal from '@/components/OnboardingModal';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [showAddSite, setShowAddSite] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [newSite, setNewSite] = useState({ name: '', domain: '' });

  // Get the current domain for the tracker script
  const trackerDomain = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userStr));
    
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
    
    loadSites();
  }, []);

  useEffect(() => {
    if (selectedSite) {
      loadStats();
    }
  }, [selectedSite, timeframe]);

  const loadSites = async () => {
    try {
      const response = await sitesAPI.getAll();
      const sitesData = response.data.sites || response.data;
      setSites(Array.isArray(sitesData) ? sitesData : []);
      if (Array.isArray(sitesData) && sitesData.length > 0) {
        setSelectedSite(sitesData[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load sites', error);
      setLoading(false);
    }
  };

  const loadStats = async () => {
    if (!selectedSite) return;
    
    try {
      const response = await statsAPI.get(selectedSite.apiKey, timeframe);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load stats', error);
    }
  };

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sitesAPI.create(newSite);
      setShowAddSite(false);
      setNewSite({ name: '', domain: '' });
      loadSites();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to add site');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const COLORS = ['#000000', '#ffffff', '#333333', '#cccccc'];

  const scrollData = stats ? [
    { name: '0-25%', value: stats.scrollDistribution['0-25%'] },
    { name: '25-50%', value: stats.scrollDistribution['25-50%'] },
    { name: '50-75%', value: stats.scrollDistribution['50-75%'] },
    { name: '75-100%', value: stats.scrollDistribution['75-100%'] },
  ] : [];

  return (
    <>
      <Head>
        <title>Dashboard - Guesswhere</title>
      </Head>
      <div className="min-h-screen bg-[#FBFBFB]">
        {/* Header */}
        <header className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-black">Guesswhere</h1>
              <nav className="flex items-center gap-6">
                <a href="/dashboard" className="text-sm font-medium text-black transition-colors">
                  Dashboard
                </a>
                <a href="/sites" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  Sites
                </a>
                <a href="/profile" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  Profile
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-[#84994F] text-white text-sm font-medium rounded-xl hover:bg-[#6B7A3F] transition-colors">
                Analytics
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button 
                onClick={handleLogout}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold"
              >
                {user?.email?.[0].toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Site Selector */}
        <div className="mb-8 flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <select
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[250px]"
              value={selectedSite?._id || ''}
              onChange={(e) => {
                const site = sites.find(s => s._id === e.target.value);
                setSelectedSite(site || null);
              }}
            >
              {sites.map(site => (
                <option key={site._id} value={site._id}>
                  {site.name} ({site.domain})
                </option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddSite(true)}
            className="px-4 py-2 bg-[#84994F] text-white text-sm font-medium rounded-xl hover:bg-[#6B7A3F] transition-colors"
          >
            + Add Site
          </button>
        </div>

        {sites.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-xl text-gray-600 mb-6">No sites yet. Add your first site to start tracking!</p>
            <button onClick={() => setShowAddSite(true)} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
              Add Your First Site
            </button>
          </div>
        ) : stats ? (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Page Visit</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stats.summary.pageviews.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#84994F] bg-green-50 px-2 py-1 rounded">↑ 8%</span>
                  <span className="text-xs text-gray-500">From last month</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sessions</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stats.summary.uniqueSessions.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">↓ 14%</span>
                  <span className="text-xs text-gray-500">From last month</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Scroll Depth</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stats.summary.avgScrollDepth}%</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">↑ 5%</span>
                  <span className="text-xs text-gray-500">From last month</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Avg Time</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{Math.floor(stats.summary.avgTimeOnPage)}s</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">↑ 12%</span>
                  <span className="text-xs text-gray-500">From last month</span>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
              {/* Daily Breakdown */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Customer Metrics</h3>
                    <p className="text-xs text-gray-500 mt-1">Daily visitor activity</p>
                  </div>
                  <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                    <option>This Year</option>
                    <option>This Month</option>
                    <option>This Week</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={stats.dailyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Line type="monotone" dataKey="pageviews" stroke="#84994F" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="clicks" stroke="#6B7A3F" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Scroll Distribution */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Top Countries</h3>
                    <p className="text-xs text-gray-500 mt-1">Visitor distribution by region</p>
                  </div>
                  <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                    <option>Country</option>
                    <option>City</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {scrollData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-[#84994F] h-2 rounded-full"
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Clicks */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Customer Activity</h3>
                    <p className="text-xs text-gray-500 mt-1">Track your customer activity</p>
                  </div>
                  <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.topClicks.slice(0, 7)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="element" stroke="#9ca3af" style={{ fontSize: '10px' }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Bar dataKey="count" fill="#84994F" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tracking Code */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Tracking Code</h3>
                    <p className="text-xs text-gray-500 mt-1">Add this snippet to your site</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                  <code className="text-xs font-mono text-gray-700 break-all">
                    {`<script src="${trackerDomain}/tracker.js" data-site-id="${selectedSite?.apiKey}"></script>`}
                  </code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<script src="${trackerDomain}/tracker.js" data-site-id="${selectedSite?.apiKey}"></script>`
                    );
                    alert('Copied to clipboard!');
                  }}
                  className="w-full px-4 py-2.5 bg-[#84994F] text-white text-sm font-medium rounded-xl hover:bg-[#6B7A3F] transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        )}
      </div>

      {/* Add Site Modal */}
      {showAddSite && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50">
          <div className="bg-white border-4 border-black p-8 max-w-md w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-bold mb-6">Add New Site</h2>
            <form onSubmit={handleAddSite} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                  Site Name
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={newSite.name}
                  onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                  placeholder="My Landing Page"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                  Domain
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={newSite.domain}
                  onChange={(e) => setNewSite({ ...newSite, domain: e.target.value })}
                  placeholder="example.com"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 btn btn-primary">
                  Add Site
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSite(false)}
                  className="flex-1 btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      </div>
    </>
  );
}
