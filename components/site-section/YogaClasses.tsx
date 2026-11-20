import { SiteSection } from "march/landing"
import { Card, Badge } from "march/ui"

// bir yoga stüdyosunun sitesinde ders programı bölümü: başlık grubu ve içinde ders kartları
const CLASSES = [
  { name: "Sabah akışı", time: "Pzt · Çar · Cum 07:30", level: "Herkes" },
  { name: "Yin yoga", time: "Salı 19:00", level: "Başlangıç" },
  { name: "Güç yogası", time: "Perşembe 18:30", level: "İleri" },
]

const ClassCard = (p: { name: string; time: string; level: string }) => <Card>
  <div sx={{ flex: "col", gap: 2 }}>
    <strong sx={{ text: "lg" }}>{p.name}</strong>
    <span sx={{ color: "muted" }}>{p.time}</span>
    <div><Badge tone="primary">{p.level}</Badge></div>
  </div>
</Card>

export function YogaClasses() {
  return <SiteSection id="dersler" tone="muted" eyebrow="Ders programı" title="Haftaya nefes al"
    lead="Moda'daki stüdyomuzda her seviyeye uygun dersler. İlk ders ücretsiz." m:color="brand-green">
    <div sx={{ grid: "fit", gap: 4 }}>
      {CLASSES.map((c) => <ClassCard {...c} />)}
    </div>
  </SiteSection>
}
