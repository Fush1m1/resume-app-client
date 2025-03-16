const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Define the response data type
type ResponseData = {
  message: string;
};

// API_URLをfetchしてresに格納
export async function fetchHoge(): Promise<ResponseData> {
  const res = await fetch(`https://${API_URL}`);
  const data = await res.json();  // Await here instead of using .then
  console.log(data);
  return data;  // Return the data as ResponseData
}

let data: ResponseData | undefined;
fetchHoge().then((fetchedData) => {
  data = fetchedData;
  console.log(data);
});

export function Hoge() {
  return (
    <div>
      <h1>{data?.message}</h1>  {/* Safely access the message */}
    </div>
  );
}
