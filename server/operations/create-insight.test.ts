import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import listInsights from "./list-insights.ts";
import createInsight from "./create-insight.ts";
import type { Insert } from "$types/types.ts";

describe("creates insights in the database", () => {
  withDB((fixture) => {
    const insights: Insert[] = [
      { brandId: 1, createdAt: new Date(), text: "1" },
      { brandId: 2, createdAt: new Date(), text: "2" },
    ];

    beforeAll(() => {
      fixture.insights.deleteAll();
      for (const insight of insights) {
        createInsight({ ...fixture, ...insight });
      }
    });

    it("returns non-empty result", () => {
      const results = listInsights(fixture);
      expect(results.length).toBe(insights.length);
    });

    it("returns all insights in the DB", () => {
      const results = listInsights(fixture);

      const strippedResults = results.map(({ brandId, createdAt, text }) => ({
        brandId,
        text,
        createdAt,
      }));
      expect(strippedResults).toEqual(expect.arrayContaining(insights));
    });
  });
});
