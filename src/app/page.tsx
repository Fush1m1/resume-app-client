import { ResComponent } from "@/components/ResComponent";
import { DbDeleteComponent, DbGetComponent, DbUpdateComponent } from "../components/DbManipulate";

export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <ResComponent />
      <DbGetComponent />
      <DbUpdateComponent />
      <DbDeleteComponent />
    </div>
  );
}
