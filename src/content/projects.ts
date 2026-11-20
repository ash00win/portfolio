import type { ArtKind } from "@/components/project-art";

// Web apps shown as overview cards ("Beyond websites"), three to a row.
// Real projects only; keep each summary to one or two sentences.
// `art` picks the illustrated mockup shown at the top of the card.

export type Project = {
  name: string;
  kind: string;
  year: string;
  summary: string;
  stack: string[];
  art: ArtKind;
};

export const projects: Project[] = [
  {
    name: "CelerSCET",
    kind: "Production ERP",
    year: "2026",
    summary:
      "The ERP a college's staff and students use every day. I own the attendance and timetable modules, from database to UI.",
    stack: ["React", "Node.js", "PostgreSQL"],
    art: "erp",
  },
  {
    name: "TeamFlow",
    kind: "SaaS backend",
    year: "2026",
    summary: "Multi-tenant project management API with role-based access, background jobs and a Docker setup.",
    stack: ["Django", "Celery", "Docker"],
    art: "kanban",
  },
  {
    name: "Cinemate",
    kind: "Movie discovery app",
    year: "2025",
    summary: "Search movies, browse by genre, explore cast pages and keep a watchlist that persists across sessions.",
    stack: ["React", "Redux", "Django"],
    art: "movies",
  },
];
