export const metadata = {
  title: "Privacy Policy",
  description: "Ecilak Privacy Policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-warm-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-warm-gray-400 font-sans">Last updated: June 30, 2026</p>
        </div>

        <div className="prose-ecilak space-y-8 text-warm-gray-600 font-sans text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us. This may include your name, email address, postal address, phone number, and payment information.</p>
            <p className="mt-3">We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and browsing behaviour through cookies and similar technologies.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to process orders and transactions, send order confirmations and shipping updates, respond to your enquiries, send marketing communications (with your consent), improve our website and products, and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, and delivering orders — strictly on a need-to-know basis and under confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transfers and secure storage practices. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at ecilakbusiness@gmail.com.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">6. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:ecilakbusiness@gmail.com" className="text-terracotta-400 hover:underline">ecilakbusiness@gmail.com</a> or write to us at 123 Beauty Lane, Los Angeles, CA 90001.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
