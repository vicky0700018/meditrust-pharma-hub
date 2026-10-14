import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Logo } from "./Logo";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

export function Footer() {
  const { settings, categories } = useStore();
  const cats = categories.filter((c) => c.active).sort((a, b) => a.order - b.order).slice(0, 6);
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/75">
            {settings.businessName} — pharmaceutical products, medical supplies and healthcare essentials, with clear product information and simple enquiries.
          </p>
          <p className="mt-4 text-xs text-navy-foreground/60">Demo website. Prices, stock and listings are illustrative and must be verified before launch.</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li><Link to="/products" className="hover:text-navy-foreground">Products</Link></li>
            <li><Link to="/categories" className="hover:text-navy-foreground">Categories</Link></li>
            <li><Link to="/services" className="hover:text-navy-foreground">Services</Link></li>
            <li><Link to="/about" className="hover:text-navy-foreground">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-navy-foreground">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-navy-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Categories</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            {cats.map((c) => (
              <li key={c.id}><Link to="/products" search={{ cat: c.id }} className="hover:text-navy-foreground">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/80">
            <li className="flex gap-2"><PinIcon size={18} className="mt-0.5 shrink-0" />{settings.address}</li>
            <li className="flex gap-2"><PhoneIcon size={18} className="shrink-0" /><a href={`tel:${settings.phone}`} className="hover:text-navy-foreground">{settings.phone}</a></li>
            <li className="flex gap-2"><MailIcon size={18} className="shrink-0" /><a href={`mailto:${settings.email}`} className="break-all hover:text-navy-foreground">{settings.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15">
        <div className="container-x flex flex-col gap-4 py-5 text-xs text-navy-foreground/70 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {settings.footerLinks.map((l) => <a key={l.label} href={l.to} className="hover:text-navy-foreground">{l.label}</a>)}
            <Link to="/admin" className="hover:text-navy-foreground">Admin Login</Link>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <span>© 2026 {settings.businessName}</span>
            {settings.showCredit && <span className="font-semibold text-navy-foreground">Designed and development by SOSynch Ai Tech</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
