import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@styles/components/loader.module.css";

const Loader = () => {
  const router = useRouter();
  const [ready, setReady] = useState(router.pathname !== "/");

  useEffect(() => {
    const handler = () => setReady(true);
    window.addEventListener("loaderReady", handler);
    return () => window.removeEventListener("loaderReady", handler);
  }, []);

  return (
    <>
      <div className={styles.grid}>
        {Array(6)
          .fill()
          .map((_, i) => {
            const column = i + 1;
            return (
              <div
                key={column}
                className={styles.gridColumn}
                style={{
                  gridColumn: column,
                  ["--delay"]: `${column * 100}ms`,
                  ["--play-state"]: ready ? "running" : "paused",
                }}
              />
            );
          })}
        <div
          className={styles.indicator}
          data-ready={ready ? "true" : "false"}
          aria-hidden="true"
        >
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </>
  );
};

export default Loader;
