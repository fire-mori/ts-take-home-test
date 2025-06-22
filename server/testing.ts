import { Database } from "@db/sqlite";
import type { Insert, Row } from "$types/types.ts";
import * as insightsTable from "$tables/insights.ts";
import type { HasDBClient } from "./shared.ts";
import { afterAll, beforeAll } from "@std/testing/bdd";

type Fixture = HasDBClient & {
  insights: {
    insert(insights: Insert[]): void;
    selectAll(): Row[];
    deleteAll(): void;
  };
};

export const withDB = <R>(fn: (fixture: Fixture) => R): R => {
  const db = new Database(":memory:");

  beforeAll(() => {
    db.exec(insightsTable.createTable);
  });

  afterAll(() => db.close());

  return fn({
    db,
    insights: {
      selectAll() {
        return db.sql<Row>`SELECT * FROM insights`;
      },
      deleteAll() {
        return db.sql<Row>`DELETE FROM insights`;
      },
      insert(insights) {
        for (const item of insights) {
          db.exec(insightsTable.insertStatement, [
            item.brandId,
            item.createdAt,
            item.text,
          ]);
        }
      },
    },
  });
};
