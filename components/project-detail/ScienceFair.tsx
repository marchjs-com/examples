// ScienceFair: the creative-minimal ProjectDetail example.
//
// What it shows: three student projects on one page. The "next project" card at the bottom opens the next one, and
// the last one leads back to the first. When to use this pattern: stepping through a list of case studies without a
// grid page in between.
//
// Animation: reveal={false} switches off the entrance here (each project replaces the last one at once); the default
// entrance runs on the motion engine and honours reduced motion, global speed and "Stop all".
// Accessibility: an article with one h1; the next-project card is a button because onOpen is given.

import { ProjectDetail } from "march/landing"

// The shape of a project: the cover and the gallery items are either an image or a node.
// An image with its size, so the layout reserves the space before it loads.
type Picture = { src: string; alt: string; width: number; height: number }
// What a ProjectGrid card needs: id, title and a cover; the rest is optional.
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; cover: Node | Picture }
// What the detail page adds: role, client, services, the story (body), a gallery and links.
type ProjectDetails = Project & { role?: string; client?: string; services?: string[]; body?: unknown; gallery?: (Node | Picture)[]; links?: { label: string; href: string }[] }
// A big emoji standing in for a cover picture.
const Big = (p: { emoji: string }) => <div style={{ "font-size": "5rem", "text-align": "center", padding: "2rem" }} aria-hidden="true">{p.emoji}</div>

// The projects. Texts here are content, so they stay Turkish.
const RAW = [
  { id: "volkan", title: "Köpüren volkan", category: "Kimya", year: "5. sınıf", summary: "Sirke ve karbonatla patlayan bir dağ.", emoji: "🌋" },
  { id: "fasulye", title: "Işığa dönen fasulye", category: "Biyoloji", year: "4. sınıf", summary: "Bir kutuda labirent çözen filiz.", emoji: "🌱" },
  { id: "pil", title: "Limon pili", category: "Fizik", year: "6. sınıf", summary: "Dört limonla yanan bir LED.", emoji: "🍋" },
]
// A fresh cover node on every call: a DOM node can only be in one place.
const project = (i: number): ProjectDetails => { const r = RAW[i]!; return { ...r, cover: <Big emoji={r.emoji} /> as Node } }

export function ScienceFair() {
  // Index of the open project.
  let $i = 0
  return <div>
    {/* Drawn inside a function: when $i changes the page is built again for the new project. */}
    {() => {
      // Read the signal here so this function re-runs when it changes.
      const i = $i
      // - reveal={false}: no entrance animation.
      // - next: { project, onOpen }: the card for the following project (the modulo wraps from the last to the first).
      return <ProjectDetail project={project(i)} reveal={false}
        next={{ project: project((i + 1) % RAW.length), onOpen: () => $i = (i + 1) % RAW.length }} />
    }}
  </div>
}
