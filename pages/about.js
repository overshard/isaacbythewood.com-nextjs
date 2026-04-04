import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Page from "../components/page";
import styles from "@styles/pages/about.module.css";

const INITIAL_WORDS = [
  "AI Agents",
  "DevOps",
  "Full-Stack",
  "Testing",
  "Cloud",
  "Security",
  "Developer",
  "Automation",
  "Architecture",
];

const About = () => {
  const [words, setWords] = useState(INITIAL_WORDS);
  const wordsRef = useRef(words);
  wordsRef.current = words;
  const slots = useRef(
    Object.fromEntries(INITIAL_WORDS.map((word, i) => [word, i]))
  );
  const wordRefs = useRef(new Map());
  const getWordRef = (key) => {
    if (!wordRefs.current.has(key)) {
      wordRefs.current.set(key, React.createRef());
    }
    return wordRefs.current.get(key);
  };

  useEffect(() => {
    const getRandomWordIndex = () => {
      return Math.floor(Math.random() * wordsRef.current.length);
    };

    const wordsInterval = setInterval(() => {
      let firstWordIndex = getRandomWordIndex();
      let secondWordIndex = getRandomWordIndex();
      while (firstWordIndex === secondWordIndex) {
        firstWordIndex = getRandomWordIndex();
        secondWordIndex = getRandomWordIndex();
      }
      const firstWord = wordsRef.current[firstWordIndex];
      const secondWord = wordsRef.current[secondWordIndex];
      const firstSlot = slots.current[firstWord];
      const secondSlot = slots.current[secondWord];
      slots.current[firstWord] = secondSlot;
      slots.current[secondWord] = firstSlot;
      setWords(
        wordsRef.current.filter((word, index) => {
          return index !== firstWordIndex && index !== secondWordIndex;
        })
      );
      setTimeout(() => {
        let newWords = [...wordsRef.current];
        newWords.splice(secondWordIndex, 0, firstWord);
        newWords.splice(firstWordIndex, 0, secondWord);
        setWords(newWords);
      }, 1000);
    }, 4000);

    return () => {
      clearInterval(wordsInterval);
    };
  }, []);

  return (
    <Page title="About" description="A brief professional history of myself.">
      <div className={styles.background} />
      <div className={styles.words}>
        <TransitionGroup component={null}>
          {words.map((word) => {
            const nodeRef = getWordRef(word);
            return (
              <CSSTransition
                key={word}
                timeout={1000}
                appear
                classNames={{
                  appearActive: styles.wordAppearActive,
                  appearDone: styles.wordAppearDone,
                  enterActive: styles.wordEnterActive,
                  enterDone: styles.wordEnterDone,
                  exitActive: styles.wordExitActive,
                }}
                nodeRef={nodeRef}
              >
                <h2
                  className={styles.word}
                  ref={nodeRef}
                  style={{ top: `${slots.current[word] * 11}vh` }}
                >
                  <span className={styles.wordText}>{word}</span>
                </h2>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      <p className={styles.paragraph}>
        I am a{" "}
        <span className={styles.strong}>senior solutions architect</span>{" "}
        at Craftmaster Furniture with{" "}
        <span className={styles.strong}>two decades in tech</span>.{" "}
        I got my start{" "}
        <span className={styles.strong}>modifying kernel modules</span>{" "}
        for Digium Telephony Cards on CentOS and have been building across the{" "}
        <span className={styles.strong}>full stack</span>{" "}
        ever since, from DevOps and server infrastructure to{" "}
        <span className={styles.strong}>highly regulated</span>{" "}
        healthcare environments, leading teams through tight deadlines and
        demanding delivery schedules. Today I focus on{" "}
        <span className={styles.strong}>AI agent workflows</span>,{" "}
        automated testing infrastructure, and tooling that keeps release cycles
        fast without sacrificing stability or security.
        <a
          className={styles.resume}
          href="/static/pdfs/resume-isaac-bythewood.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z"
            />
          </svg>
          My Resume
        </a>
      </p>
    </Page>
  );
};

export default About;
