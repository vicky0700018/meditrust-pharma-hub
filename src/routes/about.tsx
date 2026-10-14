import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { SafeImg } from "@/components/SafeImg";
import { PageHero, SectionHeading } from "@/components/ui";
import { ChatIcon, EyeIcon, LeafIcon, ShieldIcon } from "@/components/Icons";
import { img } from "@/data/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Meditrust Life Science Private Limited" },
      { name: "description", content: "Meet MEDITRUST LIFE SCIENCE PRIVATE LIMITED, a Pune healthcare business focused on pharmaceutical products and medical supplies." },
      { property: "og:title", content: "About Meditrust Life Science" },
      { property: "og:description", content: "Our mission, vision and healthcare values." },
    ],
  }),
  component: About,
});

function About() {
  const { settings, categories } = useStore();
  return (
    <>
      <PageHero eyebrow="About Us" title="Healthcare essentials, presented with care" image={img("labTeam", 1600)} />
      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy">{settings.businessName}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{settings.home.aboutText}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Our focus is helping customers, clinics and healthcare teams find the right product information quickly and send enquiries with confidence.</p>
          <div className="mt-6 rounded-xl bg-surface p-5">
            <p className="text-sm font-semibold text-navy">Leadership</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">{settings.clients.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
        <SafeImg src={img("supply")} alt="Medical supply storage with healthcare consumables" className="aspect-[4/3] w-full rounded-2xl shadow-lift" />
      </section>

      <section className="bg-mint py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div className="card p-8"><p className="eyebrow">Mission</p><h3 className="mt-2 text-2xl font-bold text-navy">Make healthcare products easier to understand and request</h3><p className="mt-3 text-muted-foreground">To present pharmaceutical products, medical supplies and healthcare essentials with clear information and responsive enquiry support.</p></div>
          <div className="card p-8"><p className="eyebrow">Vision</p><h3 className="mt-2 text-2xl font-bold text-navy">A trusted name for everyday healthcare needs</h3><p className="mt-3 text-muted-foreground">To become a dependable point of contact for individuals and healthcare professionals seeking quality-conscious healthcare products.</p></div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading center eyebrow="Values" title="What guides us" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [EyeIcon, "Transparency", "Clear product information and honest presentation."],
            [ShieldIcon, "Responsibility", "Prescription products handled through verification."],
            [ChatIcon, "Communication", "Prompt, clear responses to enquiries."],
            [LeafIcon, "Quality-conscious", "Careful product presentation and specifications."],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof EyeIcon;
            return <div key={t as string} className="rounded-xl border p-6"><div className="grid h-11 w-11 place-items-center rounded-lg bg-mint text-primary"><I size={22} /></div><h3 className="mt-4 font-bold text-navy">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div>;
          })}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Product categories" title="Our healthcare supply ecosystem" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.filter((c) => c.active).sort((a, b) => a.order - b.order).map((c) => (
              <Link key={c.id} to="/products" search={{ cat: c.id }} className="group overflow-hidden rounded-xl bg-background">
                <SafeImg src={c.image} alt={c.name} className="aspect-square w-full transition-transform group-hover:scale-105" />
                <p className="p-3 text-sm font-semibold text-navy">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 text-center">
        <h2 className="text-3xl font-extrabold text-navy">Have a question about our products?</h2>
        <p className="mt-2 text-muted-foreground">Our team is happy to help with product and supply enquiries.</p>
        <Link to="/contact" className="btn btn-primary mt-6 px-8 py-3">Contact Our Team</Link>
      </section>
    </>
  );
}
