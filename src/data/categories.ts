import { img } from "./images";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
  featured: boolean;
};

export const defaultCategories: Category[] = [
  { id: "pharma", name: "Pharmaceutical Products", description: "Catalogue listings for pharmaceutical products, including items that need verification.", image: img("pillsBlister"), order: 1, active: true, featured: true },
  { id: "devices", name: "Medical Devices & Equipment", description: "Everyday medical devices for clinics and homes.", image: img("stethFlat"), order: 2, active: true, featured: true },
  { id: "diagnostic", name: "Diagnostic & Testing Supplies", description: "Sample containers, test strips and examination supplies.", image: img("microscope"), order: 3, active: true, featured: true },
  { id: "firstaid", name: "First Aid & Wound Care", description: "Kits, dressings, gauze and bandages.", image: img("firstaid"), order: 4, active: true, featured: true },
  { id: "ppe", name: "Personal Protective Equipment", description: "Gloves, masks, gowns, shields and shoe covers.", image: img("ppe"), order: 5, active: true, featured: true },
  { id: "patientcare", name: "Patient Care Essentials", description: "Supportive accessories for patient comfort and care.", image: img("care"), order: 6, active: true, featured: true },
  { id: "surgical", name: "Surgical & Hospital Supplies", description: "Consumables and supplies for hospital environments.", image: img("operating"), order: 7, active: true, featured: true },
  { id: "monitoring", name: "Health Monitoring Devices", description: "Blood pressure, oxygen saturation and glucose monitoring.", image: img("bp"), order: 8, active: true, featured: true },
  { id: "mobility", name: "Mobility & Rehabilitation Aids", description: "Walking sticks, walkers and wheelchairs.", image: img("mobility"), order: 9, active: true, featured: true },
  { id: "wellness", name: "Healthcare & Wellness Essentials", description: "Hygiene, ORS and general wellness products.", image: img("sanitizer"), order: 10, active: true, featured: true },
];
