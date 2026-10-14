import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 20, props: P) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...props,
});

export const SearchIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
export const HeartIcon = ({ size, filled, ...p }: P & { filled?: boolean }) => <svg {...base(size, p)} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>;
export const CartIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3h2.6l2.4 12h11l2-8H6.3" /></svg>;
export const MenuIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const CloseIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const ArrowRight = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ChevronLeft = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="m15 6-6 6 6 6" /></svg>;
export const ChevronRight = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="m9 6 6 6-6 6" /></svg>;
export const PhoneIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>;
export const MailIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
export const PinIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
export const ShieldIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
export const InfoIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
export const ChatIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M4 5h16v11H8l-4 4V5Z" /></svg>;
export const CheckIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="m5 12 5 5 9-10" /></svg>;
export const LeafIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19 13 11" /></svg>;
export const EyeIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>;
export const UsersIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></svg>;
export const BoxIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>;
export const FilterIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z" /></svg>;
export const RxIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M6 20V4h5a4 4 0 0 1 0 8H6M10 12l8 8M18 13l-5 6" /></svg>;
export const TrashIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>;
export const EditIcon = ({ size, ...p }: P) => <svg {...base(size, p)}><path d="M4 20h4L19 9l-4-4L4 16v4Z" /></svg>;
