import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Logo } from "./Logo";
import { CartIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from "./Icons";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cart, wishlist, settings } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const msgs = settings.home.announcements.filter(Boolean);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q: q.trim() || undefined } });
    setSearchOpen(false);
    setOpen(false);
  };

  return (
    <>
      {msgs.length > 0 && (
        <div className="overflow-hidden bg-navy text-navy-foreground text-[0.8rem]">
          <div className="marquee flex w-max gap-12 py-2 whitespace-nowrap">
            {[...msgs, ...msgs, ...msgs, ...msgs].map((m, i) => (
              <span key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{m}</span>
            ))}
          </div>
        </div>
      )}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container-x flex h-16 items-center gap-4 lg:h-[4.5rem]">
          <Link to="/" aria-label="Meditrust home" onClick={() => setOpen(false)}><Logo /></Link>
          <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Main">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="rounded-md px-3 py-2 text-[0.92rem] font-semibold text-foreground/80 hover:text-primary data-[status=active]:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button aria-label="Search products" onClick={() => setSearchOpen((v) => !v)} className="rounded-md p-2.5 hover:bg-muted"><SearchIcon /></button>
            <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative rounded-md p-2.5 hover:bg-muted">
              <HeartIcon />
              {wishlist.length > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.65rem] font-bold text-accent-foreground">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative rounded-md p-2.5 hover:bg-muted">
              <CartIcon />
              {count > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">{count}</span>}
            </Link>
            <Link to="/products" className="btn btn-primary ml-2 hidden md:inline-flex">Explore Products</Link>
            <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="rounded-md p-2.5 hover:bg-muted lg:hidden">
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <form onSubmit={submit} className="border-t bg-surface">
            <div className="container-x flex gap-2 py-3">
              <label htmlFor="site-search" className="sr-only">Search products</label>
              <input id="site-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search thermometers, gloves, first aid…" className="input" />
              <button className="btn btn-primary">Search</button>
            </div>
          </form>
        )}
        {open && (
          <nav className="border-t bg-background lg:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col py-3">
              {navItems.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
                  className="rounded-md px-3 py-3 font-semibold hover:bg-muted data-[status=active]:text-primary">{n.label}</Link>
              ))}
              <Link to="/products" onClick={() => setOpen(false)} className="btn btn-primary mt-2">Explore Products</Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
