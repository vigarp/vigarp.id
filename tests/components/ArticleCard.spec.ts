import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ArticleCard from "~/components/ArticleCard.vue";

describe("ArticleCard Component", () => {
  const sampleArticle = {
    title: "Membangun Web Berperforma Tinggi",
    description: "Catatan arsitektur dan panduan performa Nuxt 3.",
    date: "2026-08-28",
    readingTime: "5 min read",
    tags: ["Nuxt 3", "Performance"],
    _path: "/blog/membangun-web-berperforma-tinggi",
  };

  it("renders article title and description correctly", () => {
    const wrapper = mount(ArticleCard, {
      props: {
        article: sampleArticle,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ["to"],
          },
        },
      },
    });

    expect(wrapper.text()).toContain("Membangun Web Berperforma Tinggi");
    expect(wrapper.text()).toContain(
      "Catatan arsitektur dan panduan performa Nuxt 3.",
    );
  });

  it("renders reading time and tags", () => {
    const wrapper = mount(ArticleCard, {
      props: {
        article: sampleArticle,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ["to"],
          },
        },
      },
    });

    expect(wrapper.text()).toContain("5 min read");
    expect(wrapper.text()).toContain("#Nuxt 3");
    expect(wrapper.text()).toContain("#Performance");
  });

  it("links to the article path", () => {
    const wrapper = mount(ArticleCard, {
      props: {
        article: sampleArticle,
      },
      global: {
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ["to"],
          },
        },
      },
    });

    const link = wrapper.find("a");
    expect(link.attributes("href")).toBe(
      "/blog/membangun-web-berperforma-tinggi",
    );
  });
});
