import { useEffect, useState } from "react";
import Moveable from "react-moveable";

export default function Move({ targetRef }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !targetRef?.current) return null;

  return (
    <Moveable
      target={targetRef.current} // ✅ ini penting banget!
      resizable={true}
      draggable={true}
      rotatable={true}
      keepRatio={false}
      renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
      onResize={(e) => {
        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;
        e.target.style.transform = e.drag.transform;
      }}
      onDrag={(e) => {
        e.target.style.transform = e.transform;
      }}
      onRotate={(e) => {
        e.target.style.transform = e.drag.transform;
      }}
    />
  );
}
