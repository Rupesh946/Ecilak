export const metadata = {
  title: "Refund Policy",
  description: "Ecilak Refund Policy — our commitment to your satisfaction with returns, exchanges, and refunds.",
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-14">
          <h1 className="font-serif text-4xl md:text-5xl text-warm-gray-900 mb-4">Refund Policy</h1>
          <p className="text-sm text-warm-gray-400 font-sans">Last updated: June 30, 2026</p>
        </div>

        <div className="space-y-8 text-warm-gray-600 font-sans text-sm leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">7-Day Satisfaction Guarantee</h2>
            <p>At Ecilak, your satisfaction is our priority. If you are not completely happy with your purchase, you may return it within 7 days of delivery for a full refund. Products must be unused, unopened, and in their original packaging.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">How to Initiate a Return</h2>
            <p>To start a return, please contact our support team at <a href="mailto:ecilakbusiness@gmail.com" className="text-terracotta-400 hover:underline">ecilakbusiness@gmail.com</a> with your order number. We&apos;ll provide you with a return label and instructions.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">Refund Processing</h2>
            <p>Once we receive and inspect your return, we&apos;ll process your refund within 5-7 business days. The refund will be applied to your original payment method. Please note that it may take an additional 3-5 business days for the refund to appear on your statement, depending on your bank or card issuer.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">Exchanges</h2>
            <p>We&apos;re happy to exchange products for a different size, shade, or item of equal value. Contact us to arrange an exchange. If the replacement item is of higher value, you&apos;ll be charged the difference.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">Damaged or Defective Items</h2>
            <p>If you receive a damaged or defective product, please contact us immediately with photos. We&apos;ll send a replacement at no additional cost or issue a full refund — your choice.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">Non-Returnable Items</h2>
            <p>For hygiene reasons, the following items cannot be returned: opened cosmetics, used skincare products, and gift cards. Sale items are final sale unless defective.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-warm-gray-900 mb-3">Questions?</h2>
            <p>Contact us at <a href="mailto:ecilakbusiness@gmail.com" className="text-terracotta-400 hover:underline">ecilakbusiness@gmail.com</a>. We&apos;re here to help.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
