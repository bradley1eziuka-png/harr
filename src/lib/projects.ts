// ───────────────────────────────────────────────────────────────────────────
// Real before/after project photos.
//
// To add a project when Benjamin sends photos:
//   1. Put the images in /public/projects/ (e.g. kitchen-before.jpg).
//   2. Add an entry below. The gallery picks it up automatically.
//
// Only add genuine photos of Harr's Painting and Services work. While this
// list is empty the gallery shows a clearly-labelled placeholder state.
// ───────────────────────────────────────────────────────────────────────────

export type Project = {
  title: string;
  /** e.g. "/projects/kitchen-before.jpg" */
  before: string;
  after: string;
  /** Short, factual description of what the photos show. */
  alt: string;
  /** Optional caption, e.g. the type of work. Do not invent details. */
  caption?: string;
};

export const PROJECTS: Project[] = [];
