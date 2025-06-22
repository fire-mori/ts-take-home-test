import type { Insight } from "../schemas/insight.ts";

export const fetchInsights = async () => {
  let data: Insight[] = [];
  try {
    const res = await fetch("/api/insights");
    if (!res.ok) throw new Error(`Error fetching insights: ${res.status}`);
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch insights:", error);
  }
  return data;
};
