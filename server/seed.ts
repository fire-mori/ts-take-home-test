import * as path from "@std/path";
import * as insightsTable from "$tables/insights.ts";
import { Database } from "@db/sqlite";

const dbFilePath = path.resolve("tmp", "db.sqlite3");
await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });
const db = new Database(dbFilePath);
db.exec(insightsTable.createTable);
db.exec(
  insightsTable.insertStatement,
  [
    123,
    new Date().toISOString(),
    "text",
  ],
);
