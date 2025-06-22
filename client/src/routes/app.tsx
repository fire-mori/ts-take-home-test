import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/insights");
        if (!res.ok) throw new Error(`Error fetching insights: ${res.status}`);
        const data = await res.json();
        setInsights(data);
      } catch (error) {
        console.error("Failed to fetch insights:", error);
      }
    };

    fetchInsights();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Insights className={styles.insights} insights={insights} />
    </main>
  );
};
