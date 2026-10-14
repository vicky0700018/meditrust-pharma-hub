import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { SafeImg } from "@/components/SafeImg";
import { EnquiryForm, Notice, PageHero, SectionHeading } from "@/components/ui";
import { CheckIcon } from "@/components/Icons";
import { img } from "@/data/images";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Healthcare Services & Enquiries — Meditrust Life Science" },
      { name: "description", content: "Pharmaceutical, medical equipment, diagnostic, patient-care and institutional supply enquiry services (demo)." },
      { property: "og:title", content: "Healthcare Services — Meditrust" },
      { property: "og:description", content: "Send enquiries for pharmaceutical products, medical equipment and healthcare supplies." },
    ],
  }),
  component: Services,
});

function Services() {
  const { services } = useStore();
  const list = services.filter((s) => s.visible);
  const groups = [...new Set(list.map((s) => s.group))];
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState("");
  const [formKey, setFormKey] = useState(0);

  const enquire = (title: string) => {
    setSelected(title);
    setFormKey((k) => k + 1);
    document.getElementById("service-enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageHero eyebrow="Services" title="Healthcare services & enquiries" text="Proposed service categories covering pharmaceutical, equipment, diagnostic and patient-care enquiries." image={img("doctorsScreen", 1600)} />
      <div className="container-x py-14">
        <Notice>These are proposed demo service categories. Actual services are subject to company confirmation. Meditrust does not claim to offer clinical consultations, diagnostic testing, home sample collection, medicine delivery, manufacturing, distribution or emergency services.</Notice>
        {groups.map((g) => (
          <section key={g} className="mt-14">
            <h2 className="mb-6 text-2xl font-bold text-navy">{g}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.filter((s) => s.group === g).map((s) => (
                <article key={s.id} id={s.id} className="card flex scroll-mt-24 flex-col overflow-hidden">
                  <SafeImg src={s.image} alt={s.title} className="aspect-[16/9] w-full" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-navy">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                    {open === s.id && (
                      <ul className="mt-4 space-y-1.5 text-sm">
                        {s.points.map((pt) => <li key={pt} className="flex gap-2"><CheckIcon size={16} className="mt-0.5 shrink-0 text-accent" />{pt}</li>)}
                      </ul>
                    )}
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                      <button onClick={() => setOpen(open === s.id ? null : s.id)} aria-expanded={open === s.id} className="btn btn-outline text-sm">{open === s.id ? "Show Less" : "Learn More"}</button>
                      <button disabled={!s.enabled} onClick={() => enquire(s.title)} className="btn btn-primary text-sm">{s.enabled ? s.buttonLabel : "Unavailable"}</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section id="service-enquiry" className="mt-16 scroll-mt-24 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading eyebrow="Service Enquiry" title="Tell us what you need" text="Fill in the form and choose the service you're interested in." />
            <SafeImg src={img("doctorPatient")} alt="Healthcare professional speaking with a patient" className="aspect-[4/3] w-full rounded-2xl" />
          </div>
          <div className="card p-6 md:p-8">
            <EnquiryForm key={formKey} source="Service" defaultType={selected} fields={[
              { name: "name", label: "Name", required: true },
              { name: "organization", label: "Organization (if applicable)" },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              { name: "type", label: "Interested service", required: true, options: list.filter((s) => s.enabled).map((s) => s.title) },
              { name: "message", label: "Message", textarea: true, required: true },
            ]} />
          </div>
        </section>
      </div>
    </>
  );
}
