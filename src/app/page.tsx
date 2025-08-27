import { DbDeleteComponent, DbGetComponent, DbUpdateComponent } from "../components/DbManipulate";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <Link href="/tryOn">ゆいぴょん着せ替えページへ</Link>
      {/* <ResComponent /> */}
      <DbGetComponent />
      <DbUpdateComponent />
      <DbDeleteComponent />
    </div>
  );
}
