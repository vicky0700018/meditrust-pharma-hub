import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { canBuyDirectly, computeTotals, formatPrice } from "@/lib/commerce";
import { SafeImg } from "@/components/SafeImg";
import { Notice } from "@/components/ui";
import { CartIcon, TrashIcon } from "@/components/Icons";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Meditrust Life Science" },
      { name: "description", content: "Review the healthcare products in your demo cart." },
      { property: "og:title", content: "Cart — Meditrust" },
      { property: "og:description", content: "Demo shopping cart." },
    ],
  }),
  component: Cart,
});

export function useTotals() {
  const { cart, products, settings, coupon } = useStore();
  const c = settings.coupons.find((x) => x.code === coupon.toUpperCase());
  return { ...computeTotals(cart, products, { shippingThreshold: settings.shippingThreshold, shippingFee: settings.shippingFee, couponPercent: c?.percent ?? 0 }), couponObj: c };
}

function Cart() {
  const { cart, products, setQty, settings, coupon, set } = useStore();
  const t = useTotals();
  const [code, setCode] = useState(coupon);
  const [err, setErr] = useState("");
  const blocked = cart.map((l) => products.find((p) => p.id === l.productId)).filter((p) => p && !canBuyDirectly(p));
  const cur = settings.currency;

  const apply = () => {
    const c = settings.coupons.find((x) => x.code === code.trim().toUpperCase());
    if (!c) { setErr("Invalid coupon code"); return; }
    setErr(""); set("coupon", c.code);
  };

  if (t.items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint text-primary"><CartIcon size={30} /></div>
        <h1 className="mt-5 text-3xl font-bold text-navy">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our healthcare catalogue to add products.</p>
        <Link to="/products" className="btn btn-primary mt-6">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      <h1 className="text-3xl font-extrabold text-navy">Shopping cart</h1>
      {blocked.length > 0 && <div className="mt-4"><Notice>Some items need prescription verification or a quote and were excluded from checkout. Please use Request Information on those products.</Notice></div>}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y rounded-xl border">
          {t.items.map(({ line, product: p }) => (
            <li key={p.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <SafeImg src={p.images[0]} alt={p.name} className="h-24 w-24 shrink-0 rounded-lg" />
              <div className="flex-1">
                <Link to="/products/$id" params={{ id: p.id }} className="font-bold text-navy hover:text-primary">{p.name}</Link>
                <p className="text-sm text-muted-foreground">{formatPrice(p.price, cur)} each · {p.packSize}</p>
              </div>
              <div className="flex items-center rounded-lg border">
                <button aria-label={`Decrease ${p.name}`} onClick={() => setQty(p.id, line.qty - 1)} className="px-3 py-1.5 text-lg">−</button>
                <span className="w-10 text-center font-semibold">{line.qty}</span>
                <button aria-label={`Increase ${p.name}`} onClick={() => setQty(p.id, Math.min(p.stock, line.qty + 1))} className="px-3 py-1.5 text-lg">+</button>
              </div>
              <p className="w-24 font-bold text-navy sm:text-right">{formatPrice(p.price * line.qty, cur)}</p>
              <button aria-label={`Remove ${p.name}`} onClick={() => setQty(p.id, 0)} className="rounded-md p-2 text-muted-foreground hover:text-destructive"><TrashIcon size={18} /></button>
            </li>
          ))}
        </ul>
        <aside className="card h-fit p-6">
          <h2 className="text-lg font-bold text-navy">Order summary</h2>
          <div className="mt-4 flex gap-2">
            <label htmlFor="coupon" className="sr-only">Coupon code</label>
            <input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon (try HEALTH10)" className="input" />
            <button onClick={apply} className="btn btn-outline">Apply</button>
          </div>
          {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
          {t.couponObj && <p className="mt-2 flex items-center justify-between text-xs text-success">Coupon {t.couponObj.code} applied ({t.couponObj.percent}% off)<button onClick={() => { set("coupon", ""); setCode(""); }} className="underline">Remove</button></p>}
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(t.subtotal, cur)}</dd></div>
            {t.discount > 0 && <div className="flex justify-between text-success"><dt>Discount</dt><dd>−{formatPrice(t.discount, cur)}</dd></div>}
            <div className="flex justify-between"><dt>Shipping</dt><dd>{t.shipping === 0 ? "Free" : formatPrice(t.shipping, cur)}</dd></div>
            <div className="flex justify-between border-t pt-3 text-base font-bold text-navy"><dt>Total</dt><dd>{formatPrice(t.total, cur)}</dd></div>
          </dl>
          <p className="mt-2 text-xs text-muted-foreground">Free demo shipping on orders over {formatPrice(settings.shippingThreshold, cur)}.</p>
          <Link to="/checkout" className="btn btn-primary mt-5 w-full py-3">Proceed to Checkout</Link>
          <Link to="/products" className="btn btn-outline mt-2 w-full">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
}
