import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, DollarSign } from 'lucide-react';
import { formatPrice } from '@/data/vehicles';

const makes = ['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Porsche', 'Land Rover', 'Lexus', 'Other'];

const TradeIn = () => {
  const [form, setForm] = useState({ make: '', model: '', year: '', mileage: '' });
  const [estimate, setEstimate] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const base = 25000;
    const yearFactor = Math.max(0, 2024 - parseInt(form.year)) * 1500;
    const mileageFactor = parseInt(form.mileage) * 0.08;
    setEstimate(Math.max(5000, Math.round(base - yearFactor - mileageFactor + Math.random() * 5000)));
  };

  return (
    <main className="pt-20">
      <div className="container-custom section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 text-primary">
            <ArrowRightLeft className="h-6 w-6" />
            <span className="font-heading text-sm font-semibold uppercase tracking-wider">Trade-In</span>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-bold text-foreground">
            Trade-In <span className="text-gradient">Estimator</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Get an instant estimate for your current vehicle.</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-border/50 card-surface p-6 md:p-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Make</label>
              <select
                value={form.make}
                onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
                required
                className="w-full rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select make</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            {[
              { key: 'model', label: 'Model', placeholder: 'e.g. X5, C300' },
              { key: 'year', label: 'Year', placeholder: 'e.g. 2020' },
              { key: 'mileage', label: 'Mileage', placeholder: 'e.g. 35000' },
            ].map(field => (
              <div key={field.key}>
                <label className="mb-2 block text-sm font-medium text-foreground">{field.label}</label>
                <input
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  required
                  className="w-full rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}
            <button type="submit" className="btn-glow w-full rounded-xl bg-primary py-4 font-medium text-primary-foreground">
              Get Estimate
            </button>
          </form>

          {estimate && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center">
              <DollarSign className="mx-auto h-10 w-10 text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">Estimated Trade-In Value</p>
              <p className="mt-2 font-heading text-5xl font-bold text-foreground">{formatPrice(estimate)}</p>
              <p className="mt-3 text-xs text-muted-foreground">*Final value subject to in-person inspection</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default TradeIn;
