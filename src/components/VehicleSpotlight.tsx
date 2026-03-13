import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Fuel, Settings } from 'lucide-react';
import { vehicles, formatPrice } from '@/data/vehicles';
import { Link } from 'react-router-dom';

const spotlight = vehicles[4]; // Porsche Cayenne

const specs = [
  { icon: Zap, label: 'Engine', value: spotlight.engine },
  { icon: Gauge, label: 'Mileage', value: `${spotlight.mileage.toLocaleString()} mi` },
  { icon: Fuel, label: 'Fuel', value: spotlight.fuel },
  { icon: Settings, label: 'Drivetrain', value: spotlight.drivetrain },
];

const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      className="font-heading text-5xl font-extrabold text-foreground md:text-6xl"
    >
      {formatPrice(count)}
    </motion.span>
  );
};

const VehicleSpotlight = () => (
  <section className="section-spacing relative overflow-hidden">
    {/* Ambient background */}
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"
      />
    </div>

    <div className="container-custom relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
          <Zap className="h-4 w-4" /> Vehicle Spotlight
        </span>
        <h2 className="mt-6 font-heading text-3xl font-bold text-foreground md:text-5xl">
          {spotlight.year} {spotlight.make} <span className="text-gradient">{spotlight.model}</span>
        </h2>
      </motion.div>

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="animate-float overflow-hidden rounded-2xl border border-border/30 glow">
            <img src={spotlight.image} alt={spotlight.model} className="w-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <p className="mb-2 text-sm text-muted-foreground">Starting at</p>
            <AnimatedCounter target={spotlight.price} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-xl border border-border/50 card-surface p-4"
              >
                <spec.icon className="mb-2 h-5 w-5 text-primary" />
                <p className="text-xs text-muted-foreground">{spec.label}</p>
                <p className="mt-1 font-heading text-sm font-semibold text-foreground">{spec.value}</p>
              </motion.div>
            ))}
          </div>

          <Link
            to={`/vehicle/${spotlight.id}`}
            className="btn-glow mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore This Vehicle
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default VehicleSpotlight;
