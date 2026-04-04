import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "@styles/pages/art.module.css";
import Image from "next/image";

import Page from "../components/page";
import Constellations from "../components/constellations";
import RetroStars from "../components/retrostars";

const Art = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [activeArt, setActiveArt] = useState("constellations");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (image) => {
    setLightboxImage(image);
    document.body.style.overflowY = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxLoaded(false);
    history.replaceState(null, null, " ");
    document.body.style.overflowY = "scroll";
  };

  const handleArtToggle = (artName) => {
    setActiveArt(activeArt === artName ? null : artName);
  };

  return (
    <Page title="Art" description="Some of my art... what even is art...">
      <div className={styles.background} />
      <h1 className={styles.heading}>Acrylic Pours</h1>
      <p className={styles.paragraph}>
        A bit more traditional than my usual art. Each piece starts as a mix of
        acrylic paint, water, glue, and silicone oil poured onto canvas, then
        manipulated with a heat gun to bring out cells and organic patterns. No
        two pours come out the same and the process is as much about letting go
        of control as it is about technique.
      </p>
      <div className={styles.artGrid}>
        <div
          className={styles.artItem}
          onClick={() =>
            openLightbox("/static/images/art/acrylic-pours/006.webp")
          }
        >
          <span className={styles.cardImage}>
            <Image
              src="/static/images/art/acrylic-pours/006.webp"
              alt="Molten Copper"
              width={640}
              height={360}
              className="mouse-activate"
              priority={true}
            />
          </span>
          <h2 className={styles.artItemHeader}>
            Molten Copper <span>006</span>
          </h2>
        </div>
        <div
          className={styles.artItem}
          onClick={() =>
            openLightbox("/static/images/art/acrylic-pours/005.webp")
          }
        >
          <span className={styles.cardImage}>
            <Image
              src="/static/images/art/acrylic-pours/005.webp"
              alt="Nebulas in Triangulum"
              width={640}
              height={360}
              className="mouse-activate"
              priority={true}
            />
          </span>
          <h2 className={styles.artItemHeader}>
            Nebulas in Triangulum <span>005</span>
          </h2>
        </div>
        <div
          className={styles.artItem}
          onClick={() =>
            openLightbox("/static/images/art/acrylic-pours/004.webp")
          }
        >
          <span className={styles.cardImage}>
            <Image
              src="/static/images/art/acrylic-pours/004.webp"
              alt="Metal on Mars"
              width={640}
              height={360}
              className="mouse-activate"
              priority={true}
            />
          </span>
          <h2 className={styles.artItemHeader}>
            Metal on Mars <span>004</span>
          </h2>
        </div>
        <div
          className={styles.artItem}
          onClick={() =>
            openLightbox("/static/images/art/acrylic-pours/003.webp")
          }
        >
          <span className={styles.cardImage}>
            <Image
              src="/static/images/art/acrylic-pours/003.webp"
              alt="Water on Jupiter"
              width={640}
              height={360}
              className="mouse-activate"
              priority={true}
            />
          </span>
          <h2 className={styles.artItemHeader}>
            Water on Jupiter <span>003</span>
          </h2>
        </div>
        <div
          className={styles.artItem}
          onClick={() =>
            openLightbox("/static/images/art/acrylic-pours/002.webp")
          }
        >
          <span className={styles.cardImage}>
            <Image
              src="/static/images/art/acrylic-pours/002.webp"
              alt="Cracks in Clay"
              width={640}
              height={360}
              className="mouse-activate"
            />
          </span>
          <h2 className={styles.artItemHeader}>
            Cracks in Clay <span>002</span>
          </h2>
        </div>
        <div
          className={styles.artItem}
          onClick={() =>
            openLightbox("/static/images/art/acrylic-pours/001.webp")
          }
        >
          <span className={styles.cardImage}>
            <Image
              src="/static/images/art/acrylic-pours/001.webp"
              alt="Reef Drop-off"
              width={640}
              height={360}
              className="mouse-activate"
            />
          </span>
          <h2 className={styles.artItemHeader}>
            Reef Drop-off <span>001</span>
          </h2>
        </div>
        <div
          className={styles.artItem}
          onClick={() =>
            openLightbox("/static/images/art/acrylic-pours/000.webp")
          }
        >
          <span className={styles.cardImage}>
            <Image
              src="/static/images/art/acrylic-pours/000.webp"
              alt="Blood in Waves"
              width={640}
              height={360}
              className="mouse-activate"
            />
          </span>
          <h2 className={styles.artItemHeader}>
            Blood in Waves <span>000</span>
          </h2>
        </div>
      </div>
      <h1 className={styles.heading}>Emergent Generative Art</h1>
      <p className={styles.paragraph}>
        Code as a creative medium. These pieces are built entirely in JavaScript
        on HTML canvas, each one a small system of simple rules that produces
        complex, unpredictable behavior. The art emerges from the interaction of
        autonomous entities rather than being explicitly drawn.
      </p>
      <h2 className={styles.subheading}>
        <span>000</span> Constellations
      </h2>
      <p className={styles.paragraph}>
        Drifting points on a dark canvas that form connections with their nearest
        neighbors. As stars wander closer together lines appear between them,
        brighter the nearer they get, building and dissolving constellations
        that never repeat.
      </p>
      <div className={styles.artContainer}>
        <Constellations
          options={{ numStars: 50, isActive: activeArt === "constellations" }}
        />
        <button
          className={styles.playButton}
          onClick={() => handleArtToggle("constellations")}
          data-active={activeArt === "constellations"}
        >
          {activeArt === "constellations" ? "⏸" : "▶"}
        </button>
      </div>
      <a
        className={styles.artItemButton}
        href="https://github.com/overshard/isaacbythewood.com/blob/master/components/constellations.js"
        rel="noopener noreferrer"
        target="_blank"
      >
        See the Code
      </a>
      <h2 className={styles.subheading}>
        <span>001</span> Retro Stars
      </h2>
      <p className={styles.paragraph}>
        Layered star fields at different depths that drift in response to your
        cursor, creating a parallax effect. Inspired by the pixel art aesthetic
        of Celeste and the feeling of staring into a sky that moves with you.
      </p>
      <div className={styles.artContainer}>
        <RetroStars
          options={{ numStars: 50, isActive: activeArt === "retrostars" }}
        />
        <button
          className={styles.playButton}
          onClick={() => handleArtToggle("retrostars")}
          data-active={activeArt === "retrostars"}
        >
          {activeArt === "retrostars" ? "⏸" : "▶"}
        </button>
      </div>
      <a
        className={styles.artItemButton}
        href="https://github.com/overshard/isaacbythewood.com/blob/master/components/retrostars.js"
        rel="noopener noreferrer"
        target="_blank"
      >
        See the Code
      </a>
      {mounted && lightboxImage !== null && createPortal(
        <div className={styles.lightboxOverlay} onClick={() => closeLightbox()}>
          <span
            className={styles.lightboxImageWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={
                styles.lightboxLoading +
                (lightboxLoaded ? " " + styles.hide : "")
              }
            >
              Loading...
            </div>
            <Image
              className={
                styles.lightboxImage + (lightboxLoaded ? " " + styles.show : "")
              }
              src={lightboxImage}
              alt="Lightbox"
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
              onLoad={() => setLightboxLoaded(true)}
            />
            <button
              className={styles.lightboxClose}
              onClick={() => closeLightbox()}
            >
              ✕
            </button>
          </span>
        </div>,
        document.body
      )}
    </Page>
  );
};

export default Art;
