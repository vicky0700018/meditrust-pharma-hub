export type OrderStatus = "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export const orderStatuses: OrderStatus[] = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

export type OrderItem = { productId: string; name: string; price: number; qty: number };
export type Order = {
  id: string;
  date: string;
  customer: { name: string; email: string; phone: string; address: string; city: string; state: string; postal: string };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentStatus: "Demo – Not Collected" | "Demo – Paid";
  status: OrderStatus;
};

const c = (name: string, city: string) => ({ name, email: `${name.split(" ")[0].toLowerCase()}@example.com`, phone: "9000000000", address: "Demo Street 1", city, state: "Maharashtra", postal: "411001" });

export const defaultOrders: Order[] = [
  { id: "DEMO-10421", date: "2026-09-28T10:20:00Z", customer: c("Riya Demo", "Pune"), items: [{ productId: "p002", name: "Digital Blood Pressure Monitor", price: 1899, qty: 1 }], subtotal: 1899, discount: 0, shipping: 0, total: 1899, paymentStatus: "Demo – Paid", status: "Delivered" },
  { id: "DEMO-10422", date: "2026-10-02T14:05:00Z", customer: c("Arjun Sample", "Mumbai"), items: [{ productId: "p018", name: "Disposable Medical Gloves", price: 399, qty: 3 }, { productId: "p019", name: "Surgical Face Masks", price: 199, qty: 2 }], subtotal: 1595, discount: 0, shipping: 0, total: 1595, paymentStatus: "Demo – Paid", status: "Shipped" },
  { id: "DEMO-10423", date: "2026-10-06T09:40:00Z", customer: c("Neha Test", "Nashik"), items: [{ productId: "p008", name: "First Aid Kit", price: 799, qty: 1 }], subtotal: 799, discount: 0, shipping: 60, total: 859, paymentStatus: "Demo – Not Collected", status: "Processing" },
  { id: "DEMO-10424", date: "2026-10-09T17:15:00Z", customer: c("Vikram Placeholder", "Nagpur"), items: [{ productId: "p025", name: "Wheelchair", price: 7499, qty: 1 }], subtotal: 7499, discount: 750, shipping: 0, total: 6749, paymentStatus: "Demo – Not Collected", status: "Confirmed" },
  { id: "DEMO-10425", date: "2026-10-12T11:00:00Z", customer: c("Sana Example", "Pune"), items: [{ productId: "p001", name: "Digital Thermometer", price: 249, qty: 2 }], subtotal: 498, discount: 0, shipping: 60, total: 558, paymentStatus: "Demo – Not Collected", status: "Pending" },
];
