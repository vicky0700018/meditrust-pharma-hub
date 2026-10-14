import { img } from "./images";

export type GalleryImage = { id: string; title: string; alt: string; category: string; url: string; visible: boolean };

const g = (id: string, title: string, alt: string, category: string, url: string): GalleryImage => ({ id, title, alt, category, url, visible: true });

export const galleryCategories = ["Medical Devices", "Laboratory", "Hospital", "Professionals", "Patient Care", "Pharmaceutical", "Protective Supplies"];

export const defaultGallery: GalleryImage[] = [
  g("g1", "Home monitoring devices", "Blood pressure monitor, pulse oximeter and thermometer on a white surface", "Medical Devices", img("devices")),
  g("g2", "Stethoscope and supplies", "Stethoscope with medical supplies flat lay", "Medical Devices", img("stethFlat", 1200)),
  g("g3", "Diagnostic laboratory", "Laboratory technician handling sample tubes beside a microscope", "Laboratory", img("lab")),
  g("g4", "Research team", "Scientists working in a modern laboratory", "Laboratory", img("labTeam", 1200)),
  g("g5", "Microscopy", "Researcher using a microscope at a lab bench", "Laboratory", img("microscope", 1200)),
  g("g6", "Operating theatre", "Clean hospital operating room with surgical lights", "Hospital", img("operating", 1200)),
  g("g7", "Hospital ward", "Hospital ward with neatly made beds", "Hospital", img("ward", 1200)),
  g("g8", "Healthcare professional", "Doctor in a white coat with stethoscope", "Professionals", img("doctorPortrait", 1200)),
  g("g9", "Reviewing scans", "Doctor reviewing medical imaging scans", "Professionals", img("scans", 1200)),
  g("g10", "Patient care", "Caregiver holding a patient's hand", "Patient Care", img("care", 1200)),
  g("g11", "Mobility aids", "Wheelchair, walker and walking stick in a clinic room", "Patient Care", img("mobility")),
  g("g12", "Pharmaceutical packaging", "Blister packs of tablets and capsules", "Pharmaceutical", img("blisters", 1200)),
  g("g13", "Pharmacy shelves", "Pharmacist arranging products on pharmacy shelves", "Pharmaceutical", img("pharmacist", 1200)),
  g("g14", "Protective equipment", "Nitrile gloves, surgical masks, face shield and shoe covers", "Protective Supplies", img("ppe")),
  g("g15", "Medical supply storage", "Warehouse aisle stocked with medical consumables", "Hospital", img("supply")),
  g("g16", "Laboratory vials", "Glass laboratory vials and bottles", "Laboratory", img("vials", 1200)),
];
