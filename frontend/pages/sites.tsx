import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Site {
  _id: string;
  name: string;
  domain: string;
  url?: string;
  scriptId: string;
  apiKey?: string;
  createdAt: string;
}

export default function Sites() {
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [formData, setFormData] = useState({ name: '', url: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  // Get the current domain for the tracker script
  const trackerDomain = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';

  useEffect(() => {
    fetchSites();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/login');
    }
  };

  const fetchSites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/sites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSites(data.sites || []);
      } else {
        setError('Failed to load sites');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          domain: formData.url
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Site added successfully!');
        setShowAddModal(false);
        setFormData({ name: '', url: '' });
        fetchSites();
      } else {
        setError(data.message || 'Failed to add site');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const handleUpdateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSite) return;

    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/sites/${editingSite._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          url: formData.url
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Site updated successfully!');
        setEditingSite(null);
        setFormData({ name: '', url: '' });
        fetchSites();
      } else {
        setError(data.message || 'Failed to update site');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    if (!confirm('Are you sure you want to delete this site? All analytics data will be lost.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/sites/${siteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMessage('Site deleted successfully');
        fetchSites();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete site');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const openEditModal = (site: Site) => {
    setEditingSite(site);
    setFormData({ name: site.name, url: site.domain || site.url || '' });
    setShowAddModal(false);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setEditingSite(null);
    setFormData({ name: '', url: '' });
    setError('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage('Copied to clipboard!');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const getPlanLimit = () => {
    if (!user) return 0;
    return user.subscriptionTier === 'growth' ? 5 : 1;
  };

  const canAddSite = () => {
    return sites.length < getPlanLimit();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sites - ConvertPulse</title>
      </Head>
      <div className="min-h-screen bg-[#FBFBFB]">
        {/* Navigation */}
        <nav className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-xl font-bold text-black tracking-tight hover:opacity-80 transition-opacity">
                ConvertPulse
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  Dashboard
                </Link>
                <Link href="/sites" className="text-sm font-medium text-black transition-colors">
                  Sites
                </Link>
                <Link href="/profile" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  Profile
                </Link>
              </div>
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
                onClick={() => {
                  localStorage.removeItem('token');
                  router.push('/');
                }}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold"
              >
                {user?.email?.[0].toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Your Sites</h1>
              <p className="text-sm text-gray-500">
                Manage your tracked landing pages • {sites.length}/{getPlanLimit()} sites used
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              disabled={!canAddSite()}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Site
            </button>
          </div>

          {!canAddSite() && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
              <p className="text-amber-800 text-sm">
                ⚠️ You've reached your plan limit. <Link href="/profile" className="underline font-semibold">Upgrade to Growth</Link> to add more sites.
              </p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
              <p className="text-green-800 text-sm">✓ {successMessage}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
              <p className="text-red-800 text-sm">✗ {error}</p>
            </div>
          )}
        </div>

        {/* Sites Grid */}
        {sites.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">🌐</span>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">No sites yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
              Add your first landing page to start tracking visitor behavior and conversions.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Add Your First Site
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sites.map((site) => (
              <div key={site._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1 text-gray-900">{site.name}</h3>
                    <a
                      href={site.domain || site.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {site.domain || site.url} →
                    </a>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditModal(site)}
                      className="w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-900"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteSite(site._id)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center text-gray-500 hover:text-red-600"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Tracking Script</p>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <code className="text-xs font-mono text-gray-700 break-all">
                        {`<script src="${trackerDomain}/tracker.js" data-site="${site.apiKey || site.scriptId}"></script>`}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`<script src="${trackerDomain}/tracker.js" data-site="${site.apiKey || site.scriptId}"></script>`)}
                      className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium"
                    >
                      📋 Copy Script
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      {new Date(site.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      href={`/dashboard?site=${site._id}`}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View Analytics →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Site Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Add New Site</h2>
                <p className="text-sm text-gray-600">Track a new landing page</p>
              </div>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddSite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="My Landing Page"
                  required
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Site URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  required
                  className="input-field w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Include https:// or http://</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModals} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Add Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Site Modal */}
      {editingSite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Edit Site</h2>
                <p className="text-sm text-gray-600">Update site details</p>
              </div>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateSite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Site URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                  className="input-field w-full"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={closeModals} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
