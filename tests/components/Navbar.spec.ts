import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Navbar from "~/components/Navbar.vue";

describe("Navbar.vue Component", () => {
  it("renders the brand title and logo badge", async () => {
    const component = await mountSuspended(Navbar);
    expect(component.text()).toContain("vigarp");
    expect(component.text()).toContain(".id");
    expect(component.text()).toContain("v");
  });

  it("renders all public navigation links", async () => {
    const component = await mountSuspended(Navbar);
    expect(component.text()).toContain("Blog");
    expect(component.text()).toContain("Links");
    expect(component.text()).not.toContain("Schedule");
  });

  it("contains the theme toggle button", async () => {
    const component = await mountSuspended(Navbar);
    const button = component.find('button[aria-label="Toggle color theme"]');
    expect(button.exists()).toBe(true);
  });
});
