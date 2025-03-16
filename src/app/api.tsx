const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ResponseData = {
  message: string;
};

// API_URLをfetchしてresに格納
export async function fetchApi(): Promise<ResponseData> {
  const res = await fetch(`https://${API_URL}`);
  const data = await res.json();
  console.log(data);
  return data;
}

let data: ResponseData | undefined;
fetchApi().then((fetchedData) => {
  data = fetchedData;
  console.log(data);
});

export function ResComponent() {
  return (
    <div>
      <h1>{data?.message || "loading..."}</h1>
    </div>
  );
}
