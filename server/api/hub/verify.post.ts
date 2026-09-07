interface RateLimitRecord {
  count: number;
  resetAt: number;
}

interface VerifyRequestBody {
  pin?: string;
}

interface HubServicesConfig {
  actualBudget?: string;
  beszelMonitor?: string;
  traefikDashboard?: string;
  portainerManager?: string;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

const attemptTracker = new Map<string, RateLimitRecord>();

export interface HubServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  icon: string;
  statusBadge: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const ip =
    getHeader(event, "x-forwarded-for")?.split(",")[0].trim() ||
    event.node.req.socket.remoteAddress ||
    "anonymous";

  const now = Date.now();
  const record = attemptTracker.get(ip);

  // Clean expired lockout
  if (record && now > record.resetAt) {
    attemptTracker.delete(ip);
  }

  // Check rate limit
  const currentRecord = attemptTracker.get(ip);
  if (currentRecord && currentRecord.count >= MAX_ATTEMPTS) {
    const remainingSeconds = Math.ceil((currentRecord.resetAt - now) / 1000);
    throw createError({
      statusCode: 429,
      statusMessage: `Too many failed attempts. Please retry in ${remainingSeconds}s.`,
    });
  }

  const body = (await readBody<VerifyRequestBody>(event).catch(() => ({}))) as
    VerifyRequestBody | undefined;
  const userPin = (body?.pin || "").trim();

  const secretPasscode = (
    (config.hubSecretPasscode as string) ||
    process.env.NUXT_HUB_SECRET_PASSCODE ||
    process.env.HUB_SECRET_PASSCODE ||
    "123456"
  ).trim();

  if (!userPin || userPin !== secretPasscode) {
    const newCount = (currentRecord?.count || 0) + 1;
    attemptTracker.set(ip, {
      count: newCount,
      resetAt: currentRecord?.resetAt || now + LOCKOUT_WINDOW_MS,
    });

    const remainingAttempts = Math.max(0, MAX_ATTEMPTS - newCount);

    throw createError({
      statusCode: 401,
      statusMessage:
        remainingAttempts > 0
          ? `Invalid passcode. ${remainingAttempts} attempts remaining.`
          : "Invalid passcode. Maximum attempts reached, temporarily locked.",
    });
  }

  // Successful authentication - reset failure tracker for this IP
  attemptTracker.delete(ip);

  const hubServices = (config.hubServices as HubServicesConfig) || {};

  const services: HubServiceItem[] = [
    {
      id: "actual-budget",
      title: "Actual Budget",
      category: "Finance & Accounts",
      description:
        "Personal zero-based budgeting, account sync, and financial ledger.",
      url: hubServices.actualBudget || "https://budget.vigarp.id",
      icon: "lucide:wallet-cards",
      statusBadge: "Self-Hosted",
    },
    {
      id: "beszel-monitor",
      title: "Beszel Telemetry",
      category: "Infrastructure & Telemetry",
      description:
        "Lightweight server monitoring, CPU/RAM charts, and docker stats.",
      url: hubServices.beszelMonitor || "https://beszel.vigarp.id",
      icon: "lucide:activity",
      statusBadge: "Live Agent",
    },
    {
      id: "traefik-dashboard",
      title: "Traefik Edge Proxy",
      category: "Edge & Ingress",
      description:
        "Cloudflare TLS termination, dynamic routers, and edge middlewares.",
      url: hubServices.traefikDashboard || "https://traefik.vigarp.id",
      icon: "lucide:network",
      statusBadge: "Ingress",
    },
    {
      id: "portainer-manager",
      title: "Portainer CE",
      category: "Docker Stacks",
      description:
        "Container orchestration, image management, volume backups, and live consoles.",
      url: hubServices.portainerManager || "https://portainer.vigarp.id",
      icon: "lucide:container",
      statusBadge: "Orchestration",
    },
  ];

  return {
    success: true,
    authenticatedAt: new Date().toISOString(),
    services,
  };
});
