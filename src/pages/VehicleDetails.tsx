import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getVehicleById, vehicles, formatPrice, formatMileage } from '@/data/vehicles';
import VehicleCard from '@/components/VehicleCard';
import { Phone, Calendar, CreditCard, MessageCircle, CheckCircle, ChevronLeft, ChevronRight, Shield, User, Gauge, Award, Smartphone } from 'lucide-react';

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicle = getVehicleById(Number(id));
  const [loanAmount, setLoanAmount] = useState(vehicle ? vehicle.price * 0.8 : 40000);
  const [downPayment, setDownPayment] = useState(vehicle ? vehicle.price * 0.2 : 10000);
  const [term, setTerm] = useState(60);

  if (!vehicle) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Vehicle Not Found</h1>
          <Link to="/inventory" className="mt-4 inline-block text-primary hover:underline">Back to Inventory</Link>
        </div>
      </main>
    );
  }

  const monthlyPayment = ((loanAmount - downPayment) * (0.065 / 12)) / (1 - Math.pow(1 + 0.065 / 12, -term));
  const similar = vehicles.filter(v => v.id !== vehicle.id && v.bodyType === vehicle.bodyType).slice(0, 4);
  const highlights = [
    { icon: Shield, label: 'Clean Carfax', active: vehicle.features.includes('Clean Carfax') },
    { icon: User, label: 'One Owner', active: vehicle.features.includes('One Owner') },
    { icon: Gauge, label: 'Low Mileage', active: vehicle.mileage < 15000 },
    { icon: Award, label: 'Premium Package', active: vehicle.features.includes('Premium Package') },
    { icon: Smartphone, label: 'Apple CarPlay', active: vehicle.features.includes('Apple CarPlay') },
  ];

  return (
    <main className="pt-20 pb-24 md:pb-0">
      {/* Gallery */}
      <section className="relative">
        <div className="aspect-[21/9] w-full overflow-hidden">
          <img src={vehicle.image} alt={vehicle.model} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </section>

      <div className="container-custom -mt-24 relative z-10">
        {/* Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/50 card-surface p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm text-primary">{vehicle.year} • {vehicle.bodyType} • {vehicle.color}</p>
              <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">{vehicle.make} {vehicle.model}</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>{formatMileage(vehicle.mileage)} miles</span>
                <span>VIN: {vehicle.vin}</span>
                <span>Stock: #{vehicle.stock}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-heading text-4xl font-bold text-foreground">{formatPrice(vehicle.price)}</p>
              <p className="mt-1 text-sm text-muted-foreground">Est. {formatPrice(Math.round(monthlyPayment))}/mo</p>
            </div>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {highlights.map((h, i) => (
            <div key={i} className={`flex items-center gap-3 rounded-xl border p-4 ${h.active ? 'border-primary/30 bg-primary/5' : 'border-border/30 bg-card/50'}`}>
              <h.icon className={`h-5 w-5 ${h.active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-sm font-medium ${h.active ? 'text-foreground' : 'text-muted-foreground'}`}>{h.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Specs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border/50 card-surface p-6">
              <h2 className="mb-6 font-heading text-xl font-bold text-foreground">Specifications</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Engine', vehicle.engine], ['Transmission', vehicle.transmission],
                  ['Drivetrain', vehicle.drivetrain], ['Fuel Type', vehicle.fuel],
                  ['MPG', vehicle.mpg], ['Seats', String(vehicle.seats)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between rounded-lg bg-muted/30 px-4 py-3">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 rounded-2xl border border-border/50 card-surface p-6">
              <h2 className="mb-6 font-heading text-xl font-bold text-foreground">Features</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {vehicle.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Financing Calculator */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 rounded-2xl border border-border/50 card-surface p-6">
              <h2 className="mb-6 font-heading text-xl font-bold text-foreground">Payment Calculator</h2>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-medium text-foreground">{formatPrice(loanAmount)}</span>
                  </div>
                  <input type="range" min={10000} max={vehicle.price} step={1000} value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full accent-primary" />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="font-medium text-foreground">{formatPrice(downPayment)}</span>
                  </div>
                  <input type="range" min={0} max={loanAmount} step={500} value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-full accent-primary" />
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Loan Term</p>
                  <div className="flex gap-2">
                    {[36, 48, 60, 72, 84].map(t => (
                      <button key={t} onClick={() => setTerm(t)} className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${term === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                        {t}mo
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-primary/10 p-6 text-center">
                  <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
                  <p className="mt-2 font-heading text-4xl font-bold text-primary">{formatPrice(Math.round(monthlyPayment))}</p>
                  <p className="mt-1 text-xs text-muted-foreground">6.5% APR • {term} months</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sticky Action Panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-3">
              {[
                { icon: Phone, label: 'Call Dealer', style: 'bg-primary text-primary-foreground' },
                { icon: Calendar, label: 'Schedule Test Drive', style: 'border border-primary/30 text-primary hover:bg-primary/10' },
                { icon: CreditCard, label: 'Get Pre-Qualified', style: 'border border-border/50 bg-card text-foreground hover:bg-muted' },
                { icon: MessageCircle, label: 'Message Dealer', style: 'border border-border/50 bg-card text-foreground hover:bg-muted' },
              ].map(action => (
                <button key={action.label} className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-medium transition-all ${action.style}`}>
                  <action.icon className="h-5 w-5" /> {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Similar Vehicles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-14 left-0 right-0 z-40 border-t border-border/50 bg-background/95 p-4 backdrop-blur-xl md:hidden">
        <div className="flex gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground">
            <Phone className="h-4 w-4" /> Call
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 py-3 text-sm font-medium text-primary">
            <Calendar className="h-4 w-4" /> Test Drive
          </button>
        </div>
      </div>
    </main>
  );
};

export default VehicleDetails;
