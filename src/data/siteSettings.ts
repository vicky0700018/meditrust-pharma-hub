import { img } from "./images";

export type SiteSettings = {
  businessName: string;
  address: string;
  phone: string;
  email: string;
  clients: string[];
  currency: string;
  shippingThreshold: number;
  shippingFee: number;
  showCredit: boolean;
  footerLinks: { label: string; to: string }[];
  coupons: { code: string; percent: number }[];
  home: {
    announcements: string[];
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroButtons: [string, string, string];
    bannerTitle: string;
    bannerImage: string;
    bannerCta: string;
    aboutTitle: string;
    aboutText: string;
    aboutImage: string;
    featuredCategoryIds: string[];
    previewServiceIds: string[];
  };
};

export const defaultSettings: SiteSettings = {
  businessName: "MEDITRUST LIFE SCIENCE PRIVATE LIMITED",
  address: "S No. 121, Matoshree Colony, Bhondave Wasti, Punawale, Pune City, Pune, Maharashtra, India – 411033",
  phone: "2453125452",
  email: "lifescienceprivatejets@gmail.com",
  clients: ["AJAY KUMAR PATHRI", "OMKAR SANJAY TELANGI"],
  currency: "₹",
  shippingThreshold: 999,
  shippingFee: 60,
  showCredit: true,
  footerLinks: [
    { label: "Privacy Policy", to: "/policy/privacy" },
    { label: "Terms & Conditions", to: "/policy/terms" },
    { label: "Shipping Policy", to: "/policy/shipping" },
    { label: "Returns & Refunds", to: "/policy/returns" },
  ],
  coupons: [
    { code: "HEALTH10", percent: 10 },
    { code: "CARE5", percent: 5 },
  ],
  home: {
    announcements: ["Healthcare Products for Everyday Needs", "Explore Medical Supplies and Healthcare Essentials", "Healthcare Product Enquiries Welcome"],
    heroTitle: "Healthcare Essentials. A Commitment to Better Living.",
    heroSubtitle: "Explore pharmaceutical products, medical supplies, healthcare equipment, and essential solutions designed to support everyday healthcare needs.",
    heroImage: img("hero"),
    heroButtons: ["Explore Products", "Our Healthcare Services", "Contact Us"],
    bannerTitle: "Supporting Healthcare Professionals and Everyday Care",
    bannerImage: img("lab"),
    bannerCta: "Explore Healthcare Solutions",
    aboutTitle: "A healthcare company built on clear information",
    aboutText: "MEDITRUST LIFE SCIENCE PRIVATE LIMITED is a Pune-based healthcare business focused on pharmaceutical products, medical supplies and healthcare essentials. We aim to make product information easy to find and enquiries simple to send.",
    aboutImage: img("supply"),
    featuredCategoryIds: ["pharma", "devices", "diagnostic", "firstaid", "ppe", "patientcare", "surgical", "monitoring", "mobility", "wellness"],
    previewServiceIds: ["s1", "s2", "s3", "s4", "s5", "s6", "s8", "s9"],
  },
};
