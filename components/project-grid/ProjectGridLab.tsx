// ProjectGridLab: the full-featured ProjectGrid example; it uses every prop at least once.
//
// Props shown here: projects (an image or a node as cover, category, year, summary, href), filters, cols, onOpen,
// lightbox, allLabel, filtersLabel, arrow, motion, reveal and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ProjectGridLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { ProjectGrid } from "march/landing"
import { Toggle, Card } from "march/ui"

//  The shape of a card: a cover that is either an image or a node, plus a title and optional category, year, summary
// and href.
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; href?: string; cover: Node | { src: string; alt: string; width: number; height: number } }
// A colour block standing in for a picture (a node cover); aria-hidden because it is decoration.
const Art = (p: { color: string; label: string }) =>
  <div style={{ background: p.color, color: "#fff", "aspect-ratio": "4 / 3", display: "grid", "place-items": "center", "font-size": "2rem" }} aria-hidden="true">{p.label}</div>

// New cover nodes on every call, because a DOM node can only be in one place.
// The projects. A cover is an image ({ src, alt, width, height }) or a node; `href` makes a card a link.
const work = (): Project[] => [
  { id: "atlas", title: "Atlas Banka", category: "Marka", year: 2026, summary: "Kimlik ve web sitesi.", cover: <Art color="#7c5cff" label="A" /> as Node },
  { id: "kite", title: "Kite uygulaması", category: "Uygulama", year: 2026, summary: "Seyahat planlayıcı.", cover: <Art color="#2bb8ff" label="K" /> as Node },
  { id: "lumen", title: "Lumen panosu", category: "Web", year: 2025, cover: { src: "/media/hadi-waves.jpg", alt: "Dalgalar", width: 960, height: 540 } },
  { id: "orbit", title: "Orbit konferansı", category: "Marka", year: 2025, summary: "Etkinlik kimliği.", cover: <Art color="#ff7a59" label="O" /> as Node, href: "#orbit" },
]

export function ProjectGridLab() {
  // Whether the filter chips are shown.
  let $filters = true
  // Two columns instead of three.
  let $two = false
  // Whether filtering is animated.
  let $motion = false
  // Whether the badge on each cover shows the year instead of the arrow.
  let $ownArrow = false
  // Whether we handle opening ourselves (onOpen) or let the grid use its Lightbox.
  let $useOpen = true
  // The title of the last opened project.
  let $opened = "henüz yok"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Switches of the Lab: they change the props below live. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Süzgeçler" bind:value={$filters} />
        <Toggle label="İki sütun" bind:value={$two} />
        <Toggle label="Süzerken hareket" bind:value={$motion} />
        <Toggle label="Rozette yıl" bind:value={$ownArrow} />
        <Toggle label="Kendim açarım (onOpen)" bind:value={$useOpen} />
      </div>
      <p sx={{ color: "muted" }}>Açılan: {$opened}</p>
    </Card>
    {/* The grid is drawn inside a function so it is rebuilt when a switch changes. */}
    {() => {
      // The signals are read here: when one changes, the grid is drawn again.
      const filters = $filters, two = $two, motion = $motion, ownArrow = $ownArrow, useOpen = $useOpen
      // - projects, filters (chips from the categories), cols (2 or 3), onOpen(project, coverElement).
      // - lightbox: when onOpen is not given, a cover opens in the Lightbox; allLabel and filtersLabel: texts of the
      //   "all" chip
      //   and of the chip group (its accessible name); motion: animate the filter change.
      // - arrow: true (the arrow badge) or a function that returns your own content; reveal: entrance of the cards;
      //   class: on the root.
      return <ProjectGrid class="lab-grid" projects={work()} filters={filters} cols={two ? 2 : 3}
        onOpen={useOpen ? (p: Project) => { $opened = String(p.title) } : undefined} lightbox
        allLabel="Tümü" filtersLabel="Projeleri süz" motion={motion}
        arrow={ownArrow ? (p: Project) => <span>{String(p.year)}</span> : true}
        reveal={{ effect: "scale", stagger: 50 }} />
    }}
  </div>
}
