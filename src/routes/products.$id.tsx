import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { canBuyDirectly } from "@/lib/commerce";
import { PriceLabel, ProductCard, StockBadge } from "@/components/ProductCard";
import { SafeImg } from "@/components/SafeImg";
import { EnquiryForm, Notice } from "@/components/ui";
import { CartIcon, HeartIcon, RxIcon } from "@/components/Icons";

export const Route = createFileRoute("/products/$id")({
  head: () => ({
    meta: [
      { title: "Product Details — Meditrust Life Science" },
      { name: "description", content: "Product specifications, pack size, availability and enquiry options." },
      { property: "og:title", content: "Product Details — Meditrust Life Science" },
      { property: "og:description", content: "Healthcare product specifications and enquiry." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { products, categories, wishlist, toggleWish, addToCart } = useStore();
  const p = products.find((x) => x.id === id && x.visible);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  if (!p) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-bold text-navy">Product not found</h1>
        <Link to="/products" className="btn btn-primary mt-6">Back to products</Link>
      </div>
    );
  }
  const cat = categories.find((c) => c.id === p.category);
  const related = products.filter((x) => x.visible && x.category === p.category && x.id !== p.id).slice(0, 4);
  const direct = canBuyDirectly(p);
  const wished = wishlist.includes(p.id);

  return (
    <div className="container-x py-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/products" className="hover:text-primary">Products</Link> / {cat && <><Link to="/products" search={{ cat: cat.id }} className="hover:text-primary">{cat.name}</Link> / </>}<span className="text-foreground">{p.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="card overflow-hidden"><SafeImg src={p.images[active] ?? p.images[0]} alt={p.name} className="aspect-[4/3] w-full" /></div>
          {p.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {p.images.map((src, i) => (
                <button key={src + i} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} className={`overflow-hidden rounded-lg border-2 ${i === active ? "border-primary" : "border-transparent"}`}>
                  <SafeImg src={src} alt={`${p.name} view ${i + 1}`} className="aspect-square w-full" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="eyebrow">{cat?.name}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">{p.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3"><PriceLabel p={p} /><StockBadge p={p} /></div>
          {p.rx && (
            <div className="mt-5 flex gap-3 rounded-lg border border-navy/20 bg-surface p-4 text-sm">
              <RxIcon className="mt-0.5 shrink-0 text-navy" />
              <div><p className="font-bold text-navy">Prescription / Verification Required</p><p className="mt-1 text-muted-foreground">This listing cannot be purchased directly. Submit a Request Information enquiry; supply is subject to valid prescription and professional verification.</p></div>
            </div>
          )}
          <p className="mt-5 leading-relaxed text-muted-foreground">{p.description}</p>
          <dl className="mt-6 divide-y rounded-xl border text-sm">
            {[["Brand", p.brand], ["Pack size", p.packSize], ["Availability", p.stock > 0 ? `${p.stock} units (demo)` : "Currently unavailable (demo)"], ...Object.entries(p.specs)].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-3 px-4 py-2.5"><dt className="font-semibold text-navy">{k}</dt><dd className="text-muted-foreground">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {direct && (
              <>
                <div className="flex items-center rounded-lg border">
                  <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg">−</button>
                  <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(p.stock, q + 1))} className="px-3 py-2 text-lg">+</button>
                </div>
                <button onClick={() => addToCart(p.id, qty)} className="btn btn-primary px-6 py-3"><CartIcon size={18} />Add to Cart</button>
              </>
            )}
            <a href="#enquiry" className="btn btn-navy px-6 py-3">{p.rx ? "Request Information" : "Send Enquiry"}</a>
            <button onClick={() => toggleWish(p.id)} aria-pressed={wished} className="btn btn-outline py-3"><HeartIcon size={18} filled={wished} />{wished ? "Wishlisted" : "Wishlist"}</button>
          </div>
          <div className="mt-6"><Notice>Demo listing. Prices, availability, regulatory status and prescription requirements must be verified before launch. This website does not provide medical advice or diagnosis.</Notice></div>
        </div>
      </div>

      <section id="enquiry" className="card mt-14 scroll-mt-24 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-navy">{p.rx ? "Request Information" : "Product Enquiry"}</h2>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">Enquiring about: <span className="font-semibold text-foreground">{p.name}</span></p>
        <EnquiryForm source="Product" defaultType={p.name} submitLabel={p.rx ? "Request Information" : "Send Enquiry"} fields={[
          { name: "name", label: "Full Name", required: true },
          { name: "organization", label: "Organization (optional)" },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Phone", type: "tel", required: true },
          { name: "message", label: "Message", textarea: true, required: true },
        ]} />
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-navy">Related products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
