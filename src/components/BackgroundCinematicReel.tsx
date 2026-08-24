"use client";

import { useEffect, useRef, useState } from "react";

type Clip = {
  /** Drop-in slot served from /public/videos. */
  local: string;
  /** High-uptime public H.264 streams used when the local file is absent. */
  fallbacks: string[];
};

const CLIP_DURATION_MS = 5000;
const CROSSFADE_MS = 1000;

const CLIPS: Clip[] = [
  {
    local: "/videos/clip-1.mp4",
    fallbacks: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    ],
  },
  {
    local: "/videos/clip-2.mp4",
    fallbacks: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    ],
  },
  {
    local: "/videos/clip-3.mp4",
    fallbacks: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    ],
  },
  {
    local: "/videos/clip-4.mp4",
    fallbacks: [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    ],
  },
];

/**
 * Four-clip atmosphere reel cycling every five seconds behind all content.
 * Two logical layers cross-fade over one second so cuts never flicker;
 * each slot chains a local file into two CDN mirrors for zero-config uptime.
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

  // Programmatic kick bypasses autoplay heuristics that ignore the attribute
  // on first paint (Safari low-power mode, embedded webviews).
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video || i !== idxRef.current) return;
      const kick = video.play();
      if (kick !== undefined) kick.catch(() => undefined);
    });
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
  // park everything else.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === current) {
        const req = video.play();
        if (req !== undefined) req.catch(() => undefined);
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bond-black"
    >
      {CLIPS.map((clip, i) => (
        <video
          key={clip.local}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 will-change-[opacity] md:[filter:blur(10px)_brightness(0.28)_contrast(1.1)_saturate(0.7)] ${
            i === current || i === previous ? "opacity-100" : "opacity-0"
          }`}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="auto"
        >
          <source src={clip.local} type="video/mp4" />
          {clip.fallbacks.map((url) => (
            <source key={url} src={url} type="video/mp4" />
          ))}
        </video>
      ))}

      {/* Tactical overlays: readability scrim, MI6 scanline grid, vignette */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(212,175,55,0.05) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(212,175,55,0.05) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(8,9,10,0.75) 78%, rgba(8,9,10,0.95) 100%)",
        }}
      />
    </div>
  );
}