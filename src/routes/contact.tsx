import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { EnquiryForm, PageHero } from "@/components/ui";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { img } from "@/data/images";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Meditrust Life Science, Punawale, Pune" },
      { name: "description", content: "Contact MEDITRUST LIFE SCIENCE PRIVATE LIMITED at Punawale, Pune. Phone 2453125452, email lifescienceprivatejets@gmail.com." },
      { property: "og:title", content: "Contact Meditrust Life Science" },
      { property: "og:description", content: "Send a healthcare product or supply enquiry." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { settings } = useStore();
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch" text="Questions about products, supplies or bulk requirements? Send us an enquiry." image={img("reception", 1600)} />
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_1.6fr]">
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="font-bold text-navy">{settings.businessName}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-mint text-primary"><PinIcon /></span><span><span className="block font-semibold text-navy">Address</span>{settings.address}</span></li>
              <li className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-mint text-primary"><PhoneIcon /></span><span><span className="block font-semibold text-navy">Phone</span><a href={`tel:${settings.phone}`} className="hover:text-primary">{settings.phone}</a></span></li>
              <li className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-mint text-primary"><MailIcon /></span><span className="min-w-0"><span className="block font-semibold text-navy">Email</span><a href={`mailto:${settings.email}`} className="break-all hover:text-primary">{settings.email}</a></span></li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border">
            <iframe title="Map of Punawale, Pune" src="https://www.google.com/maps?q=Punawale,Pune,Maharashtra%20411033&output=embed" className="h-64 w-full" loading="lazy" />
          </div>
        </div>
        <div className="card p-6 md:p-8">
          <h2 className="mb-6 text-2xl font-bold text-navy">Send an enquiry</h2>
          <EnquiryForm source="Contact" fields={[
            { name: "name", label: "Full Name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "organization", label: "Organization" },
            { name: "type", label: "Enquiry Type", required: true, options: ["General Enquiry", "Product Enquiry", "Bulk Supply Enquiry", "Hospital / Clinic Enquiry", "Prescription-Related Enquiry", "Other"] },
            { name: "message", label: "Message", textarea: true, required: true },
          ]} />
        </div>
      </div>
    </>
  );
}
