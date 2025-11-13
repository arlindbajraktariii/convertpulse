import { useState } from 'react';
import { useRouter } from 'next/router';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '',
    siteUrl: ''
  });
  const [error, setError] = useState('');

  const handleCreateSite = async () => {
    if (!formData.siteName || !formData.siteUrl) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsCreating(true);

    try {
      const token = localStorage.getItem('token');
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
        // Mark as completed
        localStorage.setItem('onboarding_completed', 'true');
        onClose();
        setFormData({ siteName: '', siteUrl: '' });
        setStep(1);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create site');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    } finally {
      setIsCreating(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onClose();
    setFormData({ siteName: '', siteUrl: '' });
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center">
            <div className="w-12 h-12 bg-black rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome! 👋</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Let's set up your first site to start tracking conversions in minutes.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors text-sm"
              >
                Skip
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 font-semibold transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Add Site */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Your First Site</h2>
              <p className="text-sm text-gray-600">Tell us about the page you want to track</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Site Name</label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  placeholder="e.g., My Product"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Website URL</label>
                <input
                  type="url"
                  value={formData.siteUrl}
                  onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                  placeholder="https://yoursite.com"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors text-sm bg-white"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-black font-medium transition-colors text-sm"
              >
                Back
              </button>
              <button
                onClick={handleCreateSite}
                disabled={isCreating || !formData.siteName || !formData.siteUrl}
                className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isCreating ? 'Creating...' : 'Create Site'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
