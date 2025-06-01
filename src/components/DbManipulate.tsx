'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

async function sendPostRequest(url: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'Hello!' }),
  });
  const text = await res.text();
  return text;
}

async function sendDeleteRequest(url: string) {
  const res = await fetch(url, {
    method: 'DELETE',
  });
  const text = await res.text();
  return text;
}

export function DbGetComponent() {
  const { data, error } = useSWR(`${API_URL}/getDBContent`, fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <FormBox />
      <h1>{data}</h1>
    </div>
  );
}

export function DbUpdateComponent() {
  const { data, error } = useSWR(() => `${API_URL}/updateDBContent/article`, sendPostRequest);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <FormBox />
      <h1>{data}</h1>
    </div>
  );
}

export function DbDeleteComponent() {
  const { data, error } = useSWR(() => `${API_URL}/deleteDBContent/article`, sendDeleteRequest);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <FormBox />
      <h1>{data}</h1>
    </div>
  );
}

function FormBox() {
  return (
    <form>
      <input name="query" />
      <button type="submit">submit</button>
    </form>
  );
}