import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { vehicles } from '@/data/vehicles';
import VehicleCard from '@/components/VehicleCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const sortOptions = ['Price: Low', 'Price: High', 'Mileage: Low', 'Newest'];

const allMakes = [...new Set(vehicles.map(v => v.make))].sort();
const allBodyTypes = [...new Set(vehicles.map(v => v.bodyType))].sort();
const allFuelTypes = [...new Set(vehicles.map(v => v.fuel))].sort();
const allDrivetrains = [...new Set(vehicles.map(v => v.drivetrain))].sort();
const priceRange = [Math.min(...vehicles.map(v => v.price)), Math.max(...vehicles.map(v => v.price))];
const yearRange = [Math.min(...vehicles.map(v => v.year)), Math.max(...vehicles.map(v => v.year))];

const FilterSection = ({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/30 pb-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground">
        {title}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
};

const Inventory = () => {
  const [sort, setSort] = useState('Newest');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filters
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedDrivetrains, setSelectedDrivetrains] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<number[]>([priceRange[0], priceRange[1]]);
  const [yearFilter, setYearFilter] = useState<number[]>([yearRange[0], yearRange[1]]);

  const toggleItem = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setArr(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const filtered = vehicles.filter(v => {
    if (query && !`${v.make} ${v.model}`.toLowerCase().includes(query.toLowerCase())) return false;
    if (selectedMakes.length && !selectedMakes.includes(v.make)) return false;
    if (selectedBodyTypes.length && !selectedBodyTypes.includes(v.bodyType)) return false;
    if (selectedFuelTypes.length && !selectedFuelTypes.includes(v.fuel)) return false;
    if (selectedDrivetrains.length && !selectedDrivetrains.includes(v.drivetrain)) return false;
    if (v.price < priceFilter[0] || v.price > priceFilter[1]) return false;
    if (v.year < yearFilter[0] || v.year > yearFilter[1]) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'Price: Low') return a.price - b.price;
    if (sort === 'Price: High') return b.price - a.price;
    if (sort === 'Mileage: Low') return a.mileage - b.mileage;
    return b.year - a.year;
  });

  const activeFilterCount = [selectedMakes, selectedBodyTypes, selectedFuelTypes, selectedDrivetrains].filter(a => a.length > 0).length
    + (priceFilter[0] !== priceRange[0] || priceFilter[1] !== priceRange[1] ? 1 : 0)
    + (yearFilter[0] !== yearRange[0] || yearFilter[1] !== yearRange[1] ? 1 : 0);

  const clearFilters = () => {
    setSelectedMakes([]);
    setSelectedBodyTypes([]);
    setSelectedFuelTypes([]);
    setSelectedDrivetrains([]);
    setPriceFilter([priceRange[0], priceRange[1]]);
    setYearFilter([yearRange[0], yearRange[1]]);
    setQuery('');
  };

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (loading || visible >= filtered.length) return;
    setLoading(true);
    setTimeout(() => {
      setVisible(v => v + 6);
      setLoading(false);
    }, 600);
  }, [loading, visible, filtered.length]);

  useEffect(() => { setVisible(12); }, [selectedMakes, selectedBodyTypes, selectedFuelTypes, selectedDrivetrains, priceFilter, yearFilter, query]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    }, { threshold: 0.1 });
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  return (
    <main className="pt-20">
      <div className="container-custom section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              Our <span className="text-gradient">Inventory</span>
            </h1>
            <p className="mt-3 text-muted-foreground">{filtered.length} vehicles available</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{activeFilterCount}</span>
            )}
          </button>
        </motion.div>

        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-2">
          <Search className="ml-3 h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by make or model..."
            className="flex-1 bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="mr-2 rounded-lg p-1 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-8 flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${sidebarOpen ? 'block' : 'hidden'} w-full shrink-0 md:block md:w-64`}>
            <div className="sticky top-24 space-y-4 rounded-2xl border border-border/50 bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-foreground">Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline">Clear all</button>
                )}
              </div>

              <FilterSection title="Price Range">
                <Slider
                  min={priceRange[0]}
                  max={priceRange[1]}
                  step={1000}
                  value={priceFilter}
                  onValueChange={setPriceFilter}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${priceFilter[0].toLocaleString()}</span>
                  <span>${priceFilter[1].toLocaleString()}</span>
                </div>
              </FilterSection>

              <FilterSection title="Make">
                {allMakes.map(make => (
                  <label key={make} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <Checkbox
                      checked={selectedMakes.includes(make)}
                      onCheckedChange={() => toggleItem(selectedMakes, setSelectedMakes, make)}
                    />
                    {make}
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Body Type">
                {allBodyTypes.map(bt => (
                  <label key={bt} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <Checkbox
                      checked={selectedBodyTypes.includes(bt)}
                      onCheckedChange={() => toggleItem(selectedBodyTypes, setSelectedBodyTypes, bt)}
                    />
                    {bt}
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Fuel Type">
                {allFuelTypes.map(ft => (
                  <label key={ft} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <Checkbox
                      checked={selectedFuelTypes.includes(ft)}
                      onCheckedChange={() => toggleItem(selectedFuelTypes, setSelectedFuelTypes, ft)}
                    />
                    {ft}
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Drivetrain">
                {allDrivetrains.map(dt => (
                  <label key={dt} className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <Checkbox
                      checked={selectedDrivetrains.includes(dt)}
                      onCheckedChange={() => toggleItem(selectedDrivetrains, setSelectedDrivetrains, dt)}
                    />
                    {dt}
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Year" defaultOpen={false}>
                <Slider
                  min={yearRange[0]}
                  max={yearRange[1]}
                  step={1}
                  value={yearFilter}
                  onValueChange={setYearFilter}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{yearFilter[0]}</span>
                  <span>{yearFilter[1]}</span>
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {selectedMakes.map(m => (
                  <span key={m} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {m} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleItem(selectedMakes, setSelectedMakes, m)} />
                  </span>
                ))}
                {selectedBodyTypes.map(b => (
                  <span key={b} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {b} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleItem(selectedBodyTypes, setSelectedBodyTypes, b)} />
                  </span>
                ))}
              </div>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="rounded-lg border border-border/50 bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {sortOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, visible).map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">No vehicles match your filters.</p>
                <button onClick={clearFilters} className="mt-4 text-sm text-primary hover:underline">Clear all filters</button>
              </div>
            )}

            {/* Infinite scroll sentinel */}
            {visible < filtered.length && (
              <>
                <div ref={sentinelRef} className="h-4" />
                {loading && (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="skeleton-shimmer aspect-[4/3] rounded-xl" />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Inventory;
