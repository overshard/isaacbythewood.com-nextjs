import React, { useEffect, useRef } from "react";
import styles from "@styles/components/mouse.module.css";

const Mouse = () => {
  const cursorRef = useRef(null);
  const circleRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const isInteractiveRef = useRef(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e) => {
      const target = e.target;
      isInteractiveRef.current =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        !!target.closest("a, button") ||
        (target.classList && target.classList.contains("mouse-activate"));
      if (circleRef.current) {
        circleRef.current.classList.toggle(
          "activated",
          isInteractiveRef.current
        );
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    let animationFrameId;

    const animate = () => {
      const { x, y } = mousePos.current;

      if (cursorRef.current)
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (circleRef.current)
        circleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.pageCursor}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#ff2d2d"
          fillOpacity="0.9"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
      </div>
      <div ref={circleRef} className={styles.pageCursorCircle} />
    </>
  );
};

export default Mouse;
