import { SectionTimeline, Card } from "march/ui"

// zirveye tırmanış: kutuyu kaydırdıkça noktalar kamp kamp yeşerir, bir noktaya basınca o kampa çıkılır
const camps = [
  { name: "Ana kamp", m: 2400, note: "Çadırlar kuruldu, çay demlendi." },
  { name: "Kamp 1", m: 3100, note: "Buzul başlıyor, kramponlar takıldı." },
  { name: "Kamp 2", m: 3800, note: "Rüzgâr sert, ip sıkı." },
  { name: "Son durak", m: 4300, note: "Oksijen az, adımlar kısa." },
  { name: "Zirve", m: 4810, note: "Bayrak dikildi, manzara bedava!" },
]

export function SummitTrail() {
  let $at = -1
  let box: HTMLElement | undefined
  const items = camps.map((c, i) => ({ label: c.name, target: () => box?.querySelector(`[data-camp="${i}"]`) ?? null }))
  // kayan kutunun yüksekliği style nesnesiyle (sx'te yükseklik yok)
  return <Card m:theme="night" title="Zirve yolu" sx={{ w: "sm" }}>
    <div sx={{ flex: "col", gap: 3 }}>
      <div ref={(el: HTMLElement) => box = el} style={{ "block-size": "11rem", overflow: "auto" }}>
        {camps.map((c, i) => <section data-camp={String(i)} sx={{ p: 4 }}>
          <h3>{`⛺ ${c.name}`}</h3>
          <p sx={{ color: "muted" }}>{`${c.m} m · ${c.note}`}</p>
        </section>)}
      </div>
      {/* ortada: büyüteç adları iki yana da açılır */}
      <div sx={{ flex: ["row", "center"] }}>
        <SectionTimeline items={items} root={() => box} orientation="horizontal" line={0.7} offset={0} m:color="brand-green"
          onChange={(i: number) => $at = i} />
      </div>
      <span sx={{ text: "lg", color: "brand-green" }}>{$at < 0 ? "Yola çık: kutuyu kaydır" : `Rakım: ${camps[$at].m} m`}</span>
    </div>
  </Card>
}
