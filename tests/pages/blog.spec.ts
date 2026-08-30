import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TableOfContents from "~/components/TableOfContents.vue";
import PrevNext from "~/components/PrevNext.vue";
import ProsePre from "~/components/content/ProsePre.vue";

describe("Blog Components", () => {
  describe("TableOfContents Component", () => {
    it("renders TOC headings and links", () => {
      const sampleLinks = [
        { id: "heading-1", text: "First Section", depth: 2 },
        {
          id: "heading-2",
          text: "Second Section",
          depth: 2,
          children: [{ id: "sub-1", text: "Sub Section 1", depth: 3 }],
        },
      ];

      const wrapper = mount(TableOfContents, {
        props: { links: sampleLinks },
      });

      expect(wrapper.text()).toContain("Table of Contents");
      expect(wrapper.text()).toContain("First Section");
      expect(wrapper.text()).toContain("Second Section");
      expect(wrapper.text()).toContain("Sub Section 1");

      const links = wrapper.findAll("a");
      expect(links[0].attributes("href")).toBe("#heading-1");
      expect(links[1].attributes("href")).toBe("#heading-2");
      expect(links[2].attributes("href")).toBe("#sub-1");
    });
  });

  describe("PrevNext Component", () => {
    it("renders previous and next article cards with links", () => {
      const prev = {
        _path: "/blog/first-post",
        title: "First Post Title",
      };
      const next = {
        _path: "/blog/third-post",
        title: "Third Post Title",
      };

      const wrapper = mount(PrevNext, {
        props: { prev, next },
        global: {
          stubs: {
            NuxtLink: {
              template: '<a :href="to"><slot /></a>',
              props: ["to"],
            },
          },
        },
      });

      expect(wrapper.text()).toContain("Previous Article");
      expect(wrapper.text()).toContain("First Post Title");
      expect(wrapper.text()).toContain("Next Article");
      expect(wrapper.text()).toContain("Third Post Title");
    });
  });

  describe("ProsePre Component", () => {
    it("renders language badge and slot content", () => {
      const wrapper = mount(ProsePre, {
        props: {
          language: "typescript",
          code: "const x: number = 42;",
        },
        slots: {
          default: "<code>const x: number = 42;</code>",
        },
      });

      expect(wrapper.text()).toContain("typescript");
      expect(wrapper.text()).toContain("Copy");
      expect(wrapper.text()).toContain("const x: number = 42;");
    });
  });
});
