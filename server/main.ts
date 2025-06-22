// deno-lint-ignore-file no-explicit-any
import * as oak from "@oak/oak";
import * as path from "@std/path";
import { Database } from "@db/sqlite";
import { Insight } from "$models/insight.ts";
import { Port } from "../lib/utils/index.ts";
import listInsights from "./operations/list-insights.ts";
import lookupInsight from "./operations/lookup-insight.ts";
import createInsight from "./operations/create-insight.ts";
import deleteInsight from "./operations/delete-insight.ts";

console.log("Loading configuration");

const env = {
  port: Port.parse(Deno.env.get("SERVER_PORT")),
};

const dbFilePath = path.resolve("tmp", "db.sqlite3");

console.log(`Opening SQLite database at ${dbFilePath}`);
// We can not use sqlite in production, this has to be replaced with postgresSQL connection or something else
await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });
const db = new Database(dbFilePath);

console.log("Initialising server");
const router = new oak.Router();

router.get("/_health", (ctx) => {
  ctx.response.body = "OK";
  ctx.response.status = 200;
});

router.get("/insights/:id", (ctx) => {
  const params = ctx.params as Record<string, any>;
  const result = lookupInsight({ db, id: params.id });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.get("/insights", (ctx) => {
  const result = listInsights({ db });
  ctx.response.body = result;
  ctx.response.status = 200;
});

// assuming that the API contract does not force to use get
router.post("/insight", async (ctx) => {
  const params = await ctx.request.body.json() as Record<string, any>;

  const insightData = Insight.omit({ id: true }).parse({
    brandId: params.brandId,
    createdAt: new Date(params.createdAt),
    text: params.text,
  });

  createInsight({
    db,
    ...insightData,
  });

  ctx.response.body = "OK";
  ctx.response.status = 200;
});

// assuming that the API contract does not force to use get
router.delete("/insight/:id", (ctx) => {
  const params = ctx.params as Record<string, any>;
  const id = Number(params.id);

  deleteInsight({ db, id });
  ctx.response.body = "OK";
  ctx.response.status = 200;
});

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env);
console.log(`Started server on port ${env.port}`);
