import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ecilak. Have a question about your order or our products? We'd love to hear from you.",
  openGraph: {
    title: "Contact Us — Ecilak",
    description:
      "Have a question about your order or our products? We'd love to hear from you.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
