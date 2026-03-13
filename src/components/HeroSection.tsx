import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImg from '@/assets/car-hero.jpg';

const suggestions = ['SUV under $30k', 'Electric cars', 'Luxury sedan', 'Low mileage BMW'];

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury vehicle" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"
          >
            <Sparkles className="h-4 w-4" /> Premium Collection Available
          </motion.div>

          <h1 className="font-heading text-5xl font-extrabold leading-tight text-foreground md:text-7xl">
            Find Your
            <span className="text-gradient"> Perfect </span>
            Vehicle
          </h1>

          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Explore our curated collection of premium vehicles with transparent pricing and exceptional service.
          </p>

          <div className="relative mt-10">
            <div className={`flex items-center gap-3 rounded-2xl border bg-card p-2 transition-all ${focused ? 'border-primary glow' : 'border-border/50'}`}>
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="Search by make, model, or type..."
                className="flex-1 bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={() => navigate('/inventory')}
                className="btn-glow rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Search
              </button>
            </div>

            {focused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-border/50 bg-card p-2"
              >
                {suggestions.map(s => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); navigate('/inventory'); }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Search className="h-4 w-4" /> {s} <ChevronRight className="ml-auto h-4 w-4" />
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/inventory')}
              className="rounded-xl border border-border/50 bg-card px-6 py-3 font-medium text-foreground transition-all hover:bg-muted"
            >
              Browse All
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
