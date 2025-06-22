import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type { Row } from "$types/types.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient;

export default (input: Input): Insight[] => {
  console.log("Listing insights");

  const query = insightsTable.selectAllStatement;
  const rows = input.db.prepare(query).all() as Row[];

  const result: Insight[] = rows.map((row) => ({
    ...row,
    createdAt: new Date(row.createdAt),
  }));

  console.log("Retrieved insights successfully: ", result);
  return result;
};
