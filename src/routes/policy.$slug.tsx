import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

const policies: Record<string, { title: string; body: string[] }> = {
  privacy: { title: "Privacy Policy", body: ["This demo website stores form submissions, cart and wishlist data only in your browser's local storage.", "No data is sent to a server. Please do not enter medical histories, patient records or other sensitive information.", "The final privacy policy must be provided by the company before launch."] },
  terms: { title: "Terms & Conditions", body: ["All product listings, prices and stock levels on this website are illustrative demo data.", "Nothing on this website constitutes medical advice, diagnosis or treatment recommendations.", "Prescription-only products are subject to valid prescription and professional verification."] },
  shipping: { title: "Shipping Policy", body: ["Demo orders are fictional and are not shipped.", "Shipping fees and free-shipping thresholds shown are sample values that the company will confirm before launch."] },
  returns: { title: "Returns & Refunds", body: ["Demo orders are not charged and therefore not refundable.", "Healthcare products may have specific return restrictions for hygiene and safety reasons; the final policy will be confirmed by the company."] },
};

export const Route = createFileRoute("/policy/$slug")({
  head: ({ params }) => {
    const t = policies[params.slug]?.title ?? "Policy";
    return { meta: [{ title: `${t} — Meditrust Life Science` }, { name: "description", content: `${t} for the Meditrust Life Science demo website.` }, { property: "og:title", content: `${t} — Meditrust` }, { property: "og:description", content: `${t} (demo).` }] };
  },
  component: Policy,
});

function Policy() {
  const { slug } = Route.useParams();
  const { settings } = useStore();
  const p = policies[slug];
  if (!p) return <div className="container-x py-24 text-center"><h1 className="text-2xl font-bold text-navy">Policy not found</h1><Link to="/" className="btn btn-primary mt-6">Go home</Link></div>;
  return (
    <div className="container-x max-w-3xl py-16">
      <p className="eyebrow">Policies</p>
      <h1 className="mt-2 text-4xl font-extrabold text-navy">{p.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{settings.businessName} · Demo draft</p>
      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">{p.body.map((b) => <p key={b}>{b}</p>)}</div>
      <p className="mt-8 text-sm">Questions? Email <a className="text-primary underline" href={`mailto:${settings.email}`}>{settings.email}</a>.</p>
    </div>
  );
}
