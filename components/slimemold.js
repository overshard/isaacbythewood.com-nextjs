import React, { useEffect, useRef } from "react";
import styles from "@styles/components/canvas.module.css";
import PropTypes from "prop-types";

const SlimeMold = ({ options }) => {
  const isActive = options.isActive !== undefined ? options.isActive : true;
  const numAgents = options.numAgents || 6000;
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

    const scale = 2;
    const tw = Math.max(1, Math.floor(cvs.width / scale));
    const th = Math.max(1, Math.floor(cvs.height / scale));
    let trail = new Float32Array(tw * th);
    let trailNext = new Float32Array(tw * th);

    const agents = new Array(numAgents);
    for (let i = 0; i < numAgents; i++) {
      const cx = tw / 2;
      const cy = th / 2;
      const r = Math.sqrt(Math.random()) * Math.min(tw, th) * 0.4;
      const a = Math.random() * Math.PI * 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      agents[i] = {
        x,
        y,
        heading: Math.atan2(cy - y, cx - x),
      };
    }

    const sensorAngle = Math.PI / 4;
    const sensorDistance = 9;
    const rotationAngle = Math.PI / 8;
    const moveSpeed = 1;
    const decay = 0.96;
    const depositAmount = 0.5;

    const sense = (x, y, heading, offset) => {
      const angle = heading + offset;
      const sx = Math.floor(x + Math.cos(angle) * sensorDistance);
      const sy = Math.floor(y + Math.sin(angle) * sensorDistance);
      if (sx < 0 || sx >= tw || sy < 0 || sy >= th) return -1;
      return trail[sy * tw + sx];
    };

    const stops = [
      [0.0, 0, 0, 0],
      [0.35, 14, 63, 244],
      [0.7, 132, 43, 255],
      [1.0, 255, 255, 255],
    ];
    const colorLUT = new Uint8ClampedArray(256 * 3);
    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      let s = 0;
      while (s < stops.length - 2 && t > stops[s + 1][0]) s++;
      const [t0, r0, g0, b0] = stops[s];
      const [t1, r1, g1, b1] = stops[s + 1];
      const k = (t - t0) / (t1 - t0);
      colorLUT[i * 3] = Math.round(r0 + (r1 - r0) * k);
      colorLUT[i * 3 + 1] = Math.round(g0 + (g1 - g0) * k);
      colorLUT[i * 3 + 2] = Math.round(b0 + (b1 - b0) * k);
    }

    const offCanvas = document.createElement("canvas");
    offCanvas.width = tw;
    offCanvas.height = th;
    const offCtx = offCanvas.getContext("2d");
    const offImageData = offCtx.createImageData(tw, th);
    const offData = offImageData.data;

    let animationFrame = null;

    const step = () => {
      for (let i = 0; i < numAgents; i++) {
        const agent = agents[i];
        const f = sense(agent.x, agent.y, agent.heading, 0);
        const l = sense(agent.x, agent.y, agent.heading, -sensorAngle);
        const r = sense(agent.x, agent.y, agent.heading, sensorAngle);

        if (f > l && f > r) {
          // continue straight
        } else if (f < l && f < r) {
          agent.heading += (Math.random() - 0.5) * 2 * rotationAngle;
        } else if (l > r) {
          agent.heading -= rotationAngle;
        } else if (r > l) {
          agent.heading += rotationAngle;
        }

        agent.x += Math.cos(agent.heading) * moveSpeed;
        agent.y += Math.sin(agent.heading) * moveSpeed;

        if (agent.x < 0 || agent.x >= tw || agent.y < 0 || agent.y >= th) {
          agent.x = Math.max(0, Math.min(tw - 1, agent.x));
          agent.y = Math.max(0, Math.min(th - 1, agent.y));
          agent.heading = Math.random() * Math.PI * 2;
        }

        const idx = Math.floor(agent.y) * tw + Math.floor(agent.x);
        trail[idx] = Math.min(1, trail[idx] + depositAmount);
      }

      for (let y = 0; y < th; y++) {
        for (let x = 0; x < tw; x++) {
          const x0 = x === 0 ? x : x - 1;
          const x2 = x === tw - 1 ? x : x + 1;
          const y0 = y === 0 ? y : y - 1;
          const y2 = y === th - 1 ? y : y + 1;
          const sum =
            trail[y0 * tw + x0] +
            trail[y0 * tw + x] +
            trail[y0 * tw + x2] +
            trail[y * tw + x0] +
            trail[y * tw + x] +
            trail[y * tw + x2] +
            trail[y2 * tw + x0] +
            trail[y2 * tw + x] +
            trail[y2 * tw + x2];
          trailNext[y * tw + x] = (sum / 9) * decay;
        }
      }
      const tmp = trail;
      trail = trailNext;
      trailNext = tmp;

      const len = tw * th;
      for (let i = 0; i < len; i++) {
        const v = trail[i];
        const ci =
          (v >= 1 ? 255 : v <= 0 ? 0 : Math.floor(Math.pow(v, 0.6) * 255)) * 3;
        const di = i * 4;
        offData[di] = colorLUT[ci];
        offData[di + 1] = colorLUT[ci + 1];
        offData[di + 2] = colorLUT[ci + 2];
        offData[di + 3] = 255;
      }
      offCtx.putImageData(offImageData, 0, 0);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(offCanvas, 0, 0, cvs.width, cvs.height);

      if (isActive) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    if (isActive) {
      animationFrame = window.requestAnimationFrame(step);
    }

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, numAgents]);

  return <canvas ref={canvas} className={styles.canvas} />;
};

SlimeMold.propTypes = {
  options: PropTypes.object,
};

export default SlimeMold;
