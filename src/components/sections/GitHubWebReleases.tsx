"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import content from "@/content/releases.json";

interface Release {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
}

const REPO_OWNER = "ethereum";
const REPO_NAME = "remix-project";

export default function GitHubWebReleases() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReleases = () => {
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API error: ${r.status}`);
        return r.json();
      })
      .then((data: Release[]) => {
        setReleases(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-border border-t-primary rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Loading releases…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6 gap-4">
        <FontAwesomeIcon icon={faCircleExclamation} className="text-red-400 w-10 h-10" />
        <h2 className="text-xl font-bold text-text-primary">Failed to load releases</h2>
        <p className="text-text-secondary text-sm">{error}</p>
        <button
          onClick={fetchReleases}
          className="flex items-center gap-2 px-4 py-2 bg-layer-2 border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors text-sm"
        >
          <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5" />
          Try again
        </button>
      </div>
    );
  }

  const latest = releases[0] ?? null;
  if (!latest) return null;

  return (
    <>
      {/* Hero */}
      <section
        className="py-24 px-6 xl:px-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(100,196,255,0.10) 0%, transparent 60%), var(--color-background)",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-text-quaternary bg-layer-2 border border-border rounded-full px-3 py-1 font-cabin mb-6">
            {content.hero.tag}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3 leading-tight">
            {content.hero.titleStart}{" "}
            <span className="text-primary">{content.hero.titleAccent}</span>
          </h1>
          <p className="text-text-secondary mb-8">
            {latest.tag_name} &middot;{" "}
            {new Date(latest.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <Button href={latest.html_url} external size="lg">
              {content.hero.primaryCta.label}
            </Button>
            <Button href={content.hero.secondaryCta.href} variant="secondary" size="lg">
              {content.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </section>

      {/* Previous releases table */}
      <section className="py-16 px-6 xl:px-20 border-t border-border">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-[16px] font-bold text-text-primary mb-5">
            {content.tableLabels.title}
          </h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-layer-2 border-b border-border text-[12px] font-semibold text-text-tertiary uppercase tracking-widest">
              <div className="col-span-4">{content.tableLabels.version}</div>
              <div className="col-span-5">{content.tableLabels.date}</div>
              <div className="col-span-3"></div>
            </div>
            {releases.slice(1).map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-border last:border-0 bg-layer-1 items-center"
              >
                <div className="col-span-4">
                  <span className="text-[13px] font-medium text-primary">
                    {r.tag_name}
                  </span>
                </div>
                <div className="col-span-5 text-[13px] text-text-tertiary">
                  {new Date(r.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="col-span-3 flex justify-end">
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-semibold text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {content.cardLabels.readMore} →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <a
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-primary hover:underline font-medium"
            >
              {content.tableLabels.viewAll} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
