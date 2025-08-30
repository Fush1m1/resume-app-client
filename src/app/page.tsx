import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>This is the top page.</h1>
      <Link href="/tryOn">Tap me and you can find the vton func &rarr;</Link>
      {/* <ResComponent /> */}
      {/* <DbGetComponent />
      <DbUpdateComponent />
      <DbDeleteComponent /> */}
    </div>
  );
}
