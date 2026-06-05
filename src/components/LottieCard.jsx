import { useEffect, useState } from "react";
import Lottie from "lottie-react";
export default function LottieCard({ title, file, figure, description }) {
  const [d, s] = useState(null);
  const [e, se] = useState(false);
  useEffect(() => {
    fetch("/lottie/" + file)
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then(s)
      .catch(() => se(true));
  }, [file]);
  return (
    <article className="card">
      <div className="card-title">{title}</div>
      <div className="card-grid">
        <div className="meta">
          <div className="figure">{figure}</div>
          <p>{description}</p>
        </div>
        <div className="viewer">
          {d ? (
            <Lottie animationData={d} loop />
          ) : (
            <div className="placeholder">
              {e ? "No Animation Loaded" : "Loading Animation..."}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
