import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', text: 'The buying experience was seamless. Found my dream BMW in under a week!', rating: 5 },
  { name: 'James P.', text: 'Best dealership experience I\'ve ever had. Transparent pricing, no pressure.', rating: 5 },
  { name: 'Emily R.', text: 'Their trade-in value was significantly higher than other dealers. Highly recommend!', rating: 5 },
];

const TrustSection = () => (
  <section className="section-spacing">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm text-secondary">
          <Star className="h-4 w-4 fill-current" /> 4.9 Rating on Google
        </div>
        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Trusted by <span className="text-gradient">Thousands</span>
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl border border-border/50 card-surface p-6"
          >
            <Quote className="mb-4 h-8 w-8 text-primary/30" />
            <p className="text-muted-foreground">{t.text}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">
                {t.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
