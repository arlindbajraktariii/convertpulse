import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '',
    siteUrl: '',
    goal: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  const handleNext = () => {
    setError('');
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && formData.siteName && formData.siteUrl) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setError('');
    setIsCreating(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Create the first site with correct field names
      const response = await fetch('http://localhost:5000/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.siteName,
          domain: formData.siteUrl
        })
      });

      if (response.ok) {
        setSuccess('Site created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create site. Please try again.');
        setIsCreating(false);
      }
    } catch (error) {
      console.error('Error creating site:', error);
      setError('An error occurred. Please try again.');
      setIsCreating(false);
    }
  };

  const skipOnboarding = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 bg-white">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ConvertPulse
        </Link>
        <button
          onClick={skipOnboarding}
          className="text-sm text-gray-600 hover:text-black transition-colors font-medium"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-900">Step {step} of 3</span>
              <span className="text-sm font-semibold text-gray-600">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Content Container with smooth transitions */}
          <div className="min-h-[500px] flex flex-col justify-center">
            {/* Step 1: Welcome */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="max-w-lg mx-auto text-center">
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-black rounded-2xl mx-auto flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to ConvertPulse</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      Let's get your first site set up in just a few minutes. We'll guide you through everything you need to start tracking conversions.
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-900 transition-colors text-lg"
                  >
                    Let's Get Started →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Add Site */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="max-w-lg mx-auto">
                  <div className="text-center mb-10">
                    <div className="w-14 h-14 bg-black rounded-xl mx-auto flex items-center justify-center mb-6">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Add Your First Site</h2>
                    <p className="text-lg text-gray-600">Tell us about the landing page you want to track</p>
                  </div>

                  <div className="space-y-5">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Site Name</label>
                      <input
                        type="text"
                        value={formData.siteName}
                        onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                        placeholder="e.g., Product Launch Page"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors text-base bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Website URL</label>
                      <input
                        type="url"
                        value={formData.siteUrl}
                        onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                        placeholder="https://yoursite.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors text-base bg-white"
                      />
                    </div>

                    <div className="flex gap-3 pt-6">
                      <button
                        onClick={handleBack}
                        className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors text-base"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formData.siteName || !formData.siteUrl}
                        className="flex-1 px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Choose Goal */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="max-w-lg mx-auto">
                  <div className="text-center mb-10">
                    <div className="w-14 h-14 bg-black rounded-xl mx-auto flex items-center justify-center mb-6">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">What's Your Main Goal?</h2>
                    <p className="text-lg text-gray-600">This helps us personalize your experience</p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm mb-6">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm mb-6">
                      {success}
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'conversions', icon: '🎯', title: 'Track Conversions', desc: 'Measure button clicks, form submissions, and goal completions' },
                      { id: 'behavior', icon: '👥', title: 'Understand Visitors', desc: 'See where visitors come from and how they interact' },
                      { id: 'optimize', icon: '📈', title: 'Optimize Performance', desc: 'Test different approaches and improve conversion rates' }
                    ].map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => setFormData({ ...formData, goal: goal.id })}
                        className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
                          formData.goal === goal.id
                            ? 'bg-black text-white border-black shadow-lg'
                            : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`text-3xl flex-shrink-0 mt-1 ${formData.goal === goal.id ? 'filter brightness-150' : ''}`}>
                            {goal.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold text-lg mb-1 ${formData.goal === goal.id ? 'text-white' : 'text-gray-900'}`}>
                              {goal.title}
                            </h3>
                            <p className={`text-sm ${formData.goal === goal.id ? 'text-white/80' : 'text-gray-600'}`}>
                              {goal.desc}
                            </p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 ${
                            formData.goal === goal.id
                              ? 'bg-white border-white'
                              : 'border-gray-300'
                          }`} />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={handleBack}
                      className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition-colors text-base"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleComplete}
                      disabled={!formData.goal || isCreating}
                      className="flex-1 px-6 py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
                    >
                      {isCreating ? 'Creating...' : 'Complete Setup →'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-gray-200 bg-white">
        <p className="text-sm text-gray-600">
          Step {step} of 3
        </p>
      </div>
    </div>
  );
}
