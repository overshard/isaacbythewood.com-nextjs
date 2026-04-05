import React, { useEffect, useState, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Image from "next/image";

import Page from "../components/page";
import styles from "@styles/pages/index.module.css";

const Index = () => {
  const words = ["AI Agents", "Automation", "DevOps", "Architecture"];
  const [currentWords, setCurrentWord] = useState([words[0]]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentWordsRef = useRef(currentWords);
  currentWordsRef.current = currentWords;
  const wordRefs = useRef(new Map());
  const getWordRef = (key) => {
    if (!wordRefs.current.has(key)) {
      wordRefs.current.set(key, React.createRef());
    }
    return wordRefs.current.get(key);
  };

  useEffect(() => {
    const wordsInterval = setInterval(() => {
      let nextWordIndex = words.indexOf(currentWordsRef.current[0]) + 1;
      if (nextWordIndex < words.length) setCurrentWord([words[nextWordIndex]]);
      else setCurrentWord([words[0]]);
    }, 2000);
    return () => {
      clearInterval(wordsInterval);
    };
  }, []);

  const playState = imageLoaded ? "running" : "paused";

  return (
    <Page title="Senior Solutions Architect at Craftmaster Furniture">
      <div className={styles.imageWrapper}>
        <Image
          src="/static/images/art/acrylic-pours/005.webp"
          alt="#005 Nebulas in Triangulum"
          loading="eager"
          priority={true}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          onLoad={() => {
            setImageLoaded(true);
            window.dispatchEvent(new Event("loaderReady"));
          }}
        />
      </div>
      <TransitionGroup component="div" className={styles.words}>
        {currentWords.map((word) => {
          const nodeRef = getWordRef(word);
          return (
            <CSSTransition
              key={word}
              timeout={1000}
              classNames={{
                appear: styles.wordAppear,
                appearActive: styles.wordAppearActive,
                appearDone: styles.wordAppearDone,
                enter: styles.wordEnter,
                enterActive: styles.wordEnterActive,
                enterDone: styles.wordEnterDone,
                exit: styles.wordExit,
                exitActive: styles.wordExitActive,
              }}
              appear
              nodeRef={nodeRef}
            >
              <h3 className={styles.word} ref={nodeRef}>
                {word}
              </h3>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <div className={styles.hero} style={{ animationPlayState: playState }}>
        <h1 className={styles.name}>
          <span className={styles.firstName}>Isaac</span>
          <span className={styles.lastName}>Bythewood</span>
        </h1>
        <div className={styles.role}>
          <span className={styles.roleTitle}>Senior Solutions Architect</span>
          <span className={styles.roleAt}>at</span>
          <span className={styles.roleCompany}>Craftmaster Furniture</span>
        </div>
        <a
          href="https://darkfurrow.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.notice}
        >
          <span className={styles.noticeLabel}>New Project</span>
          <span className={styles.noticeTitle}>Dark Furrow</span>
          <span className={styles.noticeDesc}>
            An artistic almanac blending poetry, visual rhythm, and practical
            wisdom for home gardeners and farmers.
          </span>
        </a>
      </div>
    </Page>
  );
};

export default Index;
