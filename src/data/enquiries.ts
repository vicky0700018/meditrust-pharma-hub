export type EnquiryStatus = "New" | "In Progress" | "Responded" | "Closed";
export const enquiryStatuses: EnquiryStatus[] = ["New", "In Progress", "Responded", "Closed"];

export type Enquiry = {
  id: string;
  date: string;
  source: "Contact" | "Service" | "Product" | "Bulk";
  name: string;
  organization: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  status: EnquiryStatus;
};

export const defaultEnquiries: Enquiry[] = [
  { id: "ENQ-2001", date: "2026-10-01T08:30:00Z", source: "Bulk", name: "Demo Clinic Admin", organization: "Sample Care Clinic", email: "clinic@example.com", phone: "9000000001", type: "Bulk and Institutional Enquiries", message: "Requesting a demo quotation for 50 boxes of nitrile gloves.", status: "In Progress" },
  { id: "ENQ-2002", date: "2026-10-03T12:10:00Z", source: "Product", name: "Test User", organization: "", email: "test@example.com", phone: "9000000002", type: "Prescription Tablet Strip — Demo Listing", message: "What verification is needed for this listing?", status: "Responded" },
  { id: "ENQ-2003", date: "2026-10-07T15:45:00Z", source: "Contact", name: "Sample Visitor", organization: "", email: "visitor@example.com", phone: "9000000003", type: "General Enquiry", message: "Do you have a product catalogue PDF?", status: "New" },
  { id: "ENQ-2004", date: "2026-10-10T10:00:00Z", source: "Service", name: "Demo Hospital Buyer", organization: "Placeholder Hospital", email: "buyer@example.com", phone: "9000000004", type: "Hospital and Clinic Supply Enquiries", message: "Interested in dressing packs for our ward. Please share details.", status: "New" },
  { id: "ENQ-2005", date: "2026-10-12T16:20:00Z", source: "Service", name: "Example Distributor", organization: "Example Distributors", email: "dist@example.com", phone: "9000000005", type: "Healthcare Supply Coordination", message: "Exploring distribution enquiries for monitoring devices.", status: "Closed" },
];
