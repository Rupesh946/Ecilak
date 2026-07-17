export default function ShippingPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-wide max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-warm-gray-900 mb-8">
          Shipping Policy
        </h1>
        <div className="prose prose-lg prose-warm-gray font-sans max-w-none whitespace-pre-line">
          {`Orders are typically processed within 1–3 business days.

Delivery time , 
  Standard  5–10 business days.
  Express     3-5 business days.

Tracking details are shared once the order is shipped.

The business is not responsible for delays due to courier services or unforeseen circumstances.

Business Name:- Ecilak
Email ID:- ecilakbusiness@gmail.com
Mob No:- +91 91384 09991`}
        </div>
      </div>
    </div>
  );
}
