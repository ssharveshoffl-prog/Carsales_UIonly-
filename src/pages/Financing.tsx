import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle } from 'lucide-react';

const Financing = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-20">
      <div className="container-custom section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 text-primary">
            <CreditCard className="h-6 w-6" />
            <span className="font-heading text-sm font-semibold uppercase tracking-wider">Financing</span>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-bold text-foreground">Get <span className="text-gradient">Pre-Qualified</span></h1>
          <p className="mt-3 text-muted-foreground">Quick and easy financing application. No impact on credit score.</p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-10 rounded-2xl border border-secondary/30 bg-secondary/10 p-8 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-secondary" />
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Application Submitted!</h2>
              <p className="mt-2 text-muted-foreground">We'll contact you within 24 hours with your pre-qualification details.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-border/50 card-surface p-6 md:p-8">
              {[
                { label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email', type: 'email', placeholder: 'john@example.com' },
                { label: 'Phone', type: 'tel', placeholder: '(555) 123-4567' },
                { label: 'Address', type: 'text', placeholder: '123 Main St, City, State' },
              ].map(field => (
                <div key={field.label}>
                  <label className="mb-2 block text-sm font-medium text-foreground">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    className="w-full rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              ))}
              <button type="submit" className="btn-glow w-full rounded-xl bg-primary py-4 font-medium text-primary-foreground">
                Submit Application
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default Financing;
