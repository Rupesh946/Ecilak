"use client";

import { useState } from "react";
import { Mail, ShieldCheck, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-terracotta-400 font-sans font-medium mb-4 block">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-warm-gray-900 mb-4">
            We&apos;d love to hear from you
          </h1>
          <p className="text-warm-gray-500 font-sans max-w-lg mx-auto">
            Whether you have a question about a product, need skincare advice, or just want to say hello — we&apos;re here.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-cream-50 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sans font-medium text-warm-gray-900 text-sm">Email</p>
                  <a href="mailto:ecilakbusiness@gmail.com" className="text-sm text-warm-gray-500 hover:text-terracotta-400 transition-colors font-sans">
                    ecilakbusiness@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sans font-medium text-warm-gray-900 text-sm">Satisfaction Guarantee</p>
                  <p className="text-sm text-warm-gray-500 font-sans">
                    1-week hassle-free returns on all products
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-sans font-medium text-warm-gray-900 text-sm">Address</p>
                  <p className="text-sm text-warm-gray-500 font-sans">
                    123 Beauty Lane<br />
                    Los Angeles, CA 90001
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-cream-50 rounded-2xl p-6">
              <h3 className="font-serif text-lg text-warm-gray-900 mb-2">Hours</h3>
              <div className="space-y-1 text-sm font-sans text-warm-gray-500">
                <p>Monday – Friday: 9am – 6pm PST</p>
                <p>Saturday: 10am – 4pm PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-cream-50 rounded-2xl p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName" className="text-sm font-sans text-warm-gray-600">
                    Name
                  </Label>
                  <Input
                    id="contactName"
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    required
                    className="mt-1 bg-white border-cream-300"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail" className="text-sm font-sans text-warm-gray-600">
                    Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    required
                    className="mt-1 bg-white border-cream-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactSubject" className="text-sm font-sans text-warm-gray-600">
                  Subject
                </Label>
                <Input
                  id="contactSubject"
                  value={formData.subject}
                  onChange={(e) => setFormData((d) => ({ ...d, subject: e.target.value }))}
                  required
                  className="mt-1 bg-white border-cream-300"
                />
              </div>

              <div>
                <Label htmlFor="contactMessage" className="text-sm font-sans text-warm-gray-600">
                  Message
                </Label>
                <textarea
                  id="contactMessage"
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  required
                  rows={6}
                  className="mt-1 w-full rounded-md border border-cream-300 bg-white px-3 py-2 text-sm text-warm-gray-900 placeholder:text-warm-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100 font-sans resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button
                type="submit"
                className="bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans text-sm tracking-wide rounded-xl px-8 gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
