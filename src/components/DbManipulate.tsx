'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
import useSWR from "swr";
import useSWRMutation from 'swr/mutation';
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.text());


const sendPostRequest = async (url: string, { arg }: { arg: { message: string } }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    throw new Error('Failed to update DB');
  }

  return res.text();
};

const sendDeleteRequest = async (url: string, { arg }: { arg: { article_uuid: string } }) => {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    throw new Error('Failed to update DB');
  }

  return res.text();
};

export function DbGetComponent() {
  const { data, error } = useSWR(`${API_URL}/getDBContent`, fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export function DbUpdateComponent() {
  const [input, setInput] = useState('');
    const { trigger, data, error, isMutating } = useSWRMutation(
      `${API_URL}/updateDBContent/article`,
      sendPostRequest
    );

    const handleSubmit = () => {
      trigger({ message: input });
    };

  return (
    <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={handleSubmit} disabled={isMutating}>
          {isMutating ? 'Sending...' : 'Send Message'}
        </button>

      {error && <div>Error: {error.message}</div>}
      {data && <h1>Response: {data}</h1>}
    </div>
  );
}

export function DbDeleteComponent() {
  const [input, setInput] = useState('');
    const { trigger, data, error, isMutating } = useSWRMutation(
      `${API_URL}/deleteDBContent/article`,
      sendDeleteRequest
    );

    const handleSubmit = () => {
      trigger({ article_uuid: input });
    };

  return (
    <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={handleSubmit} disabled={isMutating}>
          {isMutating ? 'Sending...' : 'Send Message'}
        </button>

      {error && <div>Error: {error.message}</div>}
      {data && <h1>Response: {data}</h1>}
    </div>
  );
}
