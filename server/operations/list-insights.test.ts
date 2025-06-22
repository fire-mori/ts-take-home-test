import { expect } from "jsr:@std/expect";
import { beforeAll, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import listInsights from "./list-insights.ts";

describe("listing insights in the database", () => {
  describe("nothing in the DB", () => {
    withDB((fixture) => {
      let result: Insight[];

      beforeAll(() => {
        fixture.insights.deleteAll();
        result = listInsights(fixture);
      });

      it("returns empty result", () => {
        expect(result).toEqual([]);
      });
    });
  });

  describe("populated DB", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brandId: 0, createdAt: new Date(), text: "1" },
        { id: 2, brandId: 0, createdAt: new Date(), text: "2" },
        { id: 3, brandId: 1, createdAt: new Date(), text: "3" },
        { id: 4, brandId: 4, createdAt: new Date(), text: "4" },
      ];

      let result: Insight[];

      beforeAll(() => {
        fixture.insights.deleteAll();
        fixture.insights.insert(
          insights,
        );
        result = listInsights(fixture);
      });

      it("returns non-empty result", () => {
        expect(result.length).toBe(insights.length);
      });

      it("returns all insights in the DB", () => {
        expect(result).toEqual(insights);
      });
    });
  });
});
