import React, { useEffect, useRef } from "react";
import styles from "@styles/components/canvas.module.css";

const Synthwave = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const cvs = canvas.current;

    cvs.width = cvs.offsetWidth;
    cvs.height = cvs.offsetHeight;

    const resizeCanvas = () => {
      cvs.width = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
    };
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const cvs = canvas.current;
    const ctx = cvs.getContext("2d");

    const drawSynth = () => {
      let stars = [];
      let numStars = 0;
      const maxNumStars = 250;
      ctx.filter = "blur(1px)";
      while (numStars < maxNumStars) {
        const randomPoint = [
          cvs.width * Math.random(),
          cvs.height * Math.random(),
        ];
        stars.push(randomPoint);
        numStars++;
      }

      let grd = ctx.createLinearGradient(0, 0, 0, cvs.height);
      grd.addColorStop(0, "#110f33");
      grd.addColorStop(1, "#040103");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(...star, 2 * Math.random(), 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        ctx.fill();
        ctx.closePath();
      });
      ctx.filter = "none";

      let currentLine = 0;
      let maxLines = 15;
      let start = cvs.height;
      let offset = 30;
      let quotient = 0.9;
      ctx.strokeStyle = "#dd299c";
      while (currentLine < maxLines) {
        ctx.globalAlpha = 1 - currentLine / maxLines;
        start = start - offset;
        ctx.beginPath();
        ctx.moveTo(0, start);
        ctx.lineTo(cvs.width, start);
        ctx.stroke();
        offset = offset * quotient;
        currentLine++;
      }
      ctx.globalAlpha = 1;

      const end = start;
      quotient = 0.85;
      maxLines = 30;
      currentLine = 0;
      start = cvs.width / 2;
      offset = 80;
      let standardStart = start;
      const standardOffset = offset;
      while (currentLine < maxLines) {
        ctx.beginPath();
        ctx.moveTo(standardStart, cvs.height);
        ctx.lineTo(start, end);
        grd = ctx.createLinearGradient(0, cvs.height, 0, end);
        grd.addColorStop(0, `rgba(221, 41, 156, 1)`);
        grd.addColorStop(1, `rgba(221, 41, 156, 0)`);
        ctx.strokeStyle = grd;
        ctx.stroke();
        offset = offset * quotient;
        start = start - offset;
        standardStart = standardStart - standardOffset;
        currentLine++;
      }
      currentLine = 0;
      start = cvs.width / 2;
      standardStart = start;
      offset = 80;
      while (currentLine < maxLines) {
        ctx.beginPath();
        ctx.moveTo(standardStart, cvs.height);
        ctx.lineTo(start, end);
        ctx.stroke();
        offset = offset * quotient;
        start = start + offset;
        standardStart = standardStart + standardOffset;
        currentLine++;
      }

      ctx.beginPath();
      ctx.arc(cvs.width / 2, cvs.height / 2, 100, 0, 2 * Math.PI);
      grd = ctx.createLinearGradient(
        0,
        cvs.height / 2 - 50,
        0,
        cvs.height / 2 + 50
      );
      grd.addColorStop(0, "#ffd319");
      grd.addColorStop(1, "#ff2975");
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.closePath();
    };

    drawSynth();

    window.addEventListener("resize", drawSynth);

    return () => {
      window.removeEventListener("resize", drawSynth);
    };
  }, []);

  return <canvas ref={canvas} className={styles.canvas} />;
};

export default Synthwave;
