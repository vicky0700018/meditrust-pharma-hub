import { useState } from "react";
import { EditIcon, TrashIcon } from "../Icons";
import { SafeImg } from "../SafeImg";

export type FieldDef<T> = {
  key: keyof T & string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select" | "list" | "kv" | "image";
  options?: { value: string; label: string }[];
  required?: boolean;
};

type Row = { id: string } & Record<string, unknown>;

function toForm<T extends Row>(item: T, fields: FieldDef<T>[]) {
  const f: Record<string, string | boolean> = {};
  for (const d of fields) {
    const v = item[d.key];
    if (d.type === "checkbox") f[d.key] = !!v;
    else if (d.type === "list") f[d.key] = ((v as string[]) ?? []).join("\n");
    else if (d.type === "kv") f[d.key] = Object.entries((v as Record<string, string>) ?? {}).map(([k, x]) => `${k}: ${x}`).join("\n");
    else f[d.key] = v == null ? "" : String(v);
  }
  return f;
}

function fromForm<T extends Row>(f: Record<string, string | boolean>, fields: FieldDef<T>[]) {
  const o: Record<string, unknown> = {};
  for (const d of fields) {
    const v = f[d.key];
    if (d.type === "checkbox") o[d.key] = !!v;
    else if (d.type === "number") o[d.key] = Number(v) || 0;
    else if (d.type === "list") o[d.key] = String(v).split("\n").map((s) => s.trim()).filter(Boolean);
    else if (d.type === "kv") o[d.key] = Object.fromEntries(String(v).split("\n").map((l) => l.split(":")).filter((p) => p.length >= 2 && (p[0] ?? "").trim()).map(([k, ...r]) => [(k ?? "").trim(), r.join(":").trim()]));
    else o[d.key] = String(v).trim();
  }
  return o as Partial<T>;
}

export function Crud<T extends Row>({ title, items, setItems, fields, columns, blank, idPrefix }: {
  title: string;
  items: T[];
  setItems: (fn: (prev: T[]) => T[]) => void;
  fields: FieldDef<T>[];
  columns: { label: string; render: (r: T) => React.ReactNode }[];
  blank: () => T;
  idPrefix: string;
}) {
  const [editing, setEditing] = useState<T | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");

  const open = (item: T, fresh: boolean) => { setEditing(item); setIsNew(fresh); setForm(toForm(item, fields)); setErr(""); };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const missing = fields.find((d) => d.required && !String(form[d.key] ?? "").trim());
    if (missing) { setErr(`${missing.label} is required`); return; }
    const updated = { ...editing, ...fromForm(form, fields) } as T;
    setItems((prev) => (isNew ? [updated, ...prev] : prev.map((x) => (x.id === updated.id ? updated : x))));
    setEditing(null);
  };
  const remove = (r: T) => { if (confirm(`Delete this ${title.toLowerCase().replace(/s$/, "")}?`)) setItems((prev) => prev.filter((x) => x.id !== r.id)); };

  const filtered = items.filter((r) => !q || JSON.stringify(r).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-navy">{title} <span className="text-base font-medium text-muted-foreground">({items.length})</span></h2>
        <div className="flex gap-2">
          <input aria-label={`Search ${title}`} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="input w-44" />
          <button onClick={() => open({ ...blank(), id: `${idPrefix}${Date.now().toString(36)}` }, true)} className="btn btn-primary">+ Add</button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-background">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>{columns.map((c) => <th key={c.label} className="px-4 py-3">{c.label}</th>)}<th className="px-4 py-3 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((r) => (
              <tr key={r.id} className="align-middle">
                {columns.map((c) => <td key={c.label} className="px-4 py-3">{c.render(r)}</td>)}
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button onClick={() => open(r, false)} aria-label="Edit" className="rounded-md p-2 hover:bg-muted"><EditIcon size={17} /></button>
                  <button onClick={() => remove(r)} aria-label="Delete" className="rounded-md p-2 text-destructive hover:bg-muted"><TrashIcon size={17} /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-muted-foreground">No records.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/50 p-4" role="dialog" aria-modal="true">
          <form onSubmit={save} className="my-8 w-full max-w-2xl rounded-xl bg-background p-6 shadow-lift">
            <h3 className="text-xl font-bold text-navy">{isNew ? "Add" : "Edit"} {title.replace(/s$/, "")}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map((d) => {
                const id = `crud-${d.key}`;
                const val = form[d.key];
                const set = (v: string | boolean) => setForm((f) => ({ ...f, [d.key]: v }));
                if (d.type === "checkbox") return <label key={d.key} className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={!!val} onChange={(e) => set(e.target.checked)} className="h-4 w-4 accent-[var(--color-primary)]" />{d.label}</label>;
                const wide = d.type === "textarea" || d.type === "list" || d.type === "kv" || d.type === "image";
                return (
                  <div key={d.key} className={wide ? "sm:col-span-2" : ""}>
                    <label htmlFor={id} className="label">{d.label}{d.type === "list" && " (one per line)"}{d.type === "kv" && " (Key: Value per line)"}</label>
                    {d.type === "select" ? (
                      <select id={id} value={String(val)} onChange={(e) => set(e.target.value)} className="input">{d.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
                    ) : d.type === "textarea" || d.type === "list" || d.type === "kv" ? (
                      <textarea id={id} rows={d.type === "textarea" ? 3 : 4} value={String(val)} onChange={(e) => set(e.target.value)} className="input font-mono text-xs" />
                    ) : (
                      <div className="flex gap-3">
                        <input id={id} type={d.type === "number" ? "number" : "text"} value={String(val)} onChange={(e) => set(e.target.value)} className="input" />
                        {d.type === "image" && <SafeImg src={String(val)} alt="Preview" className="h-10 w-14 shrink-0 rounded" />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="btn btn-outline">Cancel</button>
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
