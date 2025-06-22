import * as insightsTable from "$tables/insights.ts";
import type { Delete } from "$types/types.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & Delete;

export default (input: Input) => {
  const { id } = input;

  input.db
    .exec(
      insightsTable.deleteStatement,
      [id],
    );

  console.log("Insight deleted");
};
