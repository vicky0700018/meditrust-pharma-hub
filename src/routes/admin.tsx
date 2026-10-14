import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/commerce";
import { Logo } from "@/components/Logo";
import { Crud } from "@/components/admin/Crud";
import { SafeImg } from "@/components/SafeImg";
import { MenuIcon, CloseIcon } from "@/components/Icons";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";
import type { Service } from "@/data/services";
import { galleryCategories, type GalleryImage } from "@/data/gallery";
import { orderStatuses, type OrderStatus } from "@/data/orders";
import { enquiryStatuses, type EnquiryStatus } from "@/data/enquiries";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard (Demo) — Meditrust Life Science" },
      { name: "description", content: "Frontend-only demo admin panel for managing the Meditrust catalogue." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin (Demo) — Meditrust" },
      { property: "og:description", content: "Demo admin panel." },
    ],
  }),
  component: Admin,
});

const DEMO_EMAIL = "admin@meditrust-demo.com";
const DEMO_PASS = "Admin@123";

const tabs = ["Dashboard", "Products", "Categories", "Services", "Orders", "Enquiries", "Gallery", "Homepage", "Settings"] as const;
type Tab = (typeof tabs)[number];

function Admin() {
  const s = useStore();
  const [tab, setTab] = useState<Tab>("Dashboard");
  const [nav, setNav] = useState(false);
  if (!s.ready) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  if (!s.admin) return <Login />;

  return (
    <div className="min-h-screen bg-surface lg:grid lg:grid-cols-[240px_1fr]">
      <aside className={`${nav ? "block" : "hidden"} fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-navy p-5 text-navy-foreground lg:static lg:block lg:w-auto`}>
        <div className="flex items-center justify-between"><Logo light /><button className="lg:hidden" aria-label="Close menu" onClick={() => setNav(false)}><CloseIcon /></button></div>
        <p className="mt-2 text-xs text-navy-foreground/60">Demo admin panel</p>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Admin">
          {tabs.map((t) => (
            <button key={t} onClick={() => { setTab(t); setNav(false); }} className={`rounded-md px-3 py-2 text-left text-sm font-semibold ${tab === t ? "bg-primary text-primary-foreground" : "text-navy-foreground/80 hover:bg-navy-foreground/10"}`}>{t}</button>
          ))}
        </nav>
        <div className="mt-8 space-y-2">
          <Link to="/" className="btn btn-ghost-light w-full text-sm">View website</Link>
          <button onClick={() => s.set("admin", false)} className="btn btn-ghost-light w-full text-sm">Log out</button>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex items-center justify-between border-b bg-background px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" aria-label="Open menu" onClick={() => setNav(true)}><MenuIcon /></button>
            <h1 className="text-lg font-bold text-navy">{tab}</h1>
          </div>
          <ResetButton />
        </header>
        <div className="border-b bg-warning/10 px-4 py-2 text-xs text-warning-foreground lg:px-8">Demo only: data is stored locally in this browser and is not synchronised across devices. This login is not secure production authentication.</div>
        <div className="p-4 lg:p-8">
          {tab === "Dashboard" && <Dashboard go={setTab} />}
          {tab === "Products" && <Products />}
          {tab === "Categories" && <Categories />}
          {tab === "Services" && <Services />}
          {tab === "Orders" && <Orders />}
          {tab === "Enquiries" && <Enquiries />}
          {tab === "Gallery" && <Gallery />}
          {tab === "Homepage" && <Homepage />}
          {tab === "Settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}

function Login() {
  const { set } = useStore();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === DEMO_EMAIL && pass === DEMO_PASS) set("admin", true);
    else setErr("Incorrect email or password.");
  };
  return (
    <div className="grid min-h-screen place-items-center bg-surface p-4">
      <form onSubmit={submit} className="card w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-6 text-2xl font-bold text-navy">Admin login</h1>
        <div className="mt-4 rounded-lg bg-mint p-3 text-sm">
          <p className="font-semibold text-navy">Demo credentials</p>
          <p>Email: <code>{DEMO_EMAIL}</code></p>
          <p>Password: <code>{DEMO_PASS}</code></p>
        </div>
        <label htmlFor="ae" className="label mt-5">Email</label>
        <input id="ae" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        <label htmlFor="ap" className="label mt-4">Password</label>
        <input id="ap" type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="input" />
        {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
        <button className="btn btn-primary mt-6 w-full">Log in</button>
        <p className="mt-4 text-xs text-muted-foreground">Frontend-only demo login. Not secure production authentication.</p>
        <Link to="/" className="mt-4 block text-center text-sm text-primary">← Back to website</Link>
      </form>
    </div>
  );
}

function ResetButton() {
  const { resetDemo, toast } = useStore();
  const [ask, setAsk] = useState(false);
  return (
    <>
      <button onClick={() => setAsk(true)} className="btn btn-outline text-sm">Reset Demo Data</button>
      {ask && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/50 p-4" role="alertdialog" aria-modal="true" aria-labelledby="reset-t">
          <div className="w-full max-w-sm rounded-xl bg-background p-6 shadow-lift">
            <h2 id="reset-t" className="text-lg font-bold text-navy">Reset all demo data?</h2>
            <p className="mt-2 text-sm text-muted-foreground">All products, categories, orders, enquiries, gallery and settings changes stored in this browser will be replaced with the original demo data.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setAsk(false)} className="btn btn-outline">Cancel</button>
              <button onClick={() => { resetDemo(); setAsk(false); toast("Demo data reset"); }} className="btn btn-danger">Reset</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Stat({ label, value, onClick }: { label: string; value: number | string; onClick?: () => void }) {
  return <button onClick={onClick} className="card p-5 text-left hover:shadow-lift"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 font-display text-3xl font-extrabold text-navy">{value}</p></button>;
}

function Badge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "ok" | "warn" | "info" | "bad" }) {
  const c = { muted: "bg-muted text-muted-foreground", ok: "bg-success/12 text-success", warn: "bg-warning/15 text-warning-foreground", info: "bg-primary/10 text-primary", bad: "bg-destructive/10 text-destructive" }[tone];
  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${c}`}>{children}</span>;
}

function Dashboard({ go }: { go: (t: Tab) => void }) {
  const { products, categories, services, orders, enquiries, gallery, settings } = useStore();
  const low = products.filter((p) => p.stock < 10);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Stat label="Products" value={products.length} onClick={() => go("Products")} />
        <Stat label="Categories" value={categories.length} onClick={() => go("Categories")} />
        <Stat label="Services" value={services.length} onClick={() => go("Services")} />
        <Stat label="Demo Orders" value={orders.length} onClick={() => go("Orders")} />
        <Stat label="Enquiries" value={enquiries.length} onClick={() => go("Enquiries")} />
        <Stat label="Gallery Images" value={gallery.length} onClick={() => go("Gallery")} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card p-5">
          <h2 className="font-bold text-navy">Recent demo orders</h2>
          <ul className="mt-3 divide-y text-sm">{orders.slice(0, 5).map((o) => <li key={o.id} className="flex justify-between gap-3 py-2"><span><b>{o.id}</b> · {o.customer.name}</span><span className="flex items-center gap-2">{formatPrice(o.total, settings.currency)}<Badge tone="info">{o.status}</Badge></span></li>)}</ul>
        </div>
        <div className="card p-5">
          <h2 className="font-bold text-navy">Recent enquiries</h2>
          <ul className="mt-3 divide-y text-sm">{enquiries.slice(0, 5).map((e) => <li key={e.id} className="flex justify-between gap-3 py-2"><span className="min-w-0 truncate"><b>{e.id}</b> · {e.name} · {e.type}</span><Badge tone={e.status === "New" ? "warn" : e.status === "Closed" ? "muted" : "info"}>{e.status}</Badge></li>)}</ul>
        </div>
      </div>
      <div className="card p-5">
        <h2 className="font-bold text-navy">Inventory overview</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => {
            const ps = products.filter((p) => p.category === c.id);
            return <div key={c.id} className="rounded-lg bg-surface p-3 text-sm"><p className="font-semibold text-navy">{c.name}</p><p className="text-muted-foreground">{ps.length} products · {ps.reduce((s, p) => s + p.stock, 0)} units</p></div>;
          })}
        </div>
        {low.length > 0 && <p className="mt-4 text-sm"><Badge tone="warn">Low / out of stock</Badge> {low.map((p) => `${p.name} (${p.stock})`).join(", ")}</p>}
      </div>
    </div>
  );
}

function Products() {
  const { products, categories, set, settings } = useStore();
  const catOpts = categories.map((c) => ({ value: c.id, label: c.name }));
  return (
    <Crud<Product>
      title="Products" idPrefix="p" items={products} setItems={(fn) => set("products", fn)}
      blank={() => ({ id: "", name: "", category: categories[0]?.id ?? "", price: 0, description: "", images: [], specs: {}, packSize: "1 unit", brand: "MediTrust Demo", stock: 0, featured: false, visible: true, rx: false, enquiryOnly: false, popularity: 50, createdAt: new Date().toISOString() })}
      fields={[
        { key: "name", label: "Name", required: true },
        { key: "category", label: "Category", type: "select", options: catOpts },
        { key: "price", label: "Demo price (₹, 0 = on enquiry)", type: "number" },
        { key: "stock", label: "Stock quantity", type: "number" },
        { key: "brand", label: "Brand" },
        { key: "packSize", label: "Pack size" },
        { key: "popularity", label: "Popularity score (demo)", type: "number" },
        { key: "description", label: "Description", type: "textarea", required: true },
        { key: "images", label: "Image URLs", type: "list" },
        { key: "specs", label: "Specifications", type: "kv" },
        { key: "visible", label: "Visible on site", type: "checkbox" },
        { key: "featured", label: "Featured", type: "checkbox" },
        { key: "rx", label: "Prescription / verification required", type: "checkbox" },
        { key: "enquiryOnly", label: "Enquiry only (no cart)", type: "checkbox" },
      ]}
      columns={[
        { label: "Product", render: (p) => <span className="flex items-center gap-3"><SafeImg src={p.images[0]} alt="" className="h-10 w-12 rounded" /><span className="font-semibold text-navy">{p.name}</span></span> },
        { label: "Category", render: (p) => categories.find((c) => c.id === p.category)?.name ?? "—" },
        { label: "Price", render: (p) => (p.price ? formatPrice(p.price, settings.currency) : "On enquiry") },
        { label: "Stock", render: (p) => <Badge tone={p.stock <= 0 ? "bad" : p.stock < 10 ? "warn" : "ok"}>{p.stock}</Badge> },
        { label: "Flags", render: (p) => <span className="flex flex-wrap gap-1">{!p.visible && <Badge>Hidden</Badge>}{p.featured && <Badge tone="info">Featured</Badge>}{p.rx && <Badge tone="warn">Rx</Badge>}{p.enquiryOnly && <Badge>Enquiry</Badge>}</span> },
      ]}
    />
  );
}

function Categories() {
  const { categories, products, set } = useStore();
  return (
    <Crud<Category>
      title="Categories" idPrefix="c" items={[...categories].sort((a, b) => a.order - b.order)} setItems={(fn) => set("categories", fn)}
      blank={() => ({ id: "", name: "", description: "", image: "", order: categories.length + 1, active: true, featured: false })}
      fields={[
        { key: "name", label: "Name", required: true },
        { key: "order", label: "Display order", type: "number" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image", label: "Image URL", type: "image" },
        { key: "active", label: "Active", type: "checkbox" },
      ]}
      columns={[
        { label: "#", render: (c) => c.order },
        { label: "Category", render: (c) => <span className="flex items-center gap-3"><SafeImg src={c.image} alt="" className="h-10 w-12 rounded" /><span className="font-semibold text-navy">{c.name}</span></span> },
        { label: "Products", render: (c) => products.filter((p) => p.category === c.id).length },
        { label: "Status", render: (c) => <Badge tone={c.active ? "ok" : "muted"}>{c.active ? "Active" : "Inactive"}</Badge> },
      ]}
    />
  );
}

function Services() {
  const { services, set } = useStore();
  return (
    <Crud<Service>
      title="Services" idPrefix="s" items={services} setItems={(fn) => set("services", fn)}
      blank={() => ({ id: "", group: "Healthcare Professional Support", title: "", description: "", points: [], image: "", buttonLabel: "Send Enquiry", enabled: true, visible: true })}
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "group", label: "Service group" },
        { key: "buttonLabel", label: "Enquiry button label" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "points", label: "Detail points", type: "list" },
        { key: "image", label: "Image URL", type: "image" },
        { key: "enabled", label: "Enquiries enabled", type: "checkbox" },
        { key: "visible", label: "Visible on site", type: "checkbox" },
      ]}
      columns={[
        { label: "Service", render: (s) => <span className="flex items-center gap-3"><SafeImg src={s.image} alt="" className="h-10 w-12 rounded" /><span className="font-semibold text-navy">{s.title}</span></span> },
        { label: "Group", render: (s) => s.group },
        { label: "Status", render: (s) => <span className="flex gap-1"><Badge tone={s.visible ? "ok" : "muted"}>{s.visible ? "Visible" : "Hidden"}</Badge>{!s.enabled && <Badge tone="warn">Disabled</Badge>}</span> },
      ]}
    />
  );
}

function Gallery() {
  const { gallery, set } = useStore();
  const [bulk, setBulk] = useState("");
  const addBulk = () => {
    const urls = bulk.split("\n").map((u) => u.trim()).filter((u) => /^https?:\/\/|^\//.test(u));
    if (!urls.length) return;
    set("gallery", (g) => [...urls.map((url, i): GalleryImage => ({ id: `g${Date.now().toString(36)}${i}`, title: "New image", alt: "Healthcare image", category: galleryCategories[0], url, visible: true })), ...g]);
    setBulk("");
  };
  return (
    <div className="space-y-6">
      <div className="card p-5">
        <label htmlFor="bulk" className="label">Add multiple image URLs (one per line)</label>
        <textarea id="bulk" rows={3} value={bulk} onChange={(e) => setBulk(e.target.value)} className="input font-mono text-xs" placeholder="https://…" />
        <button onClick={addBulk} className="btn btn-primary mt-3">Add images</button>
      </div>
      <Crud<GalleryImage>
        title="Gallery images" idPrefix="g" items={gallery} setItems={(fn) => set("gallery", fn)}
        blank={() => ({ id: "", title: "", alt: "", category: galleryCategories[0], url: "", visible: true })}
        fields={[
          { key: "title", label: "Title", required: true },
          { key: "category", label: "Category", type: "select", options: galleryCategories.map((c) => ({ value: c, label: c })) },
          { key: "alt", label: "Alt text", required: true },
          { key: "url", label: "Image URL", type: "image", required: true },
          { key: "visible", label: "Visible", type: "checkbox" },
        ]}
        columns={[
          { label: "Image", render: (g) => <SafeImg src={g.url} alt={g.alt} className="h-12 w-16 rounded" /> },
          { label: "Title", render: (g) => <span className="font-semibold text-navy">{g.title}</span> },
          { label: "Category", render: (g) => g.category },
          { label: "Visible", render: (g) => <Badge tone={g.visible ? "ok" : "muted"}>{g.visible ? "Yes" : "No"}</Badge> },
        ]}
      />
    </div>
  );
}

function Orders() {
  const { orders, set, settings } = useStore();
  const update = (id: string, status: OrderStatus) => set("orders", (o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy">Demo orders</h2>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">All orders are fictional demo records. No payments are collected.</p>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-navy">{o.id} <Badge>Demo</Badge></p>
                <p className="text-sm text-muted-foreground">{new Date(o.date).toLocaleString("en-IN")}</p>
                <p className="mt-1 text-sm">{o.customer.name} · {o.customer.email} · {o.customer.phone}</p>
                <p className="text-sm text-muted-foreground">{o.customer.address}, {o.customer.city}, {o.customer.state} {o.customer.postal}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-navy">{formatPrice(o.total, settings.currency)}</p>
                <p className="text-xs text-muted-foreground">Payment: {o.paymentStatus}</p>
                <label className="mt-2 flex items-center gap-2 text-sm"><span>Status</span>
                  <select value={o.status} onChange={(e) => update(o.id, e.target.value as OrderStatus)} className="input w-auto py-1">{orderStatuses.map((s) => <option key={s}>{s}</option>)}</select>
                </label>
              </div>
            </div>
            <ul className="mt-3 border-t pt-3 text-sm">{o.items.map((i) => <li key={i.productId} className="flex justify-between"><span>{i.name} × {i.qty}</span><span>{formatPrice(i.price * i.qty, settings.currency)}</span></li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Enquiries() {
  const { enquiries, set } = useStore();
  const [filter, setFilter] = useState("All");
  const update = (id: string, status: EnquiryStatus) => set("enquiries", (l) => l.map((x) => (x.id === id ? { ...x, status } : x)));
  const list = enquiries.filter((e) => filter === "All" || e.source === filter);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-navy">Enquiries</h2>
        <select aria-label="Filter by source" value={filter} onChange={(e) => setFilter(e.target.value)} className="input w-auto">{["All", "Contact", "Service", "Product", "Bulk"].map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div className="space-y-3">
        {list.map((e) => (
          <div key={e.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-navy">{e.id} <Badge tone="info">{e.source}</Badge></p>
                <p className="text-sm">{e.name}{e.organization && ` · ${e.organization}`} · {e.email} · {e.phone}</p>
                <p className="text-sm font-semibold text-primary">{e.type}</p>
                <p className="mt-2 text-sm text-muted-foreground">{e.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <select aria-label="Enquiry status" value={e.status} onChange={(ev) => update(e.id, ev.target.value as EnquiryStatus)} className="input w-auto py-1">{enquiryStatuses.map((s) => <option key={s}>{s}</option>)}</select>
                <button onClick={() => confirm("Delete enquiry?") && set("enquiries", (l) => l.filter((x) => x.id !== e.id))} className="btn btn-outline py-1 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-muted-foreground">No enquiries.</p>}
      </div>
    </div>
  );
}

function Homepage() {
  const { settings, set, categories, services, toast } = useStore();
  const [h, setH] = useState(settings.home);
  const save = () => { set("settings", (s) => ({ ...s, home: h })); toast("Homepage updated"); };
  const toggle = (key: "featuredCategoryIds" | "previewServiceIds", id: string) => setH((x) => ({ ...x, [key]: x[key].includes(id) ? x[key].filter((i) => i !== id) : [...x[key], id] }));
  const T = ({ k, label, area }: { k: "heroTitle" | "heroSubtitle" | "heroImage" | "bannerTitle" | "bannerImage" | "bannerCta" | "aboutTitle" | "aboutText" | "aboutImage"; label: string; area?: boolean }) => (
    <div className={area ? "sm:col-span-2" : ""}>
      <label htmlFor={`h-${k}`} className="label">{label}</label>
      {area ? <textarea id={`h-${k}`} rows={3} value={h[k]} onChange={(e) => setH({ ...h, [k]: e.target.value })} className="input" />
        : <input id={`h-${k}`} value={h[k]} onChange={(e) => setH({ ...h, [k]: e.target.value })} className="input" />}
    </div>
  );
  return (
    <div className="card max-w-4xl space-y-6 p-6">
      <div>
        <label htmlFor="h-ann" className="label">Announcement bar messages (one per line)</label>
        <textarea id="h-ann" rows={3} value={h.announcements.join("\n")} onChange={(e) => setH({ ...h, announcements: e.target.value.split("\n") })} className="input" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <T k="heroTitle" label="Hero headline" area />
        <T k="heroSubtitle" label="Hero subtitle" area />
        <T k="heroImage" label="Hero image URL" />
        {[0, 1, 2].map((i) => (
          <div key={i}><label htmlFor={`hb${i}`} className="label">Hero button {i + 1}</label>
            <input id={`hb${i}`} value={h.heroButtons[i]} onChange={(e) => { const b = [...h.heroButtons] as [string, string, string]; b[i] = e.target.value; setH({ ...h, heroButtons: b }); }} className="input" /></div>
        ))}
        <T k="bannerTitle" label="Promo banner headline" />
        <T k="bannerCta" label="Promo banner button" />
        <T k="bannerImage" label="Promo banner image URL" />
        <T k="aboutTitle" label="About section title" />
        <T k="aboutImage" label="About section image URL" />
        <T k="aboutText" label="About section text" area />
      </div>
      <fieldset><legend className="label">Featured categories</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">{categories.map((c) => <label key={c.id} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={h.featuredCategoryIds.includes(c.id)} onChange={() => toggle("featuredCategoryIds", c.id)} className="accent-[var(--color-primary)]" />{c.name}</label>)}</div>
      </fieldset>
      <fieldset><legend className="label">Services preview</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">{services.map((s) => <label key={s.id} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={h.previewServiceIds.includes(s.id)} onChange={() => toggle("previewServiceIds", s.id)} className="accent-[var(--color-primary)]" />{s.title}</label>)}</div>
      </fieldset>
      <p className="text-sm text-muted-foreground">Featured products are managed with the “Featured” flag in Products.</p>
      <button onClick={save} className="btn btn-primary">Save homepage</button>
    </div>
  );
}

function Settings() {
  const { settings, set, toast } = useStore();
  const [f, setF] = useState(settings);
  const [links, setLinks] = useState(settings.footerLinks.map((l) => `${l.label} | ${l.to}`).join("\n"));
  const save = () => {
    const footerLinks = links.split("\n").map((l) => l.split("|").map((x) => x.trim())).filter((p) => p[0] && p[1]).map(([label, to]) => ({ label, to }));
    set("settings", (s) => ({ ...s, ...f, home: s.home, footerLinks }));
    toast("Settings saved");
  };
  const In = ({ k, label, type = "text" }: { k: "businessName" | "address" | "phone" | "email" | "currency" | "shippingThreshold" | "shippingFee"; label: string; type?: string }) => (
    <div><label htmlFor={`s-${k}`} className="label">{label}</label>
      <input id={`s-${k}`} type={type} value={String(f[k])} onChange={(e) => setF({ ...f, [k]: type === "number" ? Number(e.target.value) : e.target.value })} className="input" /></div>
  );
  return (
    <div className="card max-w-3xl space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <In k="businessName" label="Business name" />
        <In k="phone" label="Phone" />
        <In k="email" label="Email" />
        <In k="currency" label="Currency symbol" />
        <In k="shippingThreshold" label="Free shipping threshold" type="number" />
        <In k="shippingFee" label="Shipping fee" type="number" />
      </div>
      <In k="address" label="Address" />
      <div><label htmlFor="s-links" className="label">Footer links (Label | URL per line)</label>
        <textarea id="s-links" rows={4} value={links} onChange={(e) => setLinks(e.target.value)} className="input font-mono text-xs" /></div>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={f.showCredit} onChange={(e) => setF({ ...f, showCredit: e.target.checked })} className="h-4 w-4 accent-[var(--color-primary)]" />Show footer credit “Designed and development by SOSynch Ai Tech”</label>
      <button onClick={save} className="btn btn-primary">Save settings</button>
    </div>
  );
}
