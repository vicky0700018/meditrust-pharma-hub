import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { defaultProducts, type Product } from "@/data/products";
import { defaultCategories, type Category } from "@/data/categories";
import { defaultServices, type Service } from "@/data/services";
import { defaultGallery, type GalleryImage } from "@/data/gallery";
import { defaultOrders, type Order } from "@/data/orders";
import { defaultEnquiries, type Enquiry } from "@/data/enquiries";
import { defaultSettings, type SiteSettings } from "@/data/siteSettings";
import type { CartLine } from "./commerce";

type Data = {
  products: Product[];
  categories: Category[];
  services: Service[];
  gallery: GalleryImage[];
  orders: Order[];
  enquiries: Enquiry[];
  settings: SiteSettings;
  cart: CartLine[];
  wishlist: string[];
  coupon: string;
  admin: boolean;
};

const KEY = "meditrust-demo-v1";

const defaults = (): Data => ({
  products: defaultProducts,
  categories: defaultCategories,
  services: defaultServices,
  gallery: defaultGallery,
  orders: defaultOrders,
  enquiries: defaultEnquiries,
  settings: defaultSettings,
  cart: [],
  wishlist: [],
  coupon: "",
  admin: false,
});

type Store = Data & {
  ready: boolean;
  set: <K extends keyof Data>(key: K, value: Data[K] | ((prev: Data[K]) => Data[K])) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  toggleWish: (id: string) => void;
  addEnquiry: (e: Omit<Enquiry, "id" | "date" | "status">) => string;
  resetDemo: () => void;
  toast: (msg: string) => void;
  toastMsg: string | null;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(defaults);
  const [ready, setReady] = useState(false);
  const [toastMsg, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Data>;
        setData((d) => ({ ...d, ...saved, settings: { ...d.settings, ...saved.settings, home: { ...d.settings.home, ...saved.settings?.home } } }));
      }
    } catch { /* ignore corrupt storage */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(data));
  }, [data, ready]);

  const set: Store["set"] = useCallback((key, value) => {
    setData((d) => ({ ...d, [key]: typeof value === "function" ? (value as (p: unknown) => unknown)(d[key]) : value }));
  }, []);

  const toast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo<Store>(() => ({
    ...data,
    ready,
    set,
    toast,
    toastMsg,
    addToCart: (id, qty = 1) => {
      set("cart", (c) => {
        const ex = c.find((l) => l.productId === id);
        return ex ? c.map((l) => (l.productId === id ? { ...l, qty: l.qty + qty } : l)) : [...c, { productId: id, qty }];
      });
      toast("Added to cart");
    },
    setQty: (id, qty) => set("cart", (c) => (qty <= 0 ? c.filter((l) => l.productId !== id) : c.map((l) => (l.productId === id ? { ...l, qty } : l)))),
    toggleWish: (id) => set("wishlist", (w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    addEnquiry: (e) => {
      const id = `ENQ-${Math.floor(3000 + Math.random() * 6999)}`;
      set("enquiries", (list) => [{ ...e, id, date: new Date().toISOString(), status: "New" }, ...list]);
      return id;
    },
    resetDemo: () => {
      localStorage.removeItem(KEY);
      setData({ ...defaults(), admin: true });
    },
  }), [data, ready, set, toast, toastMsg]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used within StoreProvider");
  return s;
}
