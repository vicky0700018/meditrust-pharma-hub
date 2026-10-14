import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { canBuyDirectly, formatPrice } from "@/lib/commerce";
import { SafeImg } from "./SafeImg";
import { CartIcon, HeartIcon, RxIcon } from "./Icons";

export function StockBadge({ p }: { p: Product }) {
  if (p.stock <= 0) return <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">Out of stock</span>;
  if (p.stock < 10) return <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-semibold text-warning-foreground">Low stock ({p.stock})</span>;
  return <span className="rounded-full bg-success/12 px-2 py-0.5 text-xs font-semibold text-success">In stock</span>;
}

export function PriceLabel({ p }: { p: Product }) {
  const { settings } = useStore();
  if (p.rx || p.enquiryOnly || p.price <= 0) return <span className="text-sm font-semibold text-navy">Price on enquiry</span>;
  return <span className="font-display text-lg font-bold text-navy">{formatPrice(p.price, settings.currency)}<span className="ml-1 text-[0.65rem] font-medium text-muted-foreground">demo</span></span>;
}

export function ProductCard({ p }: { p: Product }) {
  const { categories, wishlist, toggleWish, addToCart } = useStore();
  const cat = categories.find((c) => c.id === p.category);
  const wished = wishlist.includes(p.id);
  const direct = canBuyDirectly(p);
  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Link to="/products/$id" params={{ id: p.id }} aria-label={p.name}>
          <SafeImg src={p.images[0]} alt={p.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <button onClick={() => toggleWish(p.id)} aria-pressed={wished} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/95 shadow-card ${wished ? "text-destructive" : "text-foreground/70 hover:text-destructive"}`}>
          <HeartIcon size={18} filled={wished} />
        </button>
        {p.rx && <span className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-navy px-2 py-1 text-[0.68rem] font-bold text-navy-foreground"><RxIcon size={13} />Prescription / Verification Required</span>}
        {!p.rx && p.featured && <span className="absolute left-3 top-3 rounded-md bg-accent px-2 py-1 text-[0.68rem] font-bold text-accent-foreground">Featured</span>}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold text-primary">{cat?.name ?? "Healthcare"}</p>
        <h3 className="mt-1 font-display text-[1.02rem] font-bold leading-snug text-navy">
          <Link to="/products/$id" params={{ id: p.id }} className="hover:text-primary">{p.name}</Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2"><PriceLabel p={p} /><StockBadge p={p} /></div>
        <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
          <Link to="/products/$id" params={{ id: p.id }} className="btn btn-outline px-2 text-sm">View Details</Link>
          {direct ? (
            <button onClick={() => addToCart(p.id)} className="btn btn-primary px-2 text-sm"><CartIcon size={16} />Add to Cart</button>
          ) : (
            <Link to="/products/$id" params={{ id: p.id }} hash="enquiry" className="btn btn-navy px-2 text-sm">{p.rx ? "Request Info" : p.stock <= 0 && !p.enquiryOnly ? "Notify / Enquire" : "Request a Quote"}</Link>
          )}
        </div>
      </div>
    </article>
  );
}
