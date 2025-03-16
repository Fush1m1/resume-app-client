const API_URL = process.env.NEXT_PUBLIC_API_URL;

// API_URLをfetchしてresに格納
export async function fetchHoge(): Promise<any> {
  const res = await fetch(`https://${API_URL}`);
  await res.json().then((data) => {
    console.log(data);
    return data;
  });
}

let data: string | undefined;
fetchHoge().then((fetchedData) => {
  data = fetchedData;
  console.log(data);
});


export function Hoge() {
  return (
    <div>
      <h1>${data}</h1>
    </div>
  );
}