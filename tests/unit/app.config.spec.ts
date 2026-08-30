import { describe, it, expect } from "vitest";
import appConfig from "~/app.config";

describe("App Configuration (app.config.ts)", () => {
  it("should have valid site metadata", () => {
    expect(appConfig.site).toBeDefined();
    expect(appConfig.site.name).toBe("Vigar");
    expect(appConfig.site.handle).toBe("vigarp");
    expect(appConfig.site.domain).toBe("vigarp.id");
    expect(appConfig.site.tagline).toBeTruthy();
    expect(appConfig.site.shortBio).toBeTruthy();
    expect(appConfig.site.fullBio).toBeTruthy();
  });

  it("should have properly structured social links", () => {
    expect(appConfig.socials).toBeDefined();
    expect(appConfig.socials.github).toMatch(/^https:\/\/github\.com\//);
    expect(appConfig.socials.gists).toMatch(/^https:\/\/gist\.github\.com\//);
    expect(appConfig.socials.sId).toMatch(/^https:\/\/s\.id\//);
    expect(appConfig.socials.email).toMatch(/^mailto:/);
  });

  it("should have defined public services", () => {
    expect(appConfig.services).toBeDefined();
    expect(appConfig.services.statusPage).toMatch(/^https:\/\//);
    expect(appConfig.services.calendarEmbedUrl).toBeDefined();
  });

  it("should have valid private services configuration for /hub", () => {
    expect(Array.isArray(appConfig.privateServices)).toBe(true);
    expect(appConfig.privateServices.length).toBeGreaterThan(0);

    for (const service of appConfig.privateServices) {
      expect(service.name).toBeTruthy();
      expect(service.url).toMatch(/^https?:\/\//);
      expect(service.icon).toBeTruthy();
      expect(service.category).toBeTruthy();
    }
  });
});
