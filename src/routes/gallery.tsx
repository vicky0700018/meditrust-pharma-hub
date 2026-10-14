import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { SafeImg } from "@/components/SafeImg";
import { PageHero } from "@/components/ui";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/components/Icons";
import { img } from "@/data/images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Healthcare Gallery — Meditrust Life Science" },
      { name: "description", content: "Photos of medical devices, laboratories, hospital supplies, protective equipment and patient care." },
      { property: "og:title", content: "Healthcare Gallery — Meditrust" },
      { property: "og:description", content: "Medical and healthcare photography gallery." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { gallery } = useStore();
  const visible = gallery.filter((g) => g.visible);
  const cats = ["All", ...new Set(visible.map((g) => g.category))];
  const [cat, setCat] = useState("All");
  const list = visible.filter((g) => cat === "All" || g.category === cat);
  const [idx, setIdx] = useState<number | null>(null);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i === null ? i : (i + 1) % list.length));
      if (e.key === "ArrowLeft") setIdx((i) => (i === null ? i : (i - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, list.length]);

  const cur = idx !== null ? list[idx] : null;
  return (
    <>
      <PageHero eyebrow="Gallery" title="Healthcare gallery" image={img("microscope", 1600)} />
      <div className="container-x py-12">
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1" role="tablist">
          {cats.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {list.map((g, i) => (
            <button key={g.id} onClick={() => setIdx(i)} className="group relative overflow-hidden rounded-xl text-left" aria-label={`Open ${g.title}`}>
              <SafeImg src={g.url} alt={g.alt} className="aspect-square w-full transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-navy/80 px-3 py-2 text-sm font-semibold text-navy-foreground">{g.title}</span>
            </button>
          ))}
        </div>
      </div>
      {cur && idx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4" role="dialog" aria-modal="true" aria-label={cur.title} onClick={() => setIdx(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-navy-foreground hover:bg-navy-foreground/10"><CloseIcon size={28} /></button>
          <button aria-label="Previous image" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + list.length) % list.length); }} className="absolute left-2 rounded-full p-2 text-navy-foreground hover:bg-navy-foreground/10 md:left-6"><ChevronLeft size={36} /></button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <SafeImg src={cur.url.replace("w=900", "w=1600").replace("w=1200", "w=1600")} alt={cur.alt} className="max-h-[78vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-3 text-center text-navy-foreground">{cur.title} <span className="text-navy-foreground/60">· {idx + 1} / {list.length}</span></figcaption>
          </figure>
          <button aria-label="Next image" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % list.length); }} className="absolute right-2 rounded-full p-2 text-navy-foreground hover:bg-navy-foreground/10 md:right-6"><ChevronRight size={36} /></button>
        </div>
      )}
    </>
  );
}
