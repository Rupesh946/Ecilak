import { Leaf, Sparkles, Recycle, Heart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About",
  description: "Learn about Ecilak — our story, values, and commitment to clean, luxurious beauty.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="container-wide max-w-4xl text-center mb-20">
        <span className="text-xs tracking-[0.3em] uppercase text-terracotta-400 font-sans font-medium mb-4 block">
          Our Story
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-warm-gray-900 mb-6">
          Beauty with <span className="italic text-terracotta-400">intention</span>
        </h1>
        <p className="text-warm-gray-600 font-sans text-lg leading-relaxed max-w-2xl mx-auto">
          Ecilak was born from a simple belief: beauty products should be as good for you as they make you feel. We create clean, luxurious formulas that celebrate the ritual of self-care — without compromise.
        </p>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-wide max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-terracotta-100 via-cream-200 to-terracotta-50 flex items-center justify-center">
              <span className="font-serif text-[10rem] text-white/30 select-none">E</span>
            </div>
            <div>
              <h2 className="font-serif text-3xl text-warm-gray-900 mb-6">
                Where it all began
              </h2>
              <div className="space-y-4 text-warm-gray-600 font-sans leading-relaxed">
                <p>
                  In 2023, our founder grew tired of choosing between products that worked and products that were safe. Too many brands asked her to compromise — effective but full of questionable ingredients, or clean but underwhelming.
                </p>
                <p>
                  Ecilak bridges that gap. Every formula is developed with the conviction that high performance and clean beauty are not mutually exclusive. We partner with cosmetic chemists who share our obsession with ingredient integrity.
                </p>
                <p>
                  From our first product — the Radiance Renewal Serum — to our expanding collection, each launch goes through 12+ months of development, rigorous testing, and community feedback before it reaches your shelf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="sustainability" className="section-padding bg-cream-100">
        <div className="container-wide">
          <SectionHeading
            title="Our Values"
            subtitle="Every decision at Ecilak is guided by these principles."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Clean Formulas", desc: "Free from parabens, sulfates, phthalates, and synthetic fragrances. Every ingredient earns its place." },
              { icon: Sparkles, title: "Cruelty-Free", desc: "Leaping Bunny certified. We never test on animals, and we never will." },
              { icon: Recycle, title: "Sustainable", desc: "Refillable packaging, FSC-certified paper, carbon-neutral shipping, and zero single-use plastic." },
              { icon: Heart, title: "Community", desc: "1% of revenue supports women's health initiatives worldwide." },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-terracotta-50 text-terracotta-400 mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-warm-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-warm-gray-500 font-sans leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Philosophy */}
      <section id="ingredients" className="section-padding bg-warm-gray-900 text-cream-100">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-cream-50 mb-6">
            Ingredients we believe in
          </h2>
          <p className="text-warm-gray-400 font-sans leading-relaxed mb-10">
            We source globally, test rigorously, and formulate with purpose. Every ingredient is chosen for proven efficacy and safety — backed by peer-reviewed research, not trends.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Hyaluronic Acid", "Vitamin C", "Niacinamide", "Ceramides", "Bakuchiol", "Squalane", "Centella Asiatica", "Peptides"].map((ingredient) => (
              <span
                key={ingredient}
                className="px-4 py-2 rounded-full bg-warm-gray-800 text-cream-200 text-sm font-sans"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
