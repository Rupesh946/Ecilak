export default function ShippingPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-wide max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-warm-gray-900 mb-8">
          Shipping Policy
        </h1>
        <div className="prose prose-lg prose-warm-gray font-sans max-w-none">
          <p>
            Orders are typically processed within 1–3 business days.
          </p>

          <h2 className="text-2xl font-serif text-warm-gray-900 mt-8 mb-4">Delivery Time</h2>
          <ul>
            <li><strong>Standard:</strong> 5–10 business days.</li>
            <li><strong>Express:</strong> 3-5 business days.</li>
          </ul>
          
          <p>
            Tracking details are shared once the order is shipped.
          </p>
          <p>
            The business is not responsible for delays due to courier services or unforeseen circumstances.
          </p>
        </div>
      </div>
    </div>
  );
}
