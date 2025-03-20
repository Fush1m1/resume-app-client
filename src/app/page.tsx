import { ResComponent } from "@/components/ResComponent";
import { DbManipulateComponent } from "../components/DbManipulate";

export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <ResComponent />
      <DbManipulateComponent />
    </div>
  );
}
