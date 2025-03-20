'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export function DbManipulateComponent() {
  const { data, error } = useSWR(`${API_URL}/dbManipulate`, fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}