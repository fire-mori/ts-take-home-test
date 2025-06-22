import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import lookupInsight from "./lookup-insight.ts";
import deleteInsight from "./delete-insight.ts";

describe("creates insights in the database", () => {
  withDB((fixture) => {
    const insights: Insight[] = [
      { id: 1, brandId: 1, createdAt: new Date(), text: "1" },
      { id: 2, brandId: 2, createdAt: new Date(), text: "2" },
    ];

    beforeAll(() => {
      fixture.insights.deleteAll();
      fixture.insights.insert(
        insights,
      );
    });

    it("deletes insight from the DB", () => {
      const initialInsight = lookupInsight({ ...fixture, id: 1 });

      expect(initialInsight).toEqual(insights[0]);
      deleteInsight({ ...fixture, id: 1 });
      const deletedInsight = lookupInsight({ ...fixture, id: 1 });
      expect(deletedInsight).toBeUndefined();
    });
  });
});
