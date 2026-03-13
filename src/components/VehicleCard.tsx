import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Heart, GitCompareArrows, Gauge, Fuel } from 'lucide-react';
import { Vehicle, formatPrice, formatMileage } from '@/data/vehicles';

interface Props {
  vehicle: Vehicle;
  index?: number;
}

const VehicleCard = ({ vehicle, index = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group relative overflow-hidden rounded-xl border border-border/50 card-surface"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={vehicle.image}
        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <Link
          to={`/vehicle/${vehicle.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Eye className="h-3.5 w-3.5" /> View Details
        </Link>
        <button className="rounded-lg bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card">
          <Heart className="h-3.5 w-3.5 text-foreground" />
        </button>
        <button className="rounded-lg bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card">
          <GitCompareArrows className="h-3.5 w-3.5 text-foreground" />
        </button>
      </div>
    </div>
    <div className="p-5">
      <p className="text-xs font-medium text-primary">{vehicle.year} • {vehicle.bodyType}</p>
      <h3 className="mt-1 font-heading text-lg font-bold text-foreground">
        {vehicle.make} {vehicle.model}
      </h3>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> {formatMileage(vehicle.mileage)} mi</span>
        <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" /> {vehicle.fuel}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-heading text-xl font-bold text-foreground">{formatPrice(vehicle.price)}</span>
        <span className="text-xs text-muted-foreground">Est. {formatPrice(Math.round(vehicle.price / 72))}/mo</span>
      </div>
    </div>
  </motion.div>
);

export default VehicleCard;
