'use client';

import { useEffect, useState } from "react";

const API_URL = 'http://0.0.0.0:8080';

async function healthCheck(): Promise<string> {
  const res = await fetch(`${API_URL}`);
  const text = await res.text();
  return text;
}

export function ResComponent() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    healthCheck().then((fetchedData) => {
      console.log("Fetched data:", fetchedData);
      setData(fetchedData);
    }).catch((err) => {
      console.error("Failed to fetch API:", err);
      setData("Error loading data");
    });
  }, []);

  return (
    <div>
      <h1>{data ?? "loading..."}</h1>
    </div>
  );
}