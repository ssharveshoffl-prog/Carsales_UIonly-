import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="pt-20">
      <div className="container-custom section-spacing">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="mt-3 text-muted-foreground">We'd love to hear from you. Visit us or send a message.</p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              { icon: MapPin, title: 'Visit Us', detail: '123 Auto Drive, Beverly Hills, CA 90210' },
              { icon: Phone, title: 'Call Us', detail: '(555) 123-4567' },
              { icon: Mail, title: 'Email', detail: 'info@autoelite.com' },
              { icon: Clock, title: 'Hours', detail: 'Mon–Fri 9am–8pm • Sat 9am–6pm • Sun 11am–5pm' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-border/50 card-surface p-5"
              >
                <div className="rounded-lg bg-primary/10 p-3">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 p-12 text-center">
                <div>
                  <CheckCircle className="mx-auto h-12 w-12 text-secondary" />
                  <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Message Sent!</h2>
                  <p className="mt-2 text-muted-foreground">We'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-5 rounded-2xl border border-border/50 card-surface p-6 md:p-8">
                <h2 className="font-heading text-xl font-bold text-foreground">Send a Message</h2>
                {[
                  { label: 'Name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', type: 'email', placeholder: 'you@example.com' },
                  { label: 'Phone', type: 'tel', placeholder: '(555) 000-0000' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="mb-2 block text-sm font-medium text-foreground">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      className="w-full rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
                  <textarea
                    rows={4}
                    placeholder="How can we help?"
                    required
                    className="w-full rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button type="submit" className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-medium text-primary-foreground">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
