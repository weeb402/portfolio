"use client";

export default function ReplayIntroButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          sessionStorage.removeItem("mi6-intro-complete");
        } catch {
          /* noop */
        }
        window.location.reload();
      }}
      className="transition-colors hover:text-bond-gold"
    >
      Replay Clearance Sequence
    </button>
  );
}
