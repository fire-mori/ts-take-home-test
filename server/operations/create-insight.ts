import * as insightsTable from "$tables/insights.ts";
import type { Insert } from "$types/types.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & Insert;

export default (input: Input) => {
  const { brand, createdAt, text } = input;

  input.db
    .exec(
      insightsTable.insertStatement,
      [brand, createdAt, text],
    );

  console.log("Insight created");
};
