import type { Insight } from "../schemas/insight.ts";

export const createInsight = async (params: Omit<Insight, "id">) => {
  console.log(params);
  try {
    const response = await fetch(`/api/insight`, {
      method: "POST",
      body: JSON.stringify(params),
    });

    if (response.status !== 200) {
      throw new Error("Failed to create the item");
    }

    location.reload();
  } catch (error) {
    console.error("Error creating item:", error);
    alert("Could not create the item.");
  }
};
