import { ProjectDetail } from "march/landing"
import { toast } from "march/ui"

// bir mimarlık ofisinin proje sayfası: künye, hizmetler, hikâye, büyütülebilen galeri ve basın bağlantısı
// bir projenin biçimi (kapak ve galeri: görsel ya da düğüm)
type Picture = { src: string; alt: string; width: number; height: number }
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; cover: Node | Picture }
type ProjectDetails = Project & { role?: string; client?: string; services?: string[]; body?: unknown; gallery?: (Node | Picture)[]; links?: { label: string; href: string }[] }
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
  return <ProjectDetail project={PROJECT} onBack={() => toast("Projeler listesine dönülüyor")}
    labels={{ back: "Tüm projeler", role: "Rol", client: "Müşteri", year: "Yıl", category: "Tür", services: "Hizmetler" }} />
}
