import { img, type ImgKey } from "./images";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  specs: Record<string, string>;
  packSize: string;
  brand: string;
  stock: number;
  featured: boolean;
  visible: boolean;
  /** Prescription-only / professional verification required: no direct checkout. */
  rx: boolean;
  /** Enquiry / quote only: no direct checkout. */
  enquiryOnly: boolean;
  popularity: number; // demo data
  createdAt: string;
};

let n = 0;
function p(
  name: string, category: string, price: number, imgs: ImgKey[], description: string,
  specs: Record<string, string>, packSize: string,
  opts: Partial<Pick<Product, "stock" | "featured" | "rx" | "enquiryOnly" | "brand" | "popularity">> = {},
): Product {
  n += 1;
  const d = new Date(Date.UTC(2026, 0, 1 + n * 7));
  return {
    id: `p${String(n).padStart(3, "0")}`,
    name, category, price, description, specs, packSize,
    images: imgs.map((k) => img(k)),
    brand: opts.brand ?? "MediTrust Demo",
    stock: opts.stock ?? 40,
    featured: opts.featured ?? false,
    visible: true,
    rx: opts.rx ?? false,
    enquiryOnly: opts.enquiryOnly ?? false,
    popularity: opts.popularity ?? 50,
    createdAt: d.toISOString(),
  };
}

export const defaultProducts: Product[] = [
  p("Digital Thermometer", "devices", 249, ["devices", "stethWhite"], "Compact digital thermometer with an easy-read display.", { "Measurement range": "32.0–42.9 °C", "Power source": "1 × LR41 button cell", Display: "LCD" }, "1 unit", { featured: true, popularity: 92, stock: 120 }),
  p("Digital Blood Pressure Monitor", "monitoring", 1899, ["bp", "devices", "clinicRoom"], "Upper-arm automatic monitor with cuff and memory.", { Cuff: "22–32 cm", "Power source": "4 × AA / adapter", Memory: "2 × 60 readings" }, "1 unit with cuff", { featured: true, popularity: 95, stock: 35 }),
  p("Fingertip Pulse Oximeter", "monitoring", 999, ["devices", "stethPink"], "Portable fingertip oximeter showing SpO₂ and pulse rate.", { Display: "OLED", "Power source": "2 × AAA", Included: "Lanyard, pouch" }, "1 unit", { featured: true, popularity: 88, stock: 60 }),
  p("Digital Weighing Scale", "devices", 1299, ["examRoom", "lobby"], "Flat glass-top bathroom scale with auto on/off.", { Capacity: "180 kg", Graduation: "100 g", Dimensions: "30 × 30 cm" }, "1 unit", { popularity: 61, stock: 22 }),
  p("Nebulizer Machine", "devices", 2499, ["clinicRoom", "doctorPatient"], "Compressor nebulizer kit for home and clinic use.", { "Power source": "230 V AC", Included: "Mask set, tubing, cup" }, "1 kit", { popularity: 70, stock: 12, featured: true }),
  p("Stethoscope", "devices", 1499, ["stethWhite", "stethBw", "doctorSteth"], "Dual-head stethoscope for routine auscultation.", { Head: "Stainless steel, dual", Tubing: "PVC, 70 cm" }, "1 unit", { popularity: 77, stock: 30 }),
  p("Infrared Thermometer", "devices", 1599, ["laptopSteth", "devices"], "Non-contact forehead infrared thermometer.", { Distance: "1–5 cm", "Power source": "2 × AA", Memory: "32 readings" }, "1 unit", { popularity: 66, stock: 0 }),
  p("First Aid Kit", "firstaid", 799, ["firstaid", "care"], "Zippered kit stocked with everyday first aid essentials.", { Contents: "Gauze, bandages, tape, scissors", Case: "Nylon, zippered" }, "1 kit (32 pcs)", { featured: true, popularity: 90, stock: 80 }),
  p("Sterile Gauze Dressings", "firstaid", 189, ["firstaid", "surgeonsBw"], "Individually packed sterile gauze swabs.", { Size: "10 × 10 cm", Ply: "8-ply" }, "Pack of 25", { popularity: 58, stock: 200 }),
  p("Adhesive Medical Bandages", "firstaid", 129, ["firstaid", "stethFlat"], "Breathable adhesive strips for minor cuts.", { Sizes: "Assorted", Material: "Fabric" }, "Box of 100", { popularity: 64, stock: 300 }),
  p("Medical Crepe Bandage", "firstaid", 149, ["firstaid", "care"], "Elastic crepe bandage with clips.", { Width: "10 cm", Length: "4 m (stretched)" }, "1 roll", { popularity: 40, stock: 90 }),
  p("Disposable Medical Dressing Pack", "surgical", 349, ["operating", "surgeon"], "Sterile single-use dressing pack for clinical settings.", { Contents: "Drape, gauze, gloves, tray" }, "Pack of 10", { popularity: 45, stock: 75 }),
  p("Blood Glucose Monitor", "monitoring", 1199, ["bloodDraw", "devices"], "Glucometer kit with lancing device.", { Included: "Meter, lancing device, 10 lancets", Memory: "500 readings" }, "1 kit", { featured: true, popularity: 85, stock: 40 }),
  p("Compatible Glucose Test Strips", "diagnostic", 699, ["bloodDraw", "labCorridor"], "Test strips for the demo glucose monitor listing.", { Compatibility: "MediTrust Demo glucose monitor" }, "Pack of 50", { popularity: 80, stock: 150 }),
  p("Urine Sample Collection Container", "diagnostic", 99, ["vials", "microscope"], "Sterile screw-cap sample container.", { Volume: "60 ml", Material: "Polypropylene" }, "Pack of 20", { popularity: 35, stock: 400 }),
  p("Laboratory Sample Containers", "diagnostic", 449, ["lab", "labTeam", "vials"], "Assorted laboratory containers for sample handling.", { Volume: "Assorted", Material: "PP / PS" }, "Pack of 100", { popularity: 38, stock: 60, enquiryOnly: true }),
  p("Medical Examination Supplies", "diagnostic", 599, ["examRoom", "scans"], "Tongue depressors, examination drapes and couch rolls.", { Contents: "Assorted examination consumables" }, "Assorted set", { popularity: 30, stock: 50 }),
  p("Disposable Medical Gloves", "ppe", 399, ["ppe", "labTeam"], "Powder-free nitrile examination gloves.", { Material: "Nitrile", Sizes: "S / M / L" }, "Box of 100", { featured: true, popularity: 94, stock: 500 }),
  p("Surgical Face Masks", "ppe", 199, ["ppe", "masksPills", "maskSteth"], "3-ply disposable face masks with ear loops.", { Layers: "3-ply", Fit: "Ear loops, nose wire" }, "Box of 50", { popularity: 89, stock: 600 }),
  p("Protective Medical Gowns", "ppe", 899, ["surgeonsCircle", "surgeon"], "Disposable non-woven protective gowns.", { Material: "Non-woven SMS", Size: "Free size" }, "Pack of 10", { popularity: 42, stock: 70 }),
  p("Disposable Shoe Covers", "ppe", 249, ["ppe", "operating"], "Non-woven elastic shoe covers.", { Material: "Non-woven PP" }, "Pack of 100", { popularity: 33, stock: 260 }),
  p("Protective Face Shields", "ppe", 299, ["ppe", "doctorsScreen"], "Clear full-face shield with adjustable band.", { Material: "PET visor, foam band" }, "Pack of 5", { popularity: 36, stock: 8 }),
  p("Walking Stick", "mobility", 599, ["mobility", "elderlyCare"], "Height-adjustable aluminium walking stick.", { Height: "72–95 cm", "Max load": "100 kg" }, "1 unit", { popularity: 52, stock: 25 }),
  p("Folding Walker", "mobility", 1799, ["mobility", "doctorPatient"], "Lightweight folding walker with rubber tips.", { Height: "78–93 cm", Frame: "Aluminium" }, "1 unit", { popularity: 48, stock: 14 }),
  p("Wheelchair", "mobility", 7499, ["mobility", "ward"], "Foldable manual wheelchair for indoor and outdoor use.", { "Seat width": "46 cm", Frame: "Powder-coated steel", "Max load": "100 kg" }, "1 unit", { featured: true, popularity: 74, stock: 6 }),
  p("Patient Support Accessories", "patientcare", 699, ["care", "ward"], "Bed rails cushions, positioning pillows and support aids.", { Contents: "Assorted support accessories" }, "Assorted set", { popularity: 31, stock: 30 }),
  p("Hot and Cold Therapy Pack", "patientcare", 279, ["care", "elderlyCare"], "Reusable gel pack for hot or cold application.", { Size: "25 × 15 cm" }, "1 pack", { popularity: 57, stock: 110 }),
  p("Hospital Bed (Bulk Enquiry)", "surgical", 0, ["ward", "reception"], "Bulk and institutional enquiries for hospital beds.", { Configuration: "On request" }, "On request", { popularity: 25, stock: 0, enquiryOnly: true }),
  p("ORS Electrolyte Sachets", "wellness", 120, ["orangeCaps", "pharmacy"], "Oral rehydration salts sachets (demo listing).", { Flavour: "Orange" }, "Pack of 10 sachets", { popularity: 76, stock: 220 }),
  p("Hand Sanitizer", "wellness", 159, ["sanitizer", "pharmacist"], "Alcohol-based hand rub for hand hygiene.", { Volume: "500 ml" }, "1 bottle", { popularity: 72, stock: 300 }),
  p("Weekly Pill Organizer", "wellness", 199, ["organizer", "pillPile"], "7-day pill organizer with snap lids.", { Compartments: "7" }, "1 unit", { popularity: 44, stock: 140 }),
  p("Prescription Tablet Strip — Demo Listing", "pharma", 0, ["pillsBlister", "blisters"], "Illustrative listing for a prescription-only medicine. Supplied only after valid prescription verification.", { Status: "Prescription required" }, "Strip of 10 tablets", { rx: true, popularity: 60, stock: 50, featured: true, brand: "Demo Pharma" }),
  p("Prescription Injectable Vial — Demo Listing", "pharma", 0, ["vials", "doctorXray"], "Illustrative listing for a professional-use injectable. Professional verification required.", { Status: "Professional verification required" }, "1 vial", { rx: true, popularity: 34, stock: 20, brand: "Demo Pharma" }),
  p("OTC Pharmacy Essentials Pack — Demo", "pharma", 349, ["colorPills", "pharmacy"], "Illustrative bundle of non-prescription pharmacy consumables.", { Status: "Non-prescription (demo)" }, "Assorted", { popularity: 55, stock: 45, brand: "Demo Pharma" }),
];
