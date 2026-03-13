import { useState } from 'react';
import { motion } from 'framer-motion';
import { vehicles, formatPrice, formatMileage, Vehicle } from '@/data/vehicles';
import { Plus, X, GitCompareArrows } from 'lucide-react';

const Compare = () => {
  const [selected, setSelected] = useState<Vehicle[]>([vehicles[0], vehicles[2]]);
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const fields: { label: string; get: (v: Vehicle) => string }[] = [
    { label: 'Price', get: v => formatPrice(v.price) },
    { label: 'Year', get: v => String(v.year) },
    { label: 'Mileage', get: v => `${formatMileage(v.mileage)} mi` },
    { label: 'Engine', get: v => v.engine },
    { label: 'Fuel Type', get: v => v.fuel },
    { label: 'MPG', get: v => v.mpg },
    { label: 'Drivetrain', get: v => v.drivetrain },
    { label: 'Transmission', get: v => v.transmission },
    { label: 'Seats', get: v => String(v.seats) },
    { label: 'Body Type', get: v => v.bodyType },
  ];

  const addVehicle = (v: Vehicle, slot: number) => {
    const newSelected = [...selected];
    newSelected[slot] = v;
    setSelected(newSelected);
    setShowPicker(null);
  };

  return (
    <main className="pt-20">
      <div className="container-custom section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 text-primary">
            <GitCompareArrows className="h-6 w-6" />
            <h1 className="font-heading text-4xl font-bold text-foreground">Compare Vehicles</h1>
          </div>
          <p className="mt-3 text-muted-foreground">Select vehicles to compare side by side</p>
        </motion.div>

        {/* Vehicle Headers */}
        <div className="mt-10 grid gap-6" style={{ gridTemplateColumns: `200px repeat(${Math.max(selected.length, 2)}, 1fr)` }}>
          <div />
          {[0, 1, 2].map(slot => (
            <div key={slot}>
              {selected[slot] ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-2xl border border-border/50 card-surface overflow-hidden">
                  <button onClick={() => setSelected(s => s.filter((_, i) => i !== slot))} className="absolute right-2 top-2 z-10 rounded-full bg-card/80 p-1.5 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                  <img src={selected[slot].image} alt="" className="aspect-[16/10] w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs text-primary">{selected[slot].year}</p>
                    <h3 className="font-heading text-base font-bold text-foreground">{selected[slot].make} {selected[slot].model}</h3>
                  </div>
                </motion.div>
              ) : slot <= selected.length ? (
                <button onClick={() => setShowPicker(slot)} className="flex aspect-[16/14] w-full items-center justify-center rounded-2xl border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
                  <div className="text-center">
                    <Plus className="mx-auto h-8 w-8" />
                    <p className="mt-2 text-sm">Add Vehicle</p>
                  </div>
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selected.length >= 2 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full">
              <tbody>
                {fields.map((field, i) => (
                  <tr key={field.label} className={i % 2 === 0 ? 'bg-card/50' : ''}>
                    <td className="w-[200px] px-6 py-4 text-sm font-medium text-muted-foreground">{field.label}</td>
                    {selected.map((v, j) => (
                      <td key={j} className="px-6 py-4 text-sm font-medium text-foreground">{field.get(v)}</td>
                    ))}
                    {selected.length < 3 && <td />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Vehicle Picker Modal */}
        {showPicker !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowPicker(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={e => e.stopPropagation()}
              className="mx-4 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/50 card-surface p-6"
            >
              <h3 className="mb-6 font-heading text-xl font-bold text-foreground">Select a Vehicle</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {vehicles.filter(v => !selected.includes(v)).map(v => (
                  <button key={v.id} onClick={() => addVehicle(v, showPicker)} className="flex items-center gap-4 rounded-xl border border-border/50 bg-muted/30 p-3 text-left transition-colors hover:border-primary/50">
                    <img src={v.image} alt="" className="h-16 w-24 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{v.year} {v.make} {v.model}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(v.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Compare;
