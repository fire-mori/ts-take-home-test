import * as insightsTable from "$tables/insights.ts";
import type { Insert } from "$types/types.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & Insert;

export default (input: Input) => {
  const { brandId, createdAt, text } = input;

  input.db
    .exec(
      insightsTable.insertStatement,
      [brandId, createdAt, text],
    );

  console.log("Insight created");
};
