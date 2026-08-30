import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ThemeToggle from "~/components/ThemeToggle.vue";

describe("ThemeToggle.vue Component", () => {
  it("renders a button with accessible attributes", async () => {
    const component = await mountSuspended(ThemeToggle);
    const button = component.find("button");
    expect(button.exists()).toBe(true);
    expect(button.attributes("aria-label")).toBe("Toggle color theme");
    expect(button.attributes("title")).toBe("Toggle color theme");
  });
});
