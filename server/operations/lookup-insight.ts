import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";
import type { Row } from "$types/types.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): Insight | undefined => {
  console.log(`Looking up insight for id=${input.id}`);

  const query = insightsTable.selectByIdStatement;
  const [row] = input.db.prepare(query).all(input.id) as Row[];

  if (row) {
    const result = { ...row, createdAt: new Date(row.createdAt) };
    console.log("Insight retrieved:", result);
    return result;
  }

  console.log("Insight not found");
  return;
};
