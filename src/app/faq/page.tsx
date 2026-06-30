import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Ecilak products, shipping, returns, and more.",
};

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight options are available at checkout. Orders over $50 qualify for free standard shipping." },
      { q: "Do you ship internationally?", a: "We currently ship within the United States. International shipping is coming soon — join our newsletter to be the first to know." },
      { q: "Can I track my order?", a: "Yes! Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order in the My Account section." },
    ],
  },
  {
    category: "Products",
    questions: [
      { q: "Are your products cruelty-free?", a: "Absolutely. All Ecilak products are Leaping Bunny certified cruelty-free. We never test on animals, and neither do our ingredient suppliers." },
      { q: "Are your products suitable for sensitive skin?", a: "Many of our products are formulated with sensitive skin in mind. We recommend checking the ingredient list on each product page or reaching out to our team for personalised recommendations." },
      { q: "What does 'clean beauty' mean to you?", a: "For us, clean beauty means formulating without parabens, sulfates, phthalates, synthetic fragrances, mineral oils, or any ingredient we wouldn't feel comfortable using ourselves. Every ingredient is vetted for safety and efficacy." },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "What is your return policy?", a: "We offer a 30-day return policy on unopened and unused products. If you're not satisfied, please contact us at hello@ecilak.com to initiate a return." },
      { q: "How long do refunds take?", a: "Once we receive your return, refunds are processed within 5-7 business days and will appear on your original payment method." },
      { q: "Can I exchange a product?", a: "Yes, we're happy to help with exchanges. Contact our team and we'll arrange a swap for you." },
    ],
  },
  {
    category: "Account",
    questions: [
      { q: "Do I need an account to place an order?", a: "No, guest checkout is available. However, creating an account gives you access to order tracking, wishlists, faster checkout, and exclusive member perks." },
      { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page and follow the instructions sent to your email. If you need further help, contact our support team." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-terracotta-400 font-sans font-medium mb-4 block">
            Help Centre
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-warm-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-warm-gray-500 font-sans">
            Can&apos;t find what you&apos;re looking for? <a href="/contact" className="text-terracotta-400 hover:underline">Contact us</a>.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-serif text-xl text-warm-gray-900 mb-4">
                {section.category}
              </h2>
              <Accordion className="space-y-2">
                {section.questions.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${section.category}-${i}`}
                    className="bg-cream-50 rounded-xl border-0 px-5"
                  >
                    <AccordionTrigger className="text-sm font-sans text-warm-gray-900 hover:text-terracotta-400 py-4 [&[data-state=open]]:text-terracotta-400">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-warm-gray-600 font-sans leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
