import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gauge, Fuel } from 'lucide-react';
import { vehicles, formatPrice, formatMileage } from '@/data/vehicles';
import { Link } from 'react-router-dom';

const featured = vehicles.slice(0, 6);

const CarCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % featured.length), 4000);
    return () => clearInterval(t);
  }, []);

  const getIndex = (offset: number) => (active + offset + featured.length) % featured.length;

  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
            Featured <span className="text-gradient">Collection</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Hand-picked premium vehicles for the discerning buyer</p>
        </motion.div>

        <div className="relative flex items-center justify-center" style={{ perspective: '1200px', height: '420px' }}>
          {[-2, -1, 0, 1, 2].map(offset => {
            const idx = getIndex(offset);
            const car = featured[idx];
            const isCenter = offset === 0;
            return (
              <motion.div
                key={`${idx}-${offset}`}
                animate={{
                  x: offset * 280,
                  scale: isCenter ? 1.1 : 0.8,
                  rotateY: offset * -15,
                  zIndex: isCenter ? 10 : 5 - Math.abs(offset),
                  opacity: Math.abs(offset) > 1 ? 0.4 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute w-72"
              >
                <div className={`overflow-hidden rounded-2xl border card-surface ${isCenter ? 'border-primary/30 glow' : 'border-border/30'}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={car.image} alt={car.model} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary">{car.year}</p>
                    <h3 className="font-heading text-base font-bold text-foreground">{car.make} {car.model}</h3>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Gauge className="h-3 w-3" />{formatMileage(car.mileage)}</span>
                      <span className="flex items-center gap-1"><Fuel className="h-3 w-3" />{car.fuel}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-heading font-bold text-foreground">{formatPrice(car.price)}</span>
                      {isCenter && (
                        <Link to={`/vehicle/${car.id}`} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setActive(p => (p - 1 + featured.length) % featured.length)} className="rounded-full border border-border/50 bg-card p-3 text-foreground transition-colors hover:bg-muted">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {featured.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-primary' : 'w-2 bg-muted'}`} />
            ))}
          </div>
          <button onClick={() => setActive(p => (p + 1) % featured.length)} className="rounded-full border border-border/50 bg-card p-3 text-foreground transition-colors hover:bg-muted">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarCarousel;
