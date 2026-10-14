import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { SafeImg } from "@/components/SafeImg";
import { Notice, SectionHeading } from "@/components/ui";
import { ArrowRight, ChatIcon, EyeIcon, InfoIcon, LeafIcon, ShieldIcon, UsersIcon } from "@/components/Icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meditrust Life Science — Healthcare Essentials & Medical Supplies" },
      { name: "description", content: "Explore pharmaceutical products, medical devices, diagnostic supplies, PPE and patient-care essentials from Meditrust Life Science, Pune." },
      { property: "og:title", content: "Meditrust Life Science — Healthcare Essentials" },
      { property: "og:description", content: "Pharmaceutical products, medical supplies and healthcare equipment catalogue." },
    ],
  }),
  component: Home,
});

const values = [
  { icon: EyeIcon, title: "Product Information Transparency", text: "Clear specifications, pack sizes and availability on every listing." },
  { icon: ShieldIcon, title: "Responsible Healthcare Practices", text: "Prescription products go through a verification enquiry, not open checkout." },
  { icon: ChatIcon, title: "Clear Communication", text: "Straightforward answers to product and supply enquiries." },
  { icon: UsersIcon, title: "Professional Enquiry Support", text: "Dedicated workflows for clinics, hospitals and bulk requests." },
  { icon: LeafIcon, title: "Healthcare Product Awareness", text: "Helping customers understand what each product is for." },
];

function Home() {
  const { settings, categories, products, services, gallery } = useStore();
  const h = settings.home;
  const visible = products.filter((p) => p.visible);
  const cats = h.featuredCategoryIds.map((id) => categories.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => !!c && c.active);
  const featured = visible.filter((p) => p.featured).slice(0, 8);
  const svc = h.previewServiceIds.map((id) => services.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s && s.visible).slice(0, 8);
  const gal = gallery.filter((g) => g.visible).slice(0, 8);

  const [popCat, setPopCat] = useState("all");
  const [popSort, setPopSort] = useState("popular");
  const popular = useMemo(() => {
    let list = visible.filter((p) => popCat === "all" || p.category === popCat);
    list = [...list].sort((a, b) => popSort === "popular" ? b.popularity - a.popularity : popSort === "low" ? a.price - b.price : b.price - a.price);
    return list.slice(0, 8);
  }, [visible, popCat, popSort]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <img src={h.heroImage} alt="Healthcare professional reviewing records beside medical supply shelves" className="absolute inset-0 h-full w-full object-cover object-right" width={1920} height={1088} />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-x relative flex min-h-[560px] flex-col justify-center py-20 md:min-h-[640px]">
          <p className="eyebrow text-mint">Meditrust Life Science · Pune</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.08] text-navy-foreground sm:text-5xl lg:text-6xl">{h.heroTitle}</h1>
          <p className="mt-5 max-w-xl text-lg text-navy-foreground/85">{h.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn btn-primary px-6 py-3">{h.heroButtons[0]}<ArrowRight size={18} /></Link>
            <Link to="/services" className="btn btn-ghost-light px-6 py-3">{h.heroButtons[1]}</Link>
            <Link to="/contact" className="btn btn-ghost-light px-6 py-3">{h.heroButtons[2]}</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Healthcare Categories" title="Browse by healthcare need" text="Ten product families covering pharmaceuticals, devices, diagnostics, protection and patient care." action={<Link to="/categories" className="btn btn-outline">All categories</Link>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {cats.map((c) => {
              const count = visible.filter((p) => p.category === c.id).length;
              return (
                <Link key={c.id} to="/products" search={{ cat: c.id }} className="card group overflow-hidden transition-shadow hover:shadow-lift">
                  <div className="aspect-[4/3] overflow-hidden"><SafeImg src={c.image} alt={c.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-4">
                    <h3 className="font-display text-[0.98rem] font-bold leading-snug text-navy">{c.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{count} products</span>
                      <span className="flex items-center gap-1 font-semibold text-primary">Explore <ArrowRight size={15} /></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Featured Products" title="Featured healthcare products" action={<Link to="/products" search={{ featured: true }} className="btn btn-outline">View all featured</Link>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <div className="mt-8"><Notice>Prices shown are illustrative demo values. Product availability, pricing, regulatory status and prescription requirements must be verified before launch.</Notice></div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-mint py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Healthcare Services" title="How we can help" text="Proposed service categories for this demo. Actual availability is subject to company confirmation." action={<Link to="/services" className="btn btn-primary">All services</Link>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {svc.map((s) => (
              <Link key={s.id} to="/services" hash={s.id} className="card group overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden"><SafeImg src={s.image} alt={s.title} className="h-full w-full transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-navy">{s.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading center eyebrow="Our Values" title="Built around trust and clarity" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border bg-background p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-mint text-primary"><v.icon size={22} /></div>
                <h3 className="mt-4 font-display font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="container-x">
        <div className="relative overflow-hidden rounded-2xl bg-navy">
          <img src={h.bannerImage} alt="Laboratory technician handling diagnostic sample tubes" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative max-w-xl p-8 md:p-14">
            <h2 className="text-3xl font-extrabold text-navy-foreground md:text-4xl">{h.bannerTitle}</h2>
            <p className="mt-3 text-navy-foreground/85">Diagnostic supplies, laboratory consumables and equipment information for healthcare teams.</p>
            <Link to="/products" search={{ cat: "diagnostic" }} className="btn btn-primary mt-6">{h.bannerCta}<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Popular Products" title="Bestselling & popular" text="Popularity ranking uses demonstration data, not actual sales statistics." />
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[{ id: "all", name: "All" }, ...categories.filter((c) => c.active)].map((c) => (
                <button key={c.id} onClick={() => setPopCat(c.id)} aria-pressed={popCat === c.id}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold ${popCat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:border-primary"}`}>{c.name}</button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm"><span className="shrink-0 font-semibold">Sort</span>
              <select value={popSort} onChange={(e) => setPopSort(e.target.value)} className="input w-auto">
                <option value="popular">Most popular (demo)</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
              </select>
            </label>
          </div>
          {popular.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{popular.map((p) => <ProductCard key={p.id} p={p} />)}</div>
            : <p className="rounded-xl bg-surface p-10 text-center text-muted-foreground">No products in this category yet.</p>}
        </div>
      </section>

      {/* About */}
      <section className="bg-surface py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <SafeImg src={h.aboutImage} alt="Organised medical supply storage aisle" className="aspect-[4/3] w-full rounded-2xl shadow-lift" />
          <div>
            <p className="eyebrow">About the company</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-4xl">{h.aboutTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{h.aboutText}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {settings.clients.map((c) => <li key={c} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /><span className="font-semibold text-navy">{c}</span></li>)}
            </ul>
            <Link to="/about" className="btn btn-navy mt-8">About Us<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title="Healthcare in focus" action={<Link to="/gallery" className="btn btn-outline">View Healthcare Gallery</Link>} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gal.map((g, i) => (
              <Link key={g.id} to="/gallery" className={`overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <SafeImg src={g.url} alt={g.alt} className="aspect-square h-full w-full transition-transform duration-500 hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-x">
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-primary p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h2 className="text-2xl font-extrabold text-primary-foreground md:text-3xl">Looking for Healthcare Products or Medical Supplies?</h2>
              <p className="mt-2 flex items-center gap-2 text-primary-foreground/85"><InfoIcon size={16} />Send us your requirement and our team will respond.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-navy">Send an Enquiry</Link>
              <a href={`tel:${settings.phone}`} className="btn btn-ghost-light">Contact Our Team</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
