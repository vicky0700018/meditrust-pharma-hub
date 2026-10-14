import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { Notice, PageHero } from "@/components/ui";
import { CloseIcon, FilterIcon } from "@/components/Icons";
import { img } from "@/data/images";

type Search = { q?: string; cat?: string; featured?: boolean };

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" && s.q ? s.q : undefined,
    cat: typeof s.cat === "string" && s.cat ? s.cat : undefined,
    featured: s.featured === true || s.featured === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Medical Products Catalogue — Meditrust Life Science" },
      { name: "description", content: "Search medical devices, diagnostic supplies, PPE, first aid, mobility aids and pharmaceutical listings." },
      { property: "og:title", content: "Medical Products Catalogue — Meditrust" },
      { property: "og:description", content: "Filter and explore healthcare products with clear specifications and availability." },
    ],
  }),
  component: Products,
});

const PAGE = 12;

function Products() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const { products, categories } = useStore();
  const [q, setQ] = useState(search.q ?? "");
  const [cats, setCats] = useState<string[]>(search.cat ? [search.cat] : []);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("featured");
  const [featuredOnly, setFeaturedOnly] = useState(!!search.featured);
  const [avail, setAvail] = useState<"all" | "in" | "out">("all");
  const [shown, setShown] = useState(PAGE);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setQ(search.q ?? ""); setCats(search.cat ? [search.cat] : []); setFeaturedOnly(!!search.featured); }, [search.q, search.cat, search.featured]);
  useEffect(() => setShown(PAGE), [q, cats, min, max, sort, featuredOnly, avail]);

  const activeCats = categories.filter((c) => c.active).sort((a, b) => a.order - b.order);
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    let l = products.filter((p) => p.visible && activeCats.some((c) => c.id === p.category));
    if (term) l = l.filter((p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    if (cats.length) l = l.filter((p) => cats.includes(p.category));
    if (min) l = l.filter((p) => p.price >= Number(min));
    if (max) l = l.filter((p) => p.price <= Number(max));
    if (featuredOnly) l = l.filter((p) => p.featured);
    if (avail === "in") l = l.filter((p) => p.stock > 0);
    if (avail === "out") l = l.filter((p) => p.stock <= 0);
    const s = [...l];
    if (sort === "low") s.sort((a, b) => a.price - b.price);
    else if (sort === "high") s.sort((a, b) => b.price - a.price);
    else if (sort === "new") s.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else s.sort((a, b) => Number(b.featured) - Number(a.featured));
    return s;
  }, [products, activeCats, q, cats, min, max, featuredOnly, avail, sort]);

  const clear = () => { setQ(""); setCats([]); setMin(""); setMax(""); setFeaturedOnly(false); setAvail("all"); setSort("featured"); navigate({ search: {} }); };
  const toggleCat = (id: string) => setCats((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const filters = (
    <div className="space-y-6">
      <div>
        <label htmlFor="pq" className="label">Search</label>
        <input id="pq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Product name…" className="input" />
      </div>
      <fieldset>
        <legend className="label">Categories</legend>
        <div className="mt-2 space-y-2">
          {activeCats.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={cats.includes(c.id)} onChange={() => toggleCat(c.id)} className="h-4 w-4 accent-[var(--color-primary)]" />
              <span className="flex-1">{c.name}</span>
              <span className="text-xs text-muted-foreground">{products.filter((p) => p.visible && p.category === c.id).length}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="label">Price range (₹)</legend>
        <div className="mt-2 flex gap-2">
          <input aria-label="Minimum price" type="number" min={0} value={min} onChange={(e) => setMin(e.target.value)} placeholder="Min" className="input" />
          <input aria-label="Maximum price" type="number" min={0} value={max} onChange={(e) => setMax(e.target.value)} placeholder="Max" className="input" />
        </div>
      </fieldset>
      <fieldset>
        <legend className="label">Availability</legend>
        <div className="mt-2 space-y-2 text-sm">
          {([["all", "All"], ["in", "In stock"], ["out", "Out of stock"]] as const).map(([v, l]) => (
            <label key={v} className="flex items-center gap-2"><input type="radio" name="avail" checked={avail === v} onChange={() => setAvail(v)} className="accent-[var(--color-primary)]" />{l}</label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" />Featured products only</label>
      <button onClick={clear} className="btn btn-outline w-full">Clear filters</button>
    </div>
  );

  return (
    <>
      <PageHero eyebrow="Products" title="Medical products catalogue" text="Devices, diagnostics, protective equipment, patient care and pharmaceutical listings." image={img("pharmacist", 1600)} />
      <div className="container-x py-12">
        <div className="mb-6"><Notice>All listings are fictional demo entries with illustrative prices and inventory. They do not imply the business currently stocks these items. Prescription-only items require verification and cannot be checked out directly.</Notice></div>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block"><div className="card sticky top-24 p-5">{filters}</div></aside>
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground"><span className="font-bold text-navy">{list.length}</span> products found</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setMobileOpen(true)} className="btn btn-outline lg:hidden"><FilterIcon size={16} />Filters</button>
                <label htmlFor="sort" className="sr-only">Sort</label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="input w-auto">
                  <option value="featured">Featured first</option><option value="new">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
                </select>
              </div>
            </div>
            {list.length === 0 ? (
              <div className="rounded-xl bg-surface p-12 text-center"><p className="text-muted-foreground">No products match these filters.</p><button onClick={clear} className="btn btn-primary mt-4">Clear filters</button></div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{list.slice(0, shown).map((p) => <ProductCard key={p.id} p={p} />)}</div>
                {shown < list.length && <div className="mt-10 text-center"><button onClick={() => setShown((s) => s + PAGE)} className="btn btn-navy px-8">Load more ({list.length - shown} remaining)</button></div>}
              </>
            )}
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-navy/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-y-auto bg-background p-5">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold text-navy">Filters</h2><button aria-label="Close filters" onClick={() => setMobileOpen(false)}><CloseIcon /></button></div>
            {filters}
            <button onClick={() => setMobileOpen(false)} className="btn btn-primary mt-4 w-full">Show {list.length} products</button>
          </div>
        </div>
      )}
    </>
  );
}
