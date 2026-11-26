// ArchitectureCase: the real-life ProjectDetail example.
//
// What it shows: the page of one project of an architecture office: facts (role, client, year, category, services),
// the story, a gallery that opens in a Lightbox, a press link and a back button, with the page's labels in Turkish.
// When to use this pattern: a portfolio or case-study page; the same project object can feed a ProjectGrid card.
//
// Accessibility: an article with one h1; the facts are a description list; gallery images are buttons that open the
// Lightbox (focus returns on close). Animation: the entrance (reveal) runs on the motion engine, so reduced motion,
// global speed and "Stop all" apply; `reveal={false}` turns it off.

import { ProjectDetail } from "march/landing"
import { toast } from "march/ui"

// The shape of a project: the cover and the gallery items are either an image ({ src, alt, width, height }) or a node.
// An image with its size, so the layout reserves the space before it loads.
type Picture = { src: string; alt: string; width: number; height: number }
// What a ProjectGrid card needs: id, title and a cover; the rest is optional.
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; cover: Node | Picture }
// What the detail page adds: role, client, services, the story (body), a gallery and links.
type ProjectDetails = Project & { role?: string; client?: string; services?: string[]; body?: unknown; gallery?: (Node | Picture)[]; links?: { label: string; href: string }[] }
// The data of this project. Texts here are content, so they stay Turkish.
const PROJECT: ProjectDetails = {
  id: "bag-evi", title: "Bağ Evi, Urla", category: "Konut", year: 2025,
  summary: "Zeytin ağaçlarının arasında, güneşi takip eden tek katlı bir ev.",
  role: "Mimari tasarım ve uygulama", client: "Özel müşteri", services: ["Mimari", "İç mekân", "Peyzaj"],
  cover: { src: "/media/dusk.jpg", alt: "Akşam ışığında ev", width: 1200, height: 800 },
  body: [
    <p>Arsadaki 40 yaşındaki zeytin ağaçlarının hiçbiri kesilmedi; ev, ağaçların arasındaki boşluğa yerleşti.</p>,
    <p>Geniş saçaklar yazın güneşi keser, kışın içeri alır. Yerel taş duvarlar evi serin tutar.</p>,
  ],
  gallery: [
    { src: "/media/dusk.jpg", alt: "Batıya bakan teras", width: 1200, height: 800 },
    { src: "/media/hadi-waves.jpg", alt: "Malzeme paleti", width: 960, height: 540 },
  ],
  links: [{ label: "Basında", href: "#basin" }],
}

export function ArchitectureCase() {
  // - project: the data above. onBack: giving it shows the back button.
  // - labels: the page's own texts (back button and the names of the facts); the others keep the built-in text.
  return <ProjectDetail project={PROJECT} onBack={() => toast("Projeler listesine dönülüyor")}
    labels={{ back: "Tüm projeler", role: "Rol", client: "Müşteri", year: "Yıl", category: "Tür", services: "Hizmetler" }} />
}
