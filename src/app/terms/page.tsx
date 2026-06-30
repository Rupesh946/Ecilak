export const metadata = {
  title: "Terms of Service",
  description: "Ecilak Terms of Service — the terms and conditions governing your use of our website and products.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-warm-gray-900 mb-4">Terms of Service</h1>
          <p className="text-sm text-warm-gray-400 font-sans">Last updated: June 30, 2026</p>
        </div>

        <div className="space-y-8 text-warm-gray-600 font-sans text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using the Ecilak website (ecilak.com), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">2. Products and Pricing</h2>
            <p>All product descriptions, images, and prices are subject to change without notice. We strive to display colours and images as accurately as possible, but we cannot guarantee that your device&apos;s display will accurately reflect the actual colours. Prices are listed in USD and do not include applicable taxes or shipping, which are calculated at checkout.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">3. Orders and Payment</h2>
            <p>By placing an order, you are making an offer to purchase a product. We reserve the right to refuse or cancel any order for any reason, including product availability, errors in pricing or product information, or suspected fraudulent activity. Payment is processed securely through our third-party payment processors.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">4. Intellectual Property</h2>
            <p>All content on this website, including text, images, graphics, logos, and software, is the property of Ecilak and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>Ecilak shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or products. Our total liability shall not exceed the amount you paid for the product(s) in question.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">6. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">7. Contact</h2>
            <p>For questions about these Terms of Service, contact us at <a href="mailto:legal@ecilak.com" className="text-terracotta-400 hover:underline">legal@ecilak.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
