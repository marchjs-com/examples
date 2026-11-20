import { ProjectGrid } from "march/landing"
import { Toggle, Card } from "march/ui"

// ProjectGrid'in bütün özellikleri bir arada: projeler (görsel ya da düğüm kapak, kategori, yıl, özet, bağlantı),
// süzgeçler, sütun, açma (onOpen), Lightbox, "Tümü" metni, süzgeç grubunun adı, kapak rozeti, süzme hareketi,
// giriş hareketi (reveal) ve sınıf
// bir projenin biçimi: kapak bir görsel ya da düğüm
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; href?: string; cover: Node | { src: string; alt: string; width: number; height: number } }
const Art = (p: { color: string; label: string }) =>
  <div style={{ background: p.color, color: "#fff", "aspect-ratio": "4 / 3", display: "grid", "place-items": "center", "font-size": "2rem" }} aria-hidden="true">{p.label}</div>

// her çağrıda yeni kapak düğümleri: bir düğüm tek bir yerde durabilir
const work = (): Project[] => [
  { id: "atlas", title: "Atlas Banka", category: "Marka", year: 2026, summary: "Kimlik ve web sitesi.", cover: <Art color="#7c5cff" label="A" /> as Node },
  { id: "kite", title: "Kite uygulaması", category: "Uygulama", year: 2026, summary: "Seyahat planlayıcı.", cover: <Art color="#2bb8ff" label="K" /> as Node },
  { id: "lumen", title: "Lumen panosu", category: "Web", year: 2025, cover: { src: "/media/hadi-waves.jpg", alt: "Dalgalar", width: 960, height: 540 } },
  { id: "orbit", title: "Orbit konferansı", category: "Marka", year: 2025, summary: "Etkinlik kimliği.", cover: <Art color="#ff7a59" label="O" /> as Node, href: "#orbit" },
]

export function ProjectGridLab() {
  let $filters = true
  let $two = false
  let $motion = false
  let $ownArrow = false
  let $useOpen = true
  let $opened = "henüz yok"
  return <div sx={{ flex: "col", gap: 3 }}>
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
    {() => {
      // sinyaller burada okunur: değişince ızgara yeniden çizilir
      const filters = $filters, two = $two, motion = $motion, ownArrow = $ownArrow, useOpen = $useOpen
      return <ProjectGrid class="lab-grid" projects={work()} filters={filters} cols={two ? 2 : 3}
        onOpen={useOpen ? (p: Project) => { $opened = String(p.title) } : undefined} lightbox
        allLabel="Tümü" filtersLabel="Projeleri süz" motion={motion}
        arrow={ownArrow ? (p: Project) => <span>{String(p.year)}</span> : true}
        reveal={{ effect: "scale", stagger: 50 }} />
    }}
  </div>
}
