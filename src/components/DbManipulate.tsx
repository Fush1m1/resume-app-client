'use client';

import { useState } from "react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = 'http://0.0.0.0:8080';


export function DbManipulateComponent() {
  const [data, setData] = useState<string | null>(null);

  async function handleButtonClick() {
    try {
      const res = await fetch(`${API_URL}/dbManipulate`);
      const text = await res.text();
      console.log("Response:", text);
      setData(text);
    } catch (err) {
      console.error("Failed to fetch API:", err);
      setData("Error loading data");
    }
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Click me to manipulate DB</button>
      <h1>{data ?? "loading..."}</h1>
    </div>
  );
}