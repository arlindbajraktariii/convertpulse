import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface User {
  email: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  sitesLimit: number;
  pageviewsLimit: number;
  dataRetentionDays?: number;
  createdAt: string;
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
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
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Password changed successfully');
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const handleUpgrade = () => {
    router.push('/checkout?plan=growth');
  };

  const getPlanDetails = () => {
    if (!user) return null;

    const plans = {
      free: {
        name: 'Free',
        price: '$0',
        color: 'bg-gray-100 text-gray-800',
        features: ['1 site', '5,000 pageviews/month', '30-day data retention']
      },
      growth: {
        name: 'Growth',
        price: '$12/month',
        color: 'bg-black text-white',
        features: ['5 sites', '50,000 pageviews/month', '90-day data retention']
      }
    };

    return plans[user.subscriptionTier as keyof typeof plans] || plans.free;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const planDetails = getPlanDetails();

  return (
    <>
      <Head>
        <title>Profile - ConvertPulse</title>
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
                <Link href="/sites" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  Sites
                </Link>
                <Link href="/profile" className="text-sm font-medium text-black transition-colors">
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
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Account Settings</h1>

        {successMessage && (
          <div className="bg-green-50 rounded-xl border border-green-200 p-4 mb-6">
            <p className="text-green-800 text-sm">✓ {successMessage}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 rounded-xl border border-red-200 p-4 mb-6">
            <p className="text-red-800 text-sm">✗ {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Account Info */}
          <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Account Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">EMAIL</label>
                <p className="text-lg">{user?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">MEMBER SINCE</label>
                <p className="text-lg">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="btn btn-secondary"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Plan */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Current Plan</h2>

            {planDetails && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold ${planDetails.color}`}>
                      {planDetails.name}
                    </span>
                    <span className="text-2xl font-bold">{planDetails.price}</span>
                  </div>
                  {user?.subscriptionTier === 'free' && (
                    <button onClick={handleUpgrade} className="btn btn-primary">
                      Upgrade to Growth →
                    </button>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-4">Plan Features</h3>
                  <ul className="space-y-3">
                    {planDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-1">SITES LIMIT</p>
                    <p className="text-2xl font-bold">{user?.sitesLimit || 1}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-1">PAGEVIEWS/MONTH</p>
                    <p className="text-2xl font-bold">{(user?.pageviewsLimit || 5000).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-1">DATA RETENTION</p>
                    <p className="text-2xl font-bold">{user?.dataRetentionDays || 30} days</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Billing */}
          {user?.subscriptionTier === 'growth' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Billing</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">STATUS</label>
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold bg-green-100 text-green-800">
                    {user?.subscriptionStatus || 'Active'}
                  </span>
                </div>

                <div className="pt-4 space-y-3">
                  <button className="btn btn-secondary w-full text-left flex justify-between items-center">
                    <span>Manage Subscription</span>
                    <span>→</span>
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold mb-2 text-red-600">Danger Zone</h2>
            <p className="text-sm text-gray-500 mb-6">
              Permanent actions that cannot be undone
            </p>
            
            <button className="bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition-colors">
              Delete Account
            </button>
          </div>
          </div>
          
          {/* Right Column - Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Account Status</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Plan Type</p>
                  <p className="text-lg font-bold text-gray-900">{planDetails?.name || 'Free'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-lg">
                    Active
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-sm font-semibold mb-2">Upgrade Your Plan</h3>
              <p className="text-xs opacity-90 mb-4">Get more sites and features</p>
              <button className="w-full px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors text-sm">
                View Plans
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Change Password</h2>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setError('');
                }}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  minLength={6}
                  className="input-field w-full"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                  className="input-field w-full"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setError('');
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Update Password
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
