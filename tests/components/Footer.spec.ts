import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Footer from "~/components/Footer.vue";

describe("Footer.vue Component", () => {
  it("renders copyright and current year", async () => {
    const component = await mountSuspended(Footer);
    const currentYear = new Date().getFullYear().toString();
    expect(component.text()).toContain(currentYear);
    expect(component.text()).toContain("Vigar");
  });

  it("renders technology stack info", async () => {
    const component = await mountSuspended(Footer);
    expect(component.text()).toContain("Built with Nuxt 3 & Tailwind CSS");
  });

  it("renders all social links", async () => {
    const component = await mountSuspended(Footer);
    expect(component.text()).toContain("GitHub");
    expect(component.text()).toContain("Gists");
    expect(component.text()).toContain("s.id");
    expect(component.text()).toContain("Email");
  });
});
