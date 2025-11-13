import Link from 'next/link';

export default function Privacy() {
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
        <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-12">Last updated: November 12, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At ConvertPulse, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to GDPR compliance and respect your data rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-2xl font-semibold mb-3 mt-6">Account Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you create an account, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Email address</li>
              <li>Name</li>
              <li>Password (encrypted)</li>
              <li>Billing information (processed securely through Stripe)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">Analytics Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you install our tracking code on your website, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Page URLs</li>
              <li>Referrer information</li>
              <li>Browser type and version</li>
              <li>Device type and screen resolution</li>
              <li>Geographic location (country/city level only)</li>
              <li>Time spent on pages</li>
              <li>Click events and scroll depth</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-3 mt-6">Technical Information</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>IP address (anonymized)</li>
              <li>User agent string</li>
              <li>Session information</li>
              <li>Log data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Provide and maintain our Service</li>
              <li>Process your transactions</li>
              <li>Send you updates and marketing communications (with your consent)</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Analyze usage patterns and improve our Service</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">4. Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Service Providers:</strong> Stripe for payment processing, cloud hosting providers</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Our Service:</strong> We use minimal cookies for authentication and session management.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Your Websites:</strong> Our tracking script does not use cookies by default. We use fingerprinting and sessionStorage for visitor identification, which is privacy-friendly and GDPR-compliant.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your data as follows:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Account Data:</strong> Until you delete your account, then 30 days</li>
              <li><strong>Analytics Data:</strong> According to your plan (30-90 days)</li>
              <li><strong>Billing Records:</strong> 7 years for tax compliance</li>
              <li><strong>Logs:</strong> 90 days maximum</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">7. Your Rights (GDPR)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you're in the EU, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of your data</li>
              <li><strong>Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data</li>
              <li><strong>Portability:</strong> Export your data</li>
              <li><strong>Object:</strong> Opt-out of certain data processing</li>
              <li><strong>Restrict:</strong> Limit how we use your data</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise these rights, contact us at privacy@convertpulse.com
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">8. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement industry-standard security measures:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Encryption in transit (TLS/SSL)</li>
              <li>Encryption at rest</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Secure cloud infrastructure</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Service is not intended for children under 13. We do not knowingly collect data from children. If you believe we have collected data from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">10. International Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers in compliance with GDPR.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through our Service. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or want to exercise your rights:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Email: privacy@convertpulse.com<br />
              Data Protection Officer: dpo@convertpulse.com<br />
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
                <li><Link href="/terms" className="text-gray-600 hover:text-black text-sm transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-black text-sm transition-colors font-semibold">Privacy Policy</Link></li>
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
