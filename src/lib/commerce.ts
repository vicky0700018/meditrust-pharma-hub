import type { Product } from "@/data/products";

export type CartLine = { productId: string; qty: number };

/** Products that may be bought directly (prescription & enquiry-only listings must go through enquiry). */
export function canBuyDirectly(p: Product): boolean {
  return !p.rx && !p.enquiryOnly && p.price > 0 && p.stock > 0 && p.visible;
}

export function computeTotals(
  lines: CartLine[],
  products: Product[],
  opts: { shippingThreshold: number; shippingFee: number; couponPercent: number },
) {
  const items = lines
    .map((l) => ({ line: l, product: products.find((p) => p.id === l.productId) }))
    .filter((x): x is { line: CartLine; product: Product } => !!x.product && canBuyDirectly(x.product));
  const subtotal = items.reduce((s, x) => s + x.product.price * x.line.qty, 0);
  const discount = Math.round((subtotal * opts.couponPercent) / 100);
  const afterDiscount = subtotal - discount;
  const shipping = subtotal === 0 || afterDiscount >= opts.shippingThreshold ? 0 : opts.shippingFee;
  return { items, subtotal, discount, shipping, total: afterDiscount + shipping };
}

export function formatPrice(v: number, currency = "₹") {
  return `${currency}${v.toLocaleString("en-IN")}`;
}
