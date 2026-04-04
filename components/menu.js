import React, { useState, useRef } from "react";

import { CSSTransition } from "react-transition-group";
import Image from "next/image";
import Link from "next/link";
import styles from "@styles/components/menu.module.css";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const gridLeftRef = useRef(null);
  const gridRightRef = useRef(null);
  const pages = [
    { num: "000", href: "/", title: "Home" },
    { num: "001", href: "/about", title: "About" },
    { num: "002", href: "/code", title: "Code" },
    { num: "003", href: "/art", title: "Art" },
    { num: "004", href: "/contact", title: "Contact" },
  ];

  const toggleMenu = () => {
    if (open === false) {
      setOpen(true);
      document.body.style.overflowY = "hidden";
    } else {
      setOpen(false);
      document.body.style.overflowY = "scroll";
    }
  };

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Hamburger"
      >
        <div className={styles.patty} style={{ width: "15px" }} />
        <div className={styles.patty} />
        <div className={styles.patty} style={{ width: "20px" }} />
      </button>
      <CSSTransition
        in={open}
        timeout={500}
        classNames="menu"
        appear
        nodeRef={overlayRef}
        onEnter={() => {
          if (typeof document !== "undefined") {
            document.body.style.overflowY = "hidden";
          }
        }}
        onExited={() => {
          if (typeof document !== "undefined") {
            document.body.style.overflowY = "scroll";
          }
        }}
      >
        <div className={styles.overlay} ref={overlayRef}>
          <div className={styles.overlayGrid}>
            <CSSTransition
              in={open}
              timeout={500}
              classNames="menu"
              appear
              nodeRef={gridLeftRef}
            >
              <div className={styles.overlayGridLeft} ref={gridLeftRef}>
                <div className={styles.topBar}>
                  <a
                    className={styles.topLink}
                    href="https://blog.bythewood.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </a>
                  <a
                    className={styles.topLink}
                    href="https://status.bythewood.me/properties/87097ef2-5643-4999-917e-72b172dd9e19/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Status
                  </a>
                  <a
                    className={styles.topLink}
                    href="https://analytics.bythewood.me/properties/30e69c06-9beb-4283-8919-8c7a686ab013/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Analytics
                  </a>
                  <a
                    className={styles.topLink}
                    href="https://github.com/overshard"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <div className={styles.bar} />
                </div>
                {pages.map((page) => {
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={styles.overlayLink}
                      data-text={page.title}
                      onClick={toggleMenu}
                    >
                      {page.title}
                    </Link>
                  );
                })}
                <div className={styles.bottomBar}>
                  <Image
                    src="/static/images/avatar.webp"
                    alt="Isaac Bythewood"
                    width={50}
                    height={50}
                  />
                  <div className={styles.bar} />
                </div>
              </div>
            </CSSTransition>
            <CSSTransition
              in={open}
              timeout={500}
              classNames="menu"
              appear
              nodeRef={gridRightRef}
            >
              <div className={styles.overlayGridRight} ref={gridRightRef}>
                <Image
                  src="/static/images/art/acrylic-pours/006.webp"
                  alt="#006 Molten Copper"
                  loading="lazy"
                  fill
                  sizes="40vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </CSSTransition>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Menu;
