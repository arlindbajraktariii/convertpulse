import Link from 'next/link';

export default function Terms() {
  return (
  <div className="min-h-screen bg-[#FBFBFB]">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              ConvertPulse
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Home
              </Link>
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-12">Last updated: November 12, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using ConvertPulse ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ConvertPulse provides web analytics and conversion optimization tools for landing pages. We offer both free and paid subscription plans with varying features and usage limits.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">3. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use our Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Providing accurate and complete information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">4. Subscription Plans</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Free Plan:</strong> Includes 1 site, 5,000 pageviews per month, and basic features.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Growth Plan:</strong> $12/month, includes 5 sites, 50,000 pageviews per month, and all features.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Paid subscriptions automatically renew unless cancelled before the renewal date. You can cancel your subscription at any time from your account settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">5. Usage Limits</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each plan has specific usage limits for sites and pageviews. If you exceed your plan limits, we may:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Suspend data collection until limits reset</li>
              <li>Contact you to upgrade your plan</li>
              <li>Temporarily restrict access to certain features</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">6. Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use automated scripts to collect data from the Service</li>
              <li>Resell or redistribute the Service without permission</li>
              <li>Track personally identifiable information without proper consent</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">7. Data Ownership</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain all rights to the data you collect through our Service. We do not claim ownership of your analytics data. You grant us permission to store and process your data solely to provide the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">8. Privacy & Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and protect your data. By using our Service, you also agree to our Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">9. Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For paid plans:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Payments are processed securely through Stripe</li>
              <li>All fees are in USD and exclude applicable taxes</li>
              <li>Refunds are available within 14 days of purchase</li>
              <li>Failed payments may result in service suspension</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">10. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to maintain 99.9% uptime but cannot guarantee uninterrupted access. We may perform scheduled maintenance and will notify users in advance when possible.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">11. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account if you violate these Terms. You may terminate your account at any time. Upon termination, your data will be retained for 30 days before permanent deletion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">12. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ConvertPulse is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will notify users of significant changes via email.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">14. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Email: legal@convertpulse.com<br />
              Address: San Francisco, CA, USA
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">ConvertPulse</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Simple, powerful analytics for landing pages that convert.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-900">Product</h4>
              <ul className="space-y-3">
                <li><Link href="/#features" className="text-gray-600 hover:text-black text-sm transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="text-gray-600 hover:text-black text-sm transition-colors">Pricing</Link></li>
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
                <li><Link href="/terms" className="text-gray-600 hover:text-black text-sm transition-colors font-semibold">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-black text-sm transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">&copy; 2025 ConvertPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
