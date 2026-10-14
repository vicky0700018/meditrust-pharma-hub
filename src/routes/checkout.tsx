import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/commerce";
import { Notice } from "@/components/ui";
import { CheckIcon } from "@/components/Icons";
import { useTotals } from "@/lib/useTotals";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Demo Checkout — Meditrust Life Science" },
      { name: "description", content: "Complete a demo order. No payment is collected." },
      { property: "og:title", content: "Demo Checkout — Meditrust" },
      { property: "og:description", content: "Demo checkout without real payment." },
    ],
  }),
  component: Checkout,
});

const fields = [
  ["name", "Customer name"], ["email", "Email"], ["phone", "Phone"], ["address", "Delivery address"],
  ["city", "City"], ["state", "State"], ["postal", "Postal code"],
] as const;
type K = (typeof fields)[number][0];

function Checkout() {
  const { set, settings, coupon } = useStore();
  const t = useTotals();
  const [v, setV] = useState<Record<K, string>>({ name: "", email: "", phone: "", address: "", city: "", state: "Maharashtra", postal: "" });
  const [err, setErr] = useState<Partial<Record<K, string>>>({});
  const [orderId, setOrderId] = useState<string | null>(null);
  const cur = settings.currency;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<K, string>> = {};
    for (const [k, l] of fields) if (!v[k].trim()) er[k] = `${l} is required`;
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) er.email = "Enter a valid email";
    if (v.phone && !/^[0-9+\-\s]{7,15}$/.test(v.phone)) er.phone = "Enter a valid phone number";
    if (v.postal && !/^\d{6}$/.test(v.postal)) er.postal = "Enter a 6-digit PIN code";
    setErr(er);
    if (Object.keys(er).length || t.items.length === 0) return;
    const id = `DEMO-${Math.floor(100000 + Math.random() * 899999)}`;
    set("orders", (o) => [{
      id, date: new Date().toISOString(), customer: { ...v },
      items: t.items.map(({ product, line }) => ({ productId: product.id, name: product.name, price: product.price, qty: line.qty })),
      subtotal: t.subtotal, discount: t.discount, shipping: t.shipping, total: t.total,
      paymentStatus: "Demo – Not Collected", status: "Pending",
    }, ...o]);
    set("cart", []);
    set("coupon", "");
    setOrderId(id);
  };

  if (orderId) {
    return (
      <div className="container-x max-w-xl py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-success-foreground"><CheckIcon size={32} /></div>
        <h1 className="mt-5 text-3xl font-bold text-navy">Demo order placed</h1>
        <p className="mt-2 text-muted-foreground">Your fictional order ID is</p>
        <p className="mt-1 font-display text-2xl font-extrabold text-primary">{orderId}</p>
        <p className="mt-4 text-sm text-muted-foreground">This is a demo order. No payment was collected and nothing will be shipped.</p>
        <Link to="/products" className="btn btn-primary mt-6">Continue Shopping</Link>
      </div>
    );
  }

  if (t.items.length === 0) {
    return <div className="container-x py-24 text-center"><h1 className="text-2xl font-bold text-navy">Nothing to check out</h1><Link to="/products" className="btn btn-primary mt-6">Browse products</Link></div>;
  }

  return (
    <div className="container-x py-12">
      <h1 className="text-3xl font-extrabold text-navy">Demo checkout</h1>
      <div className="mt-4"><Notice>Demo checkout only — no payment details are collected and no payment gateway is connected. Prescription-only items cannot be ordered here.</Notice></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} noValidate className="card grid gap-4 p-6 sm:grid-cols-2">
          {fields.map(([k, l]) => (
            <div key={k} className={k === "address" ? "sm:col-span-2" : ""}>
              <label htmlFor={`co-${k}`} className="label">{l} <span className="text-destructive">*</span></label>
              <input id={`co-${k}`} type={k === "email" ? "email" : k === "phone" ? "tel" : "text"} maxLength={160} value={v[k]} aria-invalid={!!err[k]} onChange={(e) => setV((s) => ({ ...s, [k]: e.target.value }))} className="input" />
              {err[k] && <p className="mt-1 text-xs text-destructive">{err[k]}</p>}
            </div>
          ))}
          <button className="btn btn-primary py-3 sm:col-span-2">Place Demo Order · {formatPrice(t.total, cur)}</button>
        </form>
        <aside className="card h-fit p-6">
          <h2 className="font-bold text-navy">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {t.items.map(({ product: p, line }) => <li key={p.id} className="flex justify-between gap-3"><span>{p.name} × {line.qty}</span><span>{formatPrice(p.price * line.qty, cur)}</span></li>)}
          </ul>
          <dl className="mt-4 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(t.subtotal, cur)}</dd></div>
            {t.discount > 0 && <div className="flex justify-between text-success"><dt>Discount ({coupon})</dt><dd>−{formatPrice(t.discount, cur)}</dd></div>}
            <div className="flex justify-between"><dt>Shipping</dt><dd>{t.shipping === 0 ? "Free" : formatPrice(t.shipping, cur)}</dd></div>
            <div className="flex justify-between border-t pt-3 text-base font-bold text-navy"><dt>Final total</dt><dd>{formatPrice(t.total, cur)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
