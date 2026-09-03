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
      { label: "Email", href: "mailto:info@ailearningcenter.ai" },
      { label: "Phone", href: "tel:+14802401242" },
    ],
  },
};

export const brandName = "Serpico AI";

// Real URLs, confirmed live on the source site's social bar during
// public-asset-migration-review's raw-HTML crawl (not fabricated).
export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/serpico-ai-learning-center", icon: "/assets/icons/linkedin.png" },
  { label: "YouTube", href: "https://www.youtube.com/@SerpicoAILearningCenter", icon: "/assets/icons/youtube.png" },
  { label: "Meetup", href: "https://www.meetup.com/ai-for-entrepreneurs-and-business-leaders", icon: "/assets/icons/meetup.png" },
  { label: "Facebook", href: "https://www.facebook.com/share/1GXb9KgtDN/", icon: "/assets/icons/facebook.png" },
];
