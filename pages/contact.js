import React, { useState, useRef, useEffect } from "react";
import styles from "@styles/pages/contact.module.css";
import Image from "next/image";

import Page from "../components/page";

const CHAT_TREE = {
  start: {
    messages: ["Hey there!", "What brings you here?"],
    options: [
      { label: "I want to work together", next: "collab" },
      { label: "Just checking out your work", next: "browsing" },
      { label: "Job opportunity", next: "job" },
    ],
  },
  collab: {
    messages: [
      "Nice! I'm always open to side projects and open source collabs.",
      "Best way to reach me is email. Drop me a line and tell me what you're thinking.",
    ],
    options: [
      { label: "What's your email?", next: "email" },
      { label: "What kind of projects?", next: "projects" },
    ],
  },
  browsing: {
    messages: [
      "Welcome! Feel free to look around.",
      "If anything catches your eye or you want to chat, I'm easy to reach.",
    ],
    options: [
      { label: "How do I reach you?", next: "email" },
      { label: "What are you working on?", next: "projects" },
    ],
  },
  job: {
    messages: [
      "I appreciate the interest.",
      "I'm currently at Craftmaster Furniture as a Senior Solutions Architect and not actively looking.",
      "That said, feel free to reach out if it's compelling.",
    ],
    options: [
      { label: "What's the best way to reach you?", next: "email" },
      { label: "What do you do there?", next: "work" },
    ],
  },
  email: {
    messages: [
      "Email is best: isaac@bythewood.me",
      "You can also find me on GitHub as /overshard or on Discord as Overshard#4907.",
    ],
    options: [{ label: "Thanks!", next: "end" }],
  },
  projects: {
    messages: [
      "Lately I've been deep into AI agent workflows, automated testing infrastructure, and tooling for fast release cycles.",
      "On the side I build self-hosted tools and experiment with whatever is new. Check out the Code page for more.",
    ],
    options: [
      { label: "How do I reach you?", next: "email" },
      { label: "Cool, thanks!", next: "end" },
    ],
  },
  work: {
    messages: [
      "I focus on AI agent workflows, automated integration testing, and building systems for rapid releases without sacrificing stability or security.",
      "Two decades of experience across the full stack, from kernel modules to regulated healthcare environments.",
    ],
    options: [
      { label: "How do I reach you?", next: "email" },
      { label: "Interesting, thanks!", next: "end" },
    ],
  },
  end: {
    messages: ["Anytime! Take care."],
    options: [],
  },
};

const Contact = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [typing, setTyping] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);

  useEffect(() => {
    // Start the chat after a brief delay
    const timer = setTimeout(() => {
      queueMessages("start");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const processingRef = useRef(false);

  useEffect(() => {
    if (messageQueue.length === 0 || processingRef.current) return;
    processingRef.current = true;
    setTyping(true);
    const delay = 600 + messageQueue[0].length * 15;
    const timer = setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { type: "isaac", text: messageQueue[0] },
      ]);
      setMessageQueue((prev) => prev.slice(1));
      setTyping(false);
      processingRef.current = false;
    }, delay);
    return () => clearTimeout(timer);
  }, [messageQueue]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, typing]);

  const queueMessages = (nodeKey) => {
    const node = CHAT_TREE[nodeKey];
    setCurrentNode(nodeKey);
    setMessageQueue(node.messages);
  };

  const handleOption = (option) => {
    setChatHistory((prev) => [
      ...prev,
      { type: "user", text: option.label },
    ]);
    if (option.next) {
      setTimeout(() => queueMessages(option.next), 400);
    }
  };

  const node = CHAT_TREE[currentNode];
  const showOptions =
    node &&
    node.options.length > 0 &&
    messageQueue.length === 0 &&
    !typing &&
    chatHistory.length > 0 &&
    chatHistory[chatHistory.length - 1].type === "isaac";

  return (
    <Page
      title="Contact"
      description="How to get in contact with me."
      gridArea="1 / 1 / 4 / 7"
    >
      <div className={styles.background} />
      <div className={styles.grid}>
        <div className={styles.gridLeft}>
          <div className={styles.contactWrapper}>
            <h1 className={styles.heading}>Contact Me</h1>
            <h2 className={styles.shoutOut}>Shoot me a message.</h2>
            <h2 className={styles.shoutOut}>
              If it&#39;s interesting, I&#39;ll respond.
            </h2>
            <dl className={styles.contactList}>
              <dt className={styles.contactKey}>Email</dt>
              <dd className={styles.contactValue}>
                <a
                  className={styles.contactLink}
                  href="mailto:isaac@bythewood.me"
                >
                  isaac@bythewood.me
                </a>
              </dd>
              <dt className={styles.contactKey}>LinkedIn</dt>
              <dd className={styles.contactValue}>
                <a
                  className={styles.contactLink}
                  href="https://www.linkedin.com/in/isaac-bythewood/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Isaac Bythewood
                </a>
              </dd>
              <dt className={styles.contactKey}>GitHub</dt>
              <dd className={styles.contactValue}>
                <a
                  className={styles.contactLink}
                  href="https://github.com/overshard"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  /overshard
                </a>
              </dd>
              <dt className={styles.contactKey}>Discord</dt>
              <dd className={styles.contactValue}>
                <a
                  className={styles.contactLink}
                  href="https://discordapp.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Overshard#4907
                </a>
              </dd>
            </dl>
          </div>
        </div>
        <div className={styles.gridRight} ref={chatContainerRef}>
          <div className={styles.chat}>
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`${styles.chatLine} ${
                  msg.type === "user" ? styles.chatLineUser : ""
                }`}
              >
                {msg.type === "isaac" && (
                  <span className={styles.chatAvatar}>
                    <Image
                      src="/static/images/avatar.webp"
                      alt="Isaac"
                      width={40}
                      height={40}
                    />
                  </span>
                )}
                <div
                  className={`${styles.chatBubble} ${
                    msg.type === "user" ? styles.chatBubbleUser : ""
                  }`}
                >
                  {msg.text}
                  {msg.type === "isaac" && <span>Isaac</span>}
                </div>
              </div>
            ))}
            {typing && (
              <div className={styles.chatLine}>
                <span className={styles.chatAvatar}>
                  <Image
                    src="/static/images/avatar.webp"
                    alt="Isaac"
                    width={40}
                    height={40}
                  />
                </span>
                <div className={styles.chatBubble}>
                  <span className={styles.typingDots}>
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}
            {showOptions && (
              <div className={styles.chatOptions}>
                {node.options.map((opt, i) => (
                  <button
                    key={i}
                    className={styles.chatOption}
                    onClick={() => handleOption(opt)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </Page>
  );
};

export default Contact;
