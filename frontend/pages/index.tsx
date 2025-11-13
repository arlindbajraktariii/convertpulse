import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Head>
        <title>Guesswhere - Landing Page Analytics</title>
      </Head>
  <div className="min-h-screen bg-[#FBFBFB]">
        {/* Navigation */}
  <nav className="border-b border-gray-200 sticky top-0 z-50 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-black hover:opacity-80 transition-opacity">
              Guesswhere
            </Link>
            <div className="flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                Pricing
              </Link>
              {isLoggedIn && (
                <>
                  <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/sites" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                    Sites
                  </Link>
                  <Link href="/profile" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                    Profile
                  </Link>
                </>
              )}
              {!isLoggedIn && (
                <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                  Login
                </Link>
              )}
              <Link href="/register" className="btn bg-[#84994F] text-white hover:bg-[#6B7A3F] text-sm">
                {isLoggedIn ? 'Dashboard' : 'Get Started Free'}
              </Link>
            </div>
          </div>
        </div>
      </nav>

  {/* Hero Section */}
  <header className="relative min-h-screen w-full bg-[#f8fafc]">
        {/* Bottom Fade Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: "20px 30px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Stop guessing. Start knowing.
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Every click, scroll, and exit — tracked. Every insight — actionable.
            </p>
          </div>

          {/* Modern Info Cards (moved from header) */}
          <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* JS Snippet Card */}
            <div className="flex-1 max-w-xs bg-white/90 border border-gray-200 shadow-lg rounded-2xl px-6 py-8 text-center backdrop-blur-md">
              <div className="flex justify-center mb-4">
                <svg className="w-8 h-8 text-[#84994F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1" />
                  <circle cx="12" cy="7" r="4" strokeWidth={2} />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Add This Snippet</h3>
              <p className="text-gray-600 text-sm mb-3">Copy and paste this JS snippet to enable real-time analytics:</p>
              <pre className="bg-gray-100 rounded-md text-xs p-2 overflow-x-auto select-all text-left"><code>{`<script src="https://guesswhere.com/tracker.js" async></script>`}</code></pre>
            </div>
            {/* Real-Time Insights Card */}
            <div className="flex-1 max-w-xs bg-white/90 border border-gray-200 shadow-lg rounded-2xl px-6 py-8 text-center backdrop-blur-md">
              <div className="flex justify-center mb-4">
                <svg className="w-8 h-8 text-[#84994F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0a2 2 0 002 2h2a2 2 0 002-2" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Real-Time Insights</h3>
              <p className="text-gray-600 text-sm">See live visitor actions and engagement as they happen on your site.</p>
            </div>
            {/* Privacy First Card */}
            <div className="flex-1 max-w-xs bg-white/90 border border-gray-200 shadow-lg rounded-2xl px-6 py-8 text-center backdrop-blur-md">
              <div className="flex justify-center mb-4">
                <svg className="w-8 h-8 text-[#84994F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Privacy First</h3>
              <p className="text-gray-600 text-sm">GDPR compliant. No cookies. Your data stays yours, always.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
  <section id="features" className="py-24 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Everything you need to optimize
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful analytics without the complexity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group hover:bg-gray-50 rounded-2xl p-8 transition-all duration-200">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track visitor behavior as it happens. See live pageviews, sessions, and engagement metrics.
              </p>
            </div>

            <div className="group hover:bg-gray-50 rounded-2xl p-8 transition-all duration-200">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Conversion Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Identify what drives conversions. Track goals, button clicks, and form submissions.
              </p>
            </div>

            <div className="group hover:bg-gray-50 rounded-2xl p-8 transition-all duration-200">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Performance Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Get actionable insights on page speed, SEO, and user experience issues.
              </p>
            </div>

            <div className="group hover:bg-gray-50 rounded-2xl p-8 transition-all duration-200">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-gray-600 leading-relaxed">
                GDPR compliant. No cookies needed. Your data stays yours, always.
              </p>
            </div>

            <div className="group hover:bg-gray-50 rounded-2xl p-8 transition-all duration-200">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Simple Setup</h3>
              <p className="text-gray-600 leading-relaxed">
                Add one line of code and you're done. No complex configuration required.
              </p>
            </div>

            <div className="group hover:bg-gray-50 rounded-2xl p-8 transition-all duration-200">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Beautiful Reports</h3>
              <p className="text-gray-600 leading-relaxed">
                Clean, intuitive dashboards that make sense at a glance. No data science degree needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
  <section className="py-24 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Get started in minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to better conversions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create Account</h3>
              <p className="text-gray-600">Sign up free in seconds. No credit card required.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Add Tracking Code</h3>
              <p className="text-gray-600">Copy one line of code to your landing page.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Watch the Data</h3>
              <p className="text-gray-600">Get instant insights and optimize your conversions.</p>
            </div>
          </div>
        </div>
      </section>

    

      {/* Pricing Section */}
  <section id="pricing" className="py-24 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free, upgrade as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-black transition-all duration-200 hover:shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-600">Perfect to get started</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span className="text-gray-700">1 site</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span className="text-gray-700">5,000 pageviews / month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span className="text-gray-700">Core analysis features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 mt-0.5">✓</span>
                  <span className="text-gray-700">Basic insights</span>
                </li>
              </ul>
              <Link href="/register" className="btn btn-outline w-full block text-center">
                Join Free 🚀
              </Link>
            </div>

            {/* Growth Plan */}
            <div className="bg-black text-white rounded-2xl p-8 border-2 border-black hover:shadow-2xl transition-all duration-200 relative">
              <div className="absolute -top-3 -right-3 bg-white text-black px-4 py-1.5 text-xs font-bold rounded-full border-2 border-black">
                MOST POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Growth</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold">$12</span>
                  <span className="text-xl text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-400">For growing businesses</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-0.5">✓</span>
                  <span>5 sites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-0.5">✓</span>
                  <span>50,000 pageviews / month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-0.5">✓</span>
                  <span>All core features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-0.5">✓</span>
                  <span>90-day data retention</span>
                </li>
              </ul>
              <Link href="/register" className="btn bg-white text-black hover:bg-gray-100 w-full block text-center font-semibold">
                Get Growth
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              All plans include core analytics • Cancel anytime • No hidden fees
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to boost your conversions?
          </h2>
          <p className="text-xl mb-10 text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of marketers using Guesswhere to optimize their landing pages
          </p>
          <Link href="/register" className="btn bg-white text-black hover:bg-gray-100 text-base px-8 py-4 inline-block font-semibold">
            Start Free Today →
          </Link>
          <p className="text-sm text-gray-400 mt-6">
            No credit card required • 5,000 pageviews free forever
          </p>
        </div>
      </section>

      {/* Footer */}
  <footer className="bg-[#FBFBFB] py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Guesswhere</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Simple, powerful analytics for landing pages that convert.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-900">Product</h4>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-gray-600 hover:text-black text-sm transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-gray-600 hover:text-black text-sm transition-colors">Pricing</Link></li>
                <li><Link href="/register" className="text-gray-600 hover:text-black text-sm transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-900">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="/dashboard" className="text-gray-600 hover:text-black text-sm transition-colors">Dashboard</Link></li>
                <li><Link href="/docs" className="text-gray-600 hover:text-black text-sm transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-900">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-gray-600 hover:text-black text-sm transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-black text-sm transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">&copy; 2025 Guesswhere. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
