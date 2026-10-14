import { useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import { CheckIcon, InfoIcon } from "./Icons";

export function SectionHeading({ eyebrow, title, text, center = false, action }: { eyebrow?: string; title: string; text?: string; center?: boolean; action?: ReactNode }) {
  return (
    <div className={`mb-10 flex flex-col gap-4 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 text-3xl font-extrabold text-navy md:text-[2.2rem] md:leading-tight">{title}</h2>
        {text && <p className="mt-3 text-muted-foreground">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text?: string; image: string }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="container-x relative py-16 md:py-24">
        <p className="eyebrow text-mint">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-extrabold text-navy-foreground md:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-xl text-lg text-navy-foreground/85">{text}</p>}
      </div>
    </section>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-lg border border-primary/25 bg-mint p-4 text-sm text-secondary-foreground">
      <InfoIcon size={18} className="mt-0.5 shrink-0 text-primary" />
      <div>{children}</div>
    </div>
  );
}

export function Toast() {
  const { toastMsg } = useStore();
  if (!toastMsg) return null;
  return (
    <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-navy-foreground shadow-lift">
      <CheckIcon size={18} className="text-accent" />{toastMsg}
    </div>
  );
}

type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; textarea?: boolean };

/** Generic validated enquiry form that saves to the demo enquiry store. */
export function EnquiryForm({ source, fields, defaultType, submitLabel = "Send Enquiry", onDone }: {
  source: "Contact" | "Service" | "Product" | "Bulk";
  fields: Field[];
  defaultType?: string;
  submitLabel?: string;
  onDone?: () => void;
}) {
  const { addEnquiry } = useStore();
  const [values, setValues] = useState<Record<string, string>>({ type: defaultType ?? "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) e[f.name] = `${f.label} is required`;
      else if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) e[f.name] = "Enter a valid email";
      else if (f.type === "tel" && v && !/^[0-9+\-\s]{7,15}$/.test(v)) e[f.name] = "Enter a valid phone number";
    }
    if (values["message"] && values["message"].length > 1000) e.message = "Message must be under 1000 characters";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const id = addEnquiry({
      source, name: values["name"] ?? "", organization: values["organization"] ?? "", email: values["email"] ?? "",
      phone: values["phone"] ?? "", type: values["type"] || defaultType || "General Enquiry", message: values["message"] ?? "",
    });
    setDone(id);
    setValues({ type: defaultType ?? "" });
    onDone?.();
  };

  if (done) {
    return (
      <div className="rounded-xl border border-success/30 bg-mint p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success text-success-foreground"><CheckIcon /></div>
        <h3 className="mt-3 text-lg font-bold text-navy">Thank you — demo enquiry received</h3>
        <p className="mt-1 text-sm text-muted-foreground">Reference {done}. This is a demo: no email has been sent.</p>
        <button onClick={() => setDone(null)} className="btn btn-outline mt-4">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `f-${source}-${f.name}`;
        const common = { id, value: values[f.name] ?? "", "aria-invalid": !!errors[f.name], onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValues((v) => ({ ...v, [f.name]: e.target.value })) };
        return (
          <div key={f.name} className={f.textarea ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="label">{f.label}{f.required && <span className="text-destructive"> *</span>}</label>
            {f.textarea ? <textarea rows={4} maxLength={1000} className="input" {...common} />
              : f.options ? (
                <select className="input" {...common}>
                  <option value="">Select…</option>
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : <input type={f.type ?? "text"} maxLength={120} className="input" {...common} />}
            {errors[f.name] && <p className="mt-1 text-xs font-medium text-destructive">{errors[f.name]}</p>}
          </div>
        );
      })}
      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Please do not share medical histories or patient records. Demo form — data is stored only in this browser.</p>
        <button className="btn btn-primary shrink-0">{submitLabel}</button>
      </div>
    </form>
  );
}
