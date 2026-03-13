import { motion } from 'framer-motion';
import { vehicles } from '@/data/vehicles';
import VehicleCard from './VehicleCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedGrid = () => (
  <section className="section-spacing">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex items-end justify-between"
      >
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Latest Arrivals</h2>
          <p className="mt-2 text-muted-foreground">Fresh additions to our premium inventory</p>
        </div>
        <Link to="/inventory" className="hidden items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:flex">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.slice(0, 6).map((v, i) => (
          <VehicleCard key={v.id} vehicle={v} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedGrid;
