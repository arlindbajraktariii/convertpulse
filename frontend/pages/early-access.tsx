import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function EarlyAccess() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/early-access`, formData);
      setSubmitted(true);
      setFormData({ email: '', name: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-[#FBFBFB]">
      {/* Navigation */}
      <nav className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="text-3xl font-bold tracking-tight hover:text-gray-600 transition-colors">
            ConvertPulse
          </Link>
        </div>
      </nav>

      {/* Early Access Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-none">
            Get Early Access 🚀
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Join the exclusive list of early adopters
          </p>
          <p className="text-xl text-gray-500">
            Limited to first 50 users. Get lifetime discounts, secret templates, and priority support.
          </p>
        </div>

        {!submitted ? (
          <div className="max-w-md mx-auto px-6">
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-black text-white px-5 py-4 border-2 border-black">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Name (Optional)
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input-field"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="input-field"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-sm text-gray-500 mt-2">We'll send you a confirmation and updates.</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Claim Your Spot Now 🎁'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t-2 border-black text-center">
                <p className="text-sm text-gray-600">
                  ✅ No credit card required<br />
                  ✅ Instant confirmation email<br />
                  ✅ Exclusive early adopter benefits
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto px-6">
            <div className="card bg-black text-white">
              <div className="text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-bold mb-4">You're In!</h2>
                <p className="text-lg mb-6 text-gray-200">
                  Check your email for a confirmation message.
                </p>
                <p className="text-gray-300 mb-8">
                  We'll be sending you exclusive tips, templates, and early access details soon. Keep an eye on your inbox!
                </p>
                <Link href="/" className="btn bg-yellow-400 text-black hover:bg-yellow-300 w-full inline-block">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto px-6 mt-20 border-t-2 border-black pt-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            What You'll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hover">
              <h3 className="text-2xl font-bold mb-4">🎁 Early Adopter Discount</h3>
              <p className="text-gray-600">Lifetime 50% off Pro plan. Lock in this price forever.</p>
            </div>
            <div className="card-hover">
              <h3 className="text-2xl font-bold mb-4">📚 Secret Templates</h3>
              <p className="text-gray-600">Exclusive conversion optimization templates & guides.</p>
            </div>
            <div className="card-hover">
              <h3 className="text-2xl font-bold mb-4">⭐ Priority Support</h3>
              <p className="text-gray-600">Direct access to our team. Questions answered in hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t-2 border-black mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-2">ConvertPulse</h3>
          <p className="text-gray-600">Landing page analytics made simple</p>
        </div>
      </footer>
    </div>
  );
}
