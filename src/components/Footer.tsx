import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border/50 bg-background">
    <div className="container-custom section-spacing">
      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-heading text-lg font-bold text-foreground">AutoElite</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Premium vehicles, exceptional service. Your dream car awaits.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold text-foreground">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {['Inventory', 'Financing', 'Trade-In', 'Contact'].map(l => (
              <Link key={l} to={`/${l.toLowerCase().replace('-', '-')}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold text-foreground">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> (555) 123-4567</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@autoelite.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Auto Drive, CA</span>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-heading text-sm font-semibold text-foreground">Hours</h4>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <span>Mon–Fri: 9am–8pm</span>
            <span>Saturday: 9am–6pm</span>
            <span>Sunday: 11am–5pm</span>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
        © 2024 AutoElite. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
