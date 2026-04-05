import React from "react";
import PropTypes from "prop-types";
import styles from "@styles/pages/code.module.css";

import Page from "../components/page";

const GitHubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
};

const PROJECTS = [
  {
    name: "Taproot",
    slug: "taproot",
    description:
      "Dotfiles, containers, and the configs that make a machine mine.",
    tech: ["Docker", "Shell"],
  },
  {
    name: "darkfurrow.com",
    slug: "darkfurrow.com",
    description:
      "A living almanac of seasons, soil, and the quiet knowledge that used to be common.",
    tech: ["Python", "Flask"],
  },
  {
    name: "Analytics",
    slug: "analytics",
    description:
      "A self-hostable analytics service with a straightforward API to track events from any source.",
    tech: ["Python", "Django", "API"],
  },
  {
    name: "Status",
    slug: "status",
    description: "A self-hosted status monitoring service.",
    tech: ["Python", "Django"],
  },
  {
    name: "blog.bythewood.me",
    slug: "blog.bythewood.me",
    description:
      "A self-hostable blog built on Flask for developers with code blocks, syntax highlighting, live search, great SEO, and a clean customizable UI.",
    tech: ["Python", "Flask"],
  },
  {
    name: "Timelite",
    slug: "timelite",
    description:
      "A simple time tracking progressive web app. Uses local storage and service workers to remain accessible offline.",
    tech: ["JavaScript", "PWA"],
  },
  {
    name: "isaacbythewood.com",
    slug: "isaacbythewood.com",
    description: "The personal website you are looking at right now.",
    tech: ["Next.js", "React", "CSS"],
  },
];

const Code = ({ commits }) => {
  return (
    <Page title="Code" description="Some of my most recent coding projects.">
      <div className={styles.background} />
      <h1 className={styles.heading}>Code</h1>
      <p className={styles.paragraph}>
        Outside of work I build self-hosted tools, personal websites, and
        whatever else catches my interest. Side projects are where I experiment
        with new technology and stay sharp since at work I stick to stable,
        mature frameworks. There is plenty more to see on{" "}
        <a
          href="https://github.com/overshard"
          rel="noopener noreferrer"
          target="_blank"
        >
          my GitHub account
        </a>
        .
      </p>
      <div className={styles.projects}>
        {PROJECTS.map((project, index) => (
          <div
            key={project.slug}
            className={styles.project}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h2 className={styles.projectHeading}>{project.name}</h2>
            <div className={styles.tags}>
              {project.tech.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className={styles.projectParagraph}>{project.description}</p>
            {commits[project.slug] && (
              <pre className={styles.projectCommit}>
                {JSON.stringify(commits[project.slug], null, 2)}
              </pre>
            )}
            <a
              className={styles.projectButton}
              href={`https://github.com/overshard/${project.slug}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        ))}
      </div>
    </Page>
  );
};

export async function getStaticProps() {
  const getCommit = async (repo) => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/overshard/${repo}/commits?per_page=1`
      );
      if (!res.ok) {
        console.error(`GitHub API failed for ${repo}: ${res.status}`);
        return null;
      }
      const commits = await res.json();
      if (!Array.isArray(commits) || commits.length === 0) return null;
      const commit = commits[0];
      return {
        sha: commit.sha ? commit.sha.substring(0, 7) : null,
        message: commit.commit?.message || null,
        date: commit.commit?.author?.date || null,
        author: commit.commit?.author?.name || null,
      };
    } catch (err) {
      console.error(`Failed to fetch commits for ${repo}:`, err);
      return null;
    }
  };

  const results = await Promise.all(
    PROJECTS.map(async (project) => [
      project.slug,
      await getCommit(project.slug),
    ])
  );

  const commits = Object.fromEntries(results);

  return {
    props: { commits },
    revalidate: 3600,
  };
}

Code.propTypes = {
  commits: PropTypes.object,
};

export default Code;
