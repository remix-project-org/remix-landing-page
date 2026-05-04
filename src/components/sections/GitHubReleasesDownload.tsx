"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faCircleExclamation,
  faMobileScreenButton,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface Asset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  assets: Asset[];
  html_url: string;
}

const REPO_OWNER = "remix-project-org";
const REPO_NAME = "remix-desktop";

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(1) + " MB";
}

function getOSAssets(release: Release) {
  const a = release.assets;
  return {
    mac: a.find((x) => x.name.toLowerCase().endsWith(".dmg")) ?? null,
    windows:
      a.find(
        (x) =>
          x.name.toLowerCase().endsWith(".exe") ||
          (x.name.toLowerCase().includes("win") && x.name.toLowerCase().includes("setup"))
      ) ?? null,
    linux:
      a.find(
        (x) =>
          x.name.toLowerCase().endsWith(".deb") ||
          x.name.toLowerCase().endsWith(".rpm") ||
          x.name.toLowerCase().endsWith(".appimage")
      ) ?? null,
  };
}

export default function GitHubReleasesDownload() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userOS, setUserOS] = useState<"windows" | "mac" | "linux" | "unknown">("unknown");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const p = navigator.platform.toLowerCase();
    if (p.includes("win")) setUserOS("windows");
    else if (p.includes("mac")) setUserOS("mac");
    else if (p.includes("linux") || p.includes("x11")) setUserOS("linux");
    setIsMobile(/android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent));
  }, []);

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

  useEffect(() => { fetchReleases(); }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <FontAwesomeIcon icon={faMobileScreenButton} className="text-text-tertiary w-12 h-12 mb-6" />
        <h2 className="text-2xl font-bold text-text-primary mb-3">Not available on mobile</h2>
        <p className="text-text-secondary max-w-md">
          Visit this page from a Windows, macOS, or Linux computer to download Remix Desktop.
        </p>
      </div>
    );
  }

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

  const latestAssets = getOSAssets(latest);
  const userAsset =
    userOS === "mac" ? latestAssets.mac
    : userOS === "windows" ? latestAssets.windows
    : userOS === "linux" ? latestAssets.linux
    : null;

  const osLabel = { mac: "macOS", windows: "Windows", linux: "Linux", unknown: "" }[userOS];

  const OSCard = ({
    label,
    asset,
    highlighted,
  }: {
    label: string;
    asset: Asset | null;
    highlighted: boolean;
  }) => (
    <div
      className={`rounded-xl border p-5 bg-layer-1 flex flex-col gap-3 ${
        highlighted ? "border-primary/40" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-text-primary text-[14px]">{label}</span>
        {highlighted && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            Your OS
          </span>
        )}
      </div>
      {asset ? (
        <>
          <p className="text-[12px] text-text-tertiary truncate">{asset.name} &middot; {formatSize(asset.size)}</p>
          <a
            href={asset.browser_download_url}
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-bold text-[13px] transition-colors ${
              highlighted
                ? "bg-primary text-background hover:bg-primary/80"
                : "bg-layer-2 text-text-secondary hover:text-text-primary hover:bg-layer-3"
            }`}
          >
            <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
            Download
          </a>
        </>
      ) : (
        <p className="text-[12px] text-text-tertiary italic">No package available</p>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="bg-layer-1 border-b border-border px-6 xl:px-20 py-12">
        <div className="mx-auto max-w-[1280px]">

          {/* Title row */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-1">Remix Desktop</h1>
              <p className="text-text-secondary">Download the latest version</p>
            </div>
            <a
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-layer-2 border border-border rounded-lg text-text-secondary hover:text-text-primary transition-colors text-[13px] font-semibold shrink-0"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
              View on GitHub
            </a>
          </div>

          {/* Latest release box */}
          <div className="bg-layer-2 border border-border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary font-cabin">Latest Release</span>
              <h2 className="text-xl font-bold text-text-primary mt-1">{latest.name || latest.tag_name}</h2>
              <p className="text-[13px] text-text-tertiary mt-0.5">Released on {new Date(latest.published_at).toLocaleDateString()}</p>
            </div>
            {userAsset && (
              <a
                href={userAsset.browser_download_url}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/80 transition-colors text-[13px] shrink-0"
              >
                <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5" />
                Download for {osLabel}
              </a>
            )}
          </div>

        </div>
      </div>

      {/* OS download cards */}
      <div className="px-6 xl:px-20 py-10">
        <div className="mx-auto max-w-[1280px]">
          <h3 className="text-[16px] font-bold text-text-primary mb-5">Download Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <OSCard label="macOS" asset={latestAssets.mac} highlighted={userOS === "mac"} />
            <OSCard label="Windows" asset={latestAssets.windows} highlighted={userOS === "windows"} />
            <OSCard label="Linux" asset={latestAssets.linux} highlighted={userOS === "linux"} />
          </div>

          {/* Previous releases */}
          <h3 className="text-[16px] font-bold text-text-primary mb-5">Previous Releases</h3>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-layer-2 border-b border-border text-[12px] font-semibold text-text-tertiary uppercase tracking-widest">
              <div className="col-span-4">Version</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-5">Downloads</div>
            </div>
            {releases.slice(1, 6).map((release) => {
              const a = getOSAssets(release);
              return (
                <div key={release.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-border last:border-0 bg-layer-1 items-center">
                  <div className="col-span-4">
                    <a
                      href={release.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-medium text-primary hover:underline"
                    >
                      {release.name || release.tag_name}
                    </a>
                  </div>
                  <div className="col-span-3 text-[13px] text-text-tertiary">
                    {new Date(release.published_at).toLocaleDateString()}
                  </div>
                  <div className="col-span-5 flex flex-wrap gap-2">
                    {a.mac && (
                      <a href={a.mac.browser_download_url} className="text-[12px] px-2 py-1 rounded-md bg-layer-2 text-text-secondary hover:text-text-primary transition-colors">macOS</a>
                    )}
                    {a.windows && (
                      <a href={a.windows.browser_download_url} className="text-[12px] px-2 py-1 rounded-md bg-layer-2 text-text-secondary hover:text-text-primary transition-colors">Windows</a>
                    )}
                    {a.linux && (
                      <a href={a.linux.browser_download_url} className="text-[12px] px-2 py-1 rounded-md bg-layer-2 text-text-secondary hover:text-text-primary transition-colors">Linux</a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {releases.length > 6 && (
            <div className="mt-5 text-center">
              <a
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-primary hover:underline font-medium"
              >
                View all releases on GitHub →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
