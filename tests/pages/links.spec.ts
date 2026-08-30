import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import LinksPage from "~/pages/links.vue";

describe("Public Directory Links Page", () => {
  it("renders public directory links, class schedule, and private workspace banner", async () => {
    const component = await mountSuspended(LinksPage);
    expect(component.text()).toContain("Public Directory");
    expect(component.text()).toContain("Class Schedule (UNPAM 20261)");
    expect(component.text()).toContain("GitHub Profile");
    expect(component.text()).toContain("GitHub Gists");
    expect(component.text()).toContain("s.id Shortlinks Directory");
    expect(component.text()).toContain("Email Contact");
    expect(component.text()).toContain("Private Workspace");
    expect(component.text()).toContain("Authenticate");
  });
});
