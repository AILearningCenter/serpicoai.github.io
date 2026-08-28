// Single source of truth for site navigation, reused by Header, Footer, and
// (later) sitemap/link-check tooling so page routes never drift out of sync.

export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Training", href: "/training" },
  { label: "Corporate", href: "/corporate" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  learn: {
    heading: "Learn",
    links: [
      { label: "1:1 Training", href: "/training" },
      { label: "Corporate", href: "/corporate" },
    ],
  },
  company: {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
    ],
  },
  connect: {
    heading: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      // TODO(brand-rewrite-serpico-ai / public-asset-migration-review):
      // fill in the real CEI partner link, address, email, and phone once
      // approved — left as placeholders here so this plan doesn't fabricate
      // contact details.
      { label: "CEI Partner", href: "#" },
      { label: "Location", href: "#" },
      { label: "Email", href: "#" },
      { label: "Phone", href: "#" },
    ],
  },
};

export const brandName = "Serpico AI";
