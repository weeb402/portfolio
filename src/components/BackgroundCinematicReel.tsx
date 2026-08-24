"use client";

import { useEffect, useRef, useState } from "react";

type Clip = {
  /** Drop-in slot served from /public/videos. */
  local: string;
  /** Royalty-free CDN stream used when the local file is absent. */
  remote: string;
};

const CLIP_DURATION_MS = 5000;
const CROSSFADE_MS = 1000;

const CLIPS: Clip[] = [
  {
    local: "/videos/clip-1.mp4",
    remote:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    local: "/videos/clip-2.mp4",
    remote:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    local: "/videos/clip-3.mp4",
    remote:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    local: "/videos/clip-4.mp4",
    remote: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
];

/**
 * Four-clip atmosphere reel cycling every five seconds behind all content.
 * Two logical layers cross-fade over one second so cuts never flicker;
 * every source has a royalty-free CDN fallback when the local file is missing.
 */
export default function BackgroundCinematicReel() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const idxRef = useRef(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || CLIPS.length < 2) return;
    const id = window.setInterval(() => {
      const next = (idxRef.current + 1) % CLIPS.length;
      setPrevious(idxRef.current);
      setCurrent(next);
      idxRef.current = next;
    }, CLIP_DURATION_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  // Start the incoming clip, keep the outgoing one alive through the fade,
  // park everything else. .play() rejections (low-power mode) are swallowed.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === current) {
        video.play().catch(() => undefined);
      } else if (i !== previous) {
        video.pause();
      }
    });
    if (previous === null) return;
    const timer = window.setTimeout(() => setPrevious(null), CROSSFADE_MS + 100);
    return () => window.clearTimeout(timer);
  }, [current, previous]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[-10] h-[100dvh] overflow-hidden bg-bond-black"
    >
      {CLIPS.map((clip, i) => (
        <video
          key={clip.local}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={`absolute inset-x-0 top-0 h-full w-full object-cover transition-opacity duration-1000 will-change-[opacity] md:[filter:blur(10px)_brightness(0.22)_contrast(1.1)_saturate(0.7)] ${
            i === current || i === previous ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={i === 0 && !reducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={clip.local} type="video/mp4" />
          <source src={clip.remote} type="video/mp4" />
        </video>
      ))}

      {/* Tactical overlays: scrim (heavier on mobile where the blur is off),
          MI6 scanline grid, vignette */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] md:bg-black/60" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(197,160,89,0.05) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(197,160,89,0.05) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.75) 78%, rgba(5,5,5,0.95) 100%)",
        }}
      />
    </div>
  );
}
