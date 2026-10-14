// Centralised image library. Unsplash photos (production CDN) + bundled public/images files.
const ids = {
  pillsBlister: "1584308666744-24d5c474f2ae",
  laptopSteth: "1576091160550-2173dba999ef",
  doctorSteth: "1532938911079-1b06ac7ceec7",
  surgeonsCircle: "1579684385127-1ef15d508118",
  orangeCaps: "1587854692152-cbe660dbde88",
  blisters: "1631549916768-4119b2e5f926",
  labTeam: "1581093450021-4a7360e9a6b5",
  sanitizer: "1583947215259-38e31be8751f",
  masksPills: "1585435557343-3b092031a831",
  stethFlat: "1603398938378-e54eab446dde",
  doctorPortrait: "1612349317150-e413f6a5b16d",
  pharmacy: "1576602976047-174e57a47881",
  colorPills: "1471864190281-a93a3070b6de",
  surgeon: "1550831107-1553da8c8464",
  operating: "1516549655169-df83a0774514",
  ward: "1538108149393-fbbd81895907",
  reception: "1519494026892-80bbd2d6fd0d",
  xray: "1530497610245-94d3c16cda28",
  microscope: "1582719471384-894fbb16e074",
  scans: "1581595219315-a187dd40c322",
  care: "1584515933487-779824d29309",
  vials: "1576671081837-49000212a370",
  stethWhite: "1584982751601-97dcc096659c",
  maskSteth: "1584467735871-8e85353a8413",
  building: "1586773860418-d37222d8fce3",
  clinicRoom: "1629909613654-28e377c37b09",
  bp: "1631815588090-d4bfec5b1ccb",
  stethPink: "1603807008857-ad66b70431aa",
  pillPile: "1607619056574-7b8d3ee536b2",
  doctor2: "1612531386530-97286d97c2d2",
  pharmacist: "1580281657527-47f249e8f4df",
  surgeonsBw: "1504813184591-01572f98c85f",
  stethBw: "1505751172876-fa1923c5c528",
  doctorsScreen: "1666214280557-f1b5022eb634",
  bloodDraw: "1615461066841-6116e61058f4",
  lobby: "1631248055158-edec7a3c072b",
  organizer: "1563213126-a4273aed2016",
  doctorXray: "1588776814546-1ffcf47267a5",
  labCorridor: "1579154204601-01588f351e67",
  examRoom: "1551076805-e1869033e561",
  doctorPatient: "1581056771107-24ca5f033842",
  elderlyCare: "1576765608535-5f04d1e3f289",
} as const;

export type ImgKey = keyof typeof ids | "hero" | "lab" | "supply" | "devices" | "firstaid" | "mobility" | "ppe";

const local: Record<string, string> = {
  hero: "/images/hero.jpg",
  lab: "/images/banner-lab.jpg",
  supply: "/images/about-supply.jpg",
  devices: "/images/devices.jpg",
  firstaid: "/images/firstaid.jpg",
  mobility: "/images/mobility.jpg",
  ppe: "/images/ppe.jpg",
};

export function img(key: ImgKey, w = 900): string {
  if (local[key]) return local[key];
  return `https://images.unsplash.com/photo-${ids[key as keyof typeof ids]}?auto=format&fit=crop&w=${w}&q=75`;
}
