import { ProjectGrid } from "march/landing"

// barınaktaki dostlar: kapaklar büyük emojiler, kedi / köpek / kuş süzgeci; birine basınca "sahiplen" sayacı artar
// bir projenin biçimi: kapak bir görsel ya da düğüm
type Project = { id: string; title: string; category?: string; year?: number | string; summary?: string; href?: string; cover: Node | { src: string; alt: string; width: number; height: number } }
const PETS = [
  { id: "pamuk", title: "Pamuk", category: "Kedi", year: "2 yaş", emoji: "🐱" },
  { id: "karabas", title: "Karabaş", category: "Köpek", year: "4 yaş", emoji: "🐶" },
  { id: "limon", title: "Limon", category: "Kuş", year: "1 yaş", emoji: "🐤" },
  { id: "tarcin", title: "Tarçın", category: "Kedi", year: "6 ay", emoji: "😺" },
  { id: "bulut", title: "Bulut", category: "Köpek", year: "3 yaş", emoji: "🐕" },
]

const Face = (p: { emoji: string }) => <div style={{ "font-size": "4rem", "text-align": "center", padding: "1.5rem" }} aria-hidden="true">{p.emoji}</div>

export function PetShelter() {
  let $adopted = 0
  const pets: Project[] = PETS.map((p) => ({ ...p, get cover() { return <Face emoji={p.emoji} /> as Node } }))
  return <div sx={{ flex: "col", gap: 3 }}>
    <strong>Sahiplenme isteği: {$adopted}</strong>
    <ProjectGrid projects={pets} cols={3} allLabel="Hepsi" onOpen={() => $adopted++} />
  </div>
}
