// ProjectDetailLab: the full-featured ProjectDetail example; it uses every prop at least once.
//
// Props shown here: project (title, category, year, summary, cover, role, client, services, body, gallery, links),
// onBack, next, shared, eyebrow, facts, backIcon / nextIcon, reveal, labels and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ProjectDetailLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { ProjectDetail } from "march/landing"
import { Toggle, Card } from "march/ui"
import { chevronLeft, sparkles } from "march/icons"

// The shape of a project: the cover and the gallery items are either an image or a node.
// An image with its size, so the layout reserves the space before it loads.
type Picture = { src: string; alt: string; width: number; height: number }
// What a ProjectGrid card needs: id, title and a cover; the rest is optional.
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; cover: Node | Picture }
// What the detail page adds: role, client, services, the story (body), a gallery and links.
type ProjectDetails = Project & { role?: string; client?: string; services?: string[]; body?: unknown; gallery?: (Node | Picture)[]; links?: { label: string; href: string }[] }
// A colour block standing in for a picture (a node cover); aria-hidden because it is decoration.
const Art = (p: { color: string; label: string }) =>
  <div style={{ background: p.color, color: "#fff", "aspect-ratio": "16 / 9", display: "grid", "place-items": "center", "font-size": "3rem" }} aria-hidden="true">{p.label}</div>

// The projects of the Lab; "next" walks through them.
const LIST = [
  { id: "atlas", title: "Atlas Banka", color: "#7c5cff" },
  { id: "kite", title: "Kite uygulaması", color: "#2bb8ff" },
  { id: "lumen", title: "Lumen panosu", color: "#ff7a59" },
]
//  Builds the data of project number i. A fresh cover node is made on every call, because a DOM node can only be in one
// place.
const project = (i: number): ProjectDetails => {
  const r = LIST[i % LIST.length]!
  return {
    id: r.id, title: r.title, category: "Marka", year: 2026, summary: "Kimlik, web sitesi ve hareket dili.",
    role: "Tasarım ve ön yüz", client: r.title, services: ["Kimlik", "Web", "Hareket"],
    cover: <Art color={r.color} label={r.title[0]!} /> as Node,
    body: <p>Bir haftalık keşifle başladık; tek bir hareket fikri bütün işi taşıdı.</p>,
    gallery: [<Art color="#3ecf8e" label="1" /> as Node, { src: "/media/hadi-waves.jpg", alt: "Dalgalar", width: 960, height: 540 }],
    links: [{ label: "Siteyi gör", href: "#site" }],
  }
}

export function ProjectDetailLab() {
  // Which project is open.
  let $i = 0
  // Whether the category line above the title is shown.
  let $eyebrow = true
  // Whether the facts list is shown.
  let $facts = true
  // Whether the entrance animation is on.
  let $motion = false
  // How many times the back button was pressed.
  let $backs = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Controls of the Lab: they change the props below live. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Kategori satırı" bind:value={$eyebrow} />
        <Toggle label="Künye" bind:value={$facts} />
        <Toggle label="Giriş hareketi" bind:value={$motion} />
      </div>
      <p sx={{ color: "muted" }}>Geri basıldı: {$backs}</p>
    </Card>
    {/* The page is drawn inside a function so it is rebuilt when a switch or the project index changes. */}
    {() => {
      // The signals are read here: when one changes, the page is drawn again.
      const i = $i, eyebrow = $eyebrow, facts = $facts, motion = $motion
      // - project: the data; shared: the shared-element name of the cover (a ProjectGrid card uses the same name).
      // - onBack: shows the back button; backIcon and nextIcon: your own icons (or false for none).
      // - next: { project, onOpen }: the next-project card; its onOpen is where you switch projects.
      // - eyebrow and facts: the category line and the facts list; reveal: the entrance ({ effect, stagger } or false).
      // - labels: every text the page writes itself (openImage is a function of the image number); class: on the
      //   article.
      return <ProjectDetail class="lab-detail" project={project(i)} shared={`lab-${i}`}
        onBack={() => $backs++} backIcon={chevronLeft} nextIcon={sparkles}
        next={{ project: project(i + 1) as Project, onOpen: () => $i = (i + 1) % LIST.length }}
        eyebrow={eyebrow} facts={facts} reveal={motion ? { effect: "blur", stagger: 60 } : false}
      labels={{ back: "Listeye dön", next: "Sıradaki iş", role: "Rol", client: "Müşteri", year: "Yıl", category: "Alan",
        services: "Hizmetler", openImage: (n: number) => `${n}. görseli büyüt` }} />
    }}
  </div>
}
