import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import HubPage from "~/pages/hub.vue";

describe("Private Workspace Hub Page", () => {
  it("renders locked state PIN keypad by default", async () => {
    const component = await mountSuspended(HubPage);
    expect(component.text()).toContain("Private Workspace");
    expect(component.text()).toContain(
      "Enter the 6-digit access passcode to unlock.",
    );
    expect(component.text()).toContain("Clear");
    expect(component.find('input[type="password"]').exists()).toBe(true);
  });

  it("renders numeric keypad buttons 0-9", async () => {
    const component = await mountSuspended(HubPage);
    const buttons = component.findAll("button");
    const buttonTexts = buttons.map((b) => b.text().trim());

    for (let i = 0; i <= 9; i++) {
      expect(buttonTexts).toContain(i.toString());
    }
  });
});
