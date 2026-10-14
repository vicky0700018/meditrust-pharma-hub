import { img } from "./images";

export type Service = {
  id: string;
  group: string;
  title: string;
  description: string;
  points: string[];
  image: string;
  buttonLabel: string;
  enabled: boolean;
  visible: boolean;
};

export const defaultServices: Service[] = [
  { id: "s1", group: "Pharmaceutical Services", title: "Pharmaceutical Product Enquiries", description: "Ask about pharmaceutical catalogue listings, pack sizes and prescription requirements.", points: ["Pharmaceutical Product Enquiries", "Medicine Information Requests", "Prescription-Related Enquiry Assistance", "Pharmaceutical Supply Enquiries", "Product Catalog Assistance"], image: img("pharmacist"), buttonLabel: "Send Enquiry", enabled: true, visible: true },
  { id: "s2", group: "Medical Equipment & Supplies", title: "Medical Equipment & Supply Enquiries", description: "Enquire about medical devices, consumables and equipment information.", points: ["Medical Device Enquiries", "Healthcare Consumables", "Hospital and Clinic Supply Enquiries", "Bulk Medical Supply Requests", "Equipment Product Information"], image: img("stethFlat"), buttonLabel: "Send Enquiry", enabled: true, visible: true },
  { id: "s3", group: "Medical Equipment & Supplies", title: "Healthcare Consumables", description: "Everyday consumables for clinics, pharmacies and homes.", points: ["Dressings and gauze", "Gloves and masks", "Examination consumables"], image: img("masksPills"), buttonLabel: "Send Enquiry", enabled: true, visible: true },
  { id: "s4", group: "Healthcare Professional Support", title: "Hospital and Clinic Supply Enquiries", description: "Supply enquiries from hospitals, clinics and healthcare institutions.", points: ["Hospital and Clinic Enquiries", "Institutional Product Requests", "Healthcare Distributor Enquiries"], image: img("reception"), buttonLabel: "Request Information", enabled: true, visible: true },
  { id: "s5", group: "Diagnostic & Laboratory Supplies", title: "Diagnostic Equipment and Supplies", description: "Information on diagnostic equipment, laboratory consumables and sample collection supplies.", points: ["Diagnostic Equipment Enquiries", "Laboratory Consumables", "Sample Collection Supplies", "Testing Equipment Information"], image: img("lab"), buttonLabel: "Send Enquiry", enabled: true, visible: true },
  { id: "s6", group: "Healthcare Professional Support", title: "Bulk and Institutional Enquiries", description: "Quotation requests for bulk and institutional quantities.", points: ["Product Catalog Requests", "Bulk Purchase Enquiries"], image: img("supply"), buttonLabel: "Request a Quote", enabled: true, visible: true },
  { id: "s7", group: "Patient Care & Home Healthcare", title: "Patient Care & Home Healthcare Products", description: "Enquiries for home healthcare equipment, mobility aids and monitoring devices.", points: ["Home Healthcare Equipment Enquiries", "Patient Care Accessories", "Mobility and Rehabilitation Products", "Health Monitoring Equipment", "General Patient-Care Essentials"], image: img("elderlyCare"), buttonLabel: "Send Enquiry", enabled: true, visible: true },
  { id: "s8", group: "Health & Wellness Essentials", title: "Product Information Assistance", description: "Help with product information for hygiene, first aid and wellness listings.", points: ["Personal Hygiene Products", "First Aid Supplies", "Basic Health Monitoring Devices", "General Wellness Product Information"], image: img("sanitizer"), buttonLabel: "Send Enquiry", enabled: true, visible: true },
  { id: "s9", group: "Healthcare Professional Support", title: "Healthcare Supply Coordination", description: "Coordination support for recurring healthcare supply enquiries.", points: ["Recurring supply enquiries", "Catalogue coordination"], image: img("doctorsScreen"), buttonLabel: "Send Enquiry", enabled: true, visible: true },
];
