import { useStore } from "./store";
import { computeTotals } from "./commerce";

export function useTotals() {
  const { cart, products, settings, coupon } = useStore();
  const c = settings.coupons.find((x) => x.code === coupon.toUpperCase());
  return { ...computeTotals(cart, products, { shippingThreshold: settings.shippingThreshold, shippingFee: settings.shippingFee, couponPercent: c?.percent ?? 0 }), couponObj: c };
}
