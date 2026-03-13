import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, DollarSign, Car, Fuel, Users, ChevronRight } from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import VehicleCard from './VehicleCard';

const steps = [
  { key: 'budget', title: "What's your budget?", icon: DollarSign, options: ['Under $50k', '$50k–$80k', '$80k–$100k', '$100k+'] },
  { key: 'body', title: 'Preferred body type?', icon: Car, options: ['SUV', 'Sedan', 'Coupe', 'Any'] },
  { key: 'fuel', title: 'Fuel preference?', icon: Fuel, options: ['Gasoline', 'Electric', 'Hybrid', 'Any'] },
  { key: 'seats', title: 'How many seats?', icon: Users, options: ['4', '5', '7+', 'Any'] },
];

const DiscoveryQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [steps[step].key]: value };
    setAnswers(newAnswers);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const getResults = () => {
    return vehicles.filter(v => {
      const b = answers.budget;
      if (b === 'Under $50k' && v.price >= 50000) return false;
      if (b === '$50k–$80k' && (v.price < 50000 || v.price >= 80000)) return false;
      if (b === '$80k–$100k' && (v.price < 80000 || v.price >= 100000)) return false;
      if (b === '$100k+' && v.price < 100000) return false;
      if (answers.body !== 'Any' && v.bodyType !== answers.body) return false;
      if (answers.fuel !== 'Any' && v.fuel !== answers.fuel) return false;
      if (answers.seats !== 'Any') {
        const s = parseInt(answers.seats);
        if (s === 7 && v.seats < 7) return false;
        if (s < 7 && v.seats !== s) return false;
      }
      return true;
    }).slice(0, 3);
  };

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-2xl border border-border/50 card-surface p-8 md:p-12"
        >
          <div className="mb-8 flex items-center gap-3 text-primary">
            <Sparkles className="h-6 w-6" />
            <span className="font-heading text-sm font-semibold uppercase tracking-wider">Vehicle Discovery</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Find your perfect car in <span className="text-gradient">30 seconds</span>
          </h2>

          {!done && (
            <div className="mt-4 flex gap-1">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mt-8"
              >
                <h3 className="mb-6 text-xl font-semibold text-foreground">{steps[step].title}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {steps[step].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/50 px-5 py-4 text-left text-foreground transition-all hover:border-primary/50 hover:bg-primary/10"
                    >
                      {opt}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
                <h3 className="mb-6 text-xl font-semibold text-foreground">Your Recommendations</h3>
                {getResults().length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-3">
                    {getResults().map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No exact matches found. <button onClick={() => { setStep(0); setDone(false); setAnswers({}); }} className="text-primary hover:underline">Try again</button></p>
                )}
                <button onClick={() => { setStep(0); setDone(false); setAnswers({}); }} className="mt-6 text-sm text-primary hover:underline">Retake quiz</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoveryQuiz;
