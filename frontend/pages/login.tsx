import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { authAPI } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await authAPI.login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Guesswhere</title>
      </Head>
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#FBFBFB]">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Transparent Header */}
      <div className="fixed top-0 left-0 right-0 border-b border-gray-200 h-16 flex items-center px-6 z-40">
        <Link href="/" className="text-2xl font-bold text-black tracking-tight">
          Guesswhere
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 mt-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors bg-white"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors bg-white"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">New here?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link href="/register" className="block w-full text-center py-2 text-gray-600 hover:text-black font-medium transition-colors">
            Create an account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="hover:text-gray-700 underline">
            Terms
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="hover:text-gray-700 underline">
            Privacy Policy
          </Link>
        </p>
      </div>
      </div>
    </>
  );
}
