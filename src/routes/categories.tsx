import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { SafeImg } from "@/components/SafeImg";
import { PageHero } from "@/components/ui";
import { ArrowRight } from "@/components/Icons";
import { img } from "@/data/images";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Healthcare Product Categories — Meditrust Life Science" },
      { name: "description", content: "Pharmaceuticals, medical devices, diagnostics, first aid, PPE, patient care, surgical supplies, monitoring, mobility and wellness." },
      { property: "og:title", content: "Healthcare Product Categories — Meditrust" },
      { property: "og:description", content: "Ten healthcare product families in one catalogue." },
    ],
  }),
  component: Categories,
});

function Categories() {
  const { categories, products } = useStore();
  const list = categories.filter((c) => c.active).sort((a, b) => a.order - b.order);
  return (
    <>
      <PageHero eyebrow="Categories" title="Healthcare product categories" text="Choose a category to see its products." image={img("operating", 1600)} />
      <div className="container-x grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <Link key={c.id} to="/products" search={{ cat: c.id }} className="card group grid overflow-hidden sm:grid-cols-1">
            <div className="aspect-[16/9] overflow-hidden"><SafeImg src={c.image} alt={c.name} className="h-full w-full transition-transform duration-500 group-hover:scale-105" /></div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-navy">{c.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{products.filter((p) => p.visible && p.category === c.id).length} products</span>
                <span className="flex items-center gap-1 font-semibold text-primary">Explore Category <ArrowRight size={15} /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
