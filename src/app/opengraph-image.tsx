import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Rendered once at build time into a static PNG: the preview shown when the
// site link is shared on LinkedIn, WhatsApp, Slack or email.
export const dynamic = "force-static";
export const alt = `${profile.name}, freelance web developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fafaf9",
          color: "#0c0c0d",
        }}
      >
        <div style={{ fontSize: 32, color: "#62646a" }}>{`${profile.name} · ${profile.location}`}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>Sharp websites,</div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, color: "#9a9ca3" }}>
            built to perform.
          </div>
        </div>
        <div style={{ fontSize: 32, color: "#62646a" }}>{"Freelance web developer · React · Next.js · Tailwind CSS"}</div>
      </div>
    ),
    size,
  );
}
