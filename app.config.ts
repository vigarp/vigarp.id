export default defineAppConfig({
  site: {
    name: "Vigar",
    handle: "vigarp",
    domain: "vigarp.id",
    title: "vigarp Digital Garden",
    description:
      "Software engineer focused on modern web architectures, backend systems, and self-hosted infrastructure.",
    tagline: "Software Engineer & Builder • Digital Garden",
    shortBio:
      "Software engineer focused on modern web architectures, backend systems, and self-hosted infrastructure.",
    fullBio:
      "Hi, I'm Vigar. I build reliable software and explore modern web technologies. When I'm not coding, I enjoy self-hosting open-source tools on my Linux VPS and sharing notes on my digital garden.",
  },
  socials: {
    github: "https://github.com/vigarp",
    gists: "https://gist.github.com/vigarp",
    sId: "https://s.id/vigarp",
    email: "mailto:contact@vigarp.id",
  },
  services: {
    statusPage: "https://status.vigarp.id",
    // Google Calendar Embed URL (replace with actual calendar ID/URL)
    calendarEmbedUrl:
      "https://calendar.google.com/calendar/embed?src=en.indonesian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FJakarta",
  },
  privateServices: [
    {
      name: "Actual Budget",
      description: "Personal finance & budgeting system",
      url: "https://actual.vigarp.id",
      icon: "lucide:wallet",
      category: "Finance",
    },
    {
      name: "Beszel Monitor",
      description: "Lightweight VPS metrics & resource monitoring",
      url: "https://beszel.vigarp.id",
      icon: "lucide:activity",
      category: "Infrastructure",
    },
    {
      name: "Uptime Kuma Admin",
      description: "Service uptime monitor & status manager",
      url: "https://status.vigarp.id",
      icon: "lucide:radio",
      category: "Infrastructure",
    },
    {
      name: "Traefik Dashboard",
      description: "Reverse proxy routes & TLS certificates",
      url: "https://traefik.vigarp.id",
      icon: "lucide:network",
      category: "Infrastructure",
    },
  ],
});
