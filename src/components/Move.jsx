import { useState, useEffect } from "react";
import Moveable from "react-moveable";

export default function Move({ targetRef, onUpdateTransform, onUpdateSize }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !targetRef?.current) return null;

  return (
    <Moveable
      target={targetRef.current}
      draggable={true}
      resizable={true}
      rotatable={true}
      keepRatio={true}
      renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
      onDrag={({ target, transform }) => {
        target.style.transform = transform;
        onUpdateTransform?.(transform);
      }}
      onResize={({ target, width, height, drag }) => {
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = drag.transform;

        onUpdateSize?.(width, height); // ✅ update ukuran ke parent
        onUpdateTransform?.(drag.transform); // ✅ update transform ke parent
      }}
      onRotate={({ target, drag }) => {
        target.style.transform = drag.transform;
        onUpdateTransform?.(drag.transform);
      }}
    />
  );
}
