import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-light mb-4">Contact Us</h1>
        <p className="text-gray-600">
          Get in touch with us to discuss your project or ask any questions.
        </p>
      </div>
      <ContactForm />
    </div>
  );
} 