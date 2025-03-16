import { Hoge } from "./hoge";
import { fetchHoge } from "./hoge";

export default function Home() {
  fetchHoge();
  return (
    <Hoge />
  );
}
