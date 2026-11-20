import { ProjectDetail } from "march/landing"
import { Toggle, Card } from "march/ui"
import { chevronLeft, sparkles } from "march/icons"

// ProjectDetail'in bütün özellikleri bir arada: proje (başlık, kategori, yıl, özet, kapak, rol, müşteri, hizmetler,
// hikâye, galeri, bağlantılar), geri dönüş (onBack), sonraki proje (next), paylaşılan ad (shared), kategori satırı
// (eyebrow), künye (facts), geri ve sonraki ikonları, giriş hareketi (reveal), kendi metinler (labels) ve sınıf
// bir projenin biçimi (kapak ve galeri: görsel ya da düğüm)
type Picture = { src: string; alt: string; width: number; height: number }
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; cover: Node | Picture }
type ProjectDetails = Project & { role?: string; client?: string; services?: string[]; body?: unknown; gallery?: (Node | Picture)[]; links?: { label: string; href: string }[] }
const Art = (p: { color: string; label: string }) =>
  <div style={{ background: p.color, color: "#fff", "aspect-ratio": "16 / 9", display: "grid", "place-items": "center", "font-size": "3rem" }} aria-hidden="true">{p.label}</div>

const LIST = [
  { id: "atlas", title: "Atlas Banka", color: "#7c5cff" },
  { id: "kite", title: "Kite uygulaması", color: "#2bb8ff" },
  { id: "lumen", title: "Lumen panosu", color: "#ff7a59" },
]
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
  let $i = 0
  let $eyebrow = true
  let $facts = true
  let $motion = false
  let $backs = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Kategori satırı" bind:value={$eyebrow} />
        <Toggle label="Künye" bind:value={$facts} />
        <Toggle label="Giriş hareketi" bind:value={$motion} />
      </div>
      <p sx={{ color: "muted" }}>Geri basıldı: {$backs}</p>
    </Card>
    {() => {
      // sinyaller burada okunur: değişince sayfa yeniden çizilir
      const i = $i, eyebrow = $eyebrow, facts = $facts, motion = $motion
      return <ProjectDetail class="lab-detail" project={project(i)} shared={`lab-${i}`}
        onBack={() => $backs++} backIcon={chevronLeft} nextIcon={sparkles}
        next={{ project: project(i + 1) as Project, onOpen: () => $i = (i + 1) % LIST.length }}
        eyebrow={eyebrow} facts={facts} reveal={motion ? { effect: "blur", stagger: 60 } : false}
      labels={{ back: "Listeye dön", next: "Sıradaki iş", role: "Rol", client: "Müşteri", year: "Yıl", category: "Alan",
        services: "Hizmetler", openImage: (n: number) => `${n}. görseli büyüt` }} />
    }}
  </div>
}
