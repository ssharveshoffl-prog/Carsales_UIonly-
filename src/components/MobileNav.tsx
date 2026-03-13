import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Phone, Menu } from 'lucide-react';

const items = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/inventory', icon: Search, label: 'Search' },
  { to: '/compare', icon: Heart, label: 'Saved' },
  { to: '/contact', icon: Phone, label: 'Contact' },
  { to: '/financing', icon: Menu, label: 'More' },
];

const MobileNav = () => {
  const location = useLocation();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 px-3 py-1 text-xs transition-colors ${
              location.pathname === to ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
