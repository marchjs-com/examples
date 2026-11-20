import { ProjectDetail } from "march/landing"

// bilim şenliği: üç öğrenci projesi; sondaki "sonraki proje" kartı bir sonrakini açar, sonuncudan başa döner
// bir projenin biçimi (kapak ve galeri: görsel ya da düğüm)
type Picture = { src: string; alt: string; width: number; height: number }
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; cover: Node | Picture }
type ProjectDetails = Project & { role?: string; client?: string; services?: string[]; body?: unknown; gallery?: (Node | Picture)[]; links?: { label: string; href: string }[] }
const Big = (p: { emoji: string }) => <div style={{ "font-size": "5rem", "text-align": "center", padding: "2rem" }} aria-hidden="true">{p.emoji}</div>

const RAW = [
  { id: "volkan", title: "Köpüren volkan", category: "Kimya", year: "5. sınıf", summary: "Sirke ve karbonatla patlayan bir dağ.", emoji: "🌋" },
  { id: "fasulye", title: "Işığa dönen fasulye", category: "Biyoloji", year: "4. sınıf", summary: "Bir kutuda labirent çözen filiz.", emoji: "🌱" },
  { id: "pil", title: "Limon pili", category: "Fizik", year: "6. sınıf", summary: "Dört limonla yanan bir LED.", emoji: "🍋" },
]
// her okumada yeni kapak düğümü
const project = (i: number): ProjectDetails => { const r = RAW[i]!; return { ...r, cover: <Big emoji={r.emoji} /> as Node } }

export function ScienceFair() {
  let $i = 0
  return <div>
    {() => {
      const i = $i
      return <ProjectDetail project={project(i)} reveal={false}
        next={{ project: project((i + 1) % RAW.length), onOpen: () => $i = (i + 1) % RAW.length }} />
    }}
  </div>
}
