import { animations } from "../data/animations";
import LottieCard from "./LottieCard";
export default function Gallery() {
  return (
    <section className="gallery">
      {animations.map((a) => (
        <LottieCard key={a.file} {...a} />
      ))}
    </section>
  );
}
