// SummitTrail: the creative-minimal SectionTimeline example.
//
// What it shows: a climb to a summit in a small scrolling box. A horizontal row of dots, one per camp, turns green camp
// by camp as you scroll; pressing a dot climbs to that camp, and a line below shows the altitude of the camp reached.
// When to use this pattern: the smallest useful timeline: items, a scrolling `root`, an orientation and an onChange
// callback. The dots do the navigation, so no other control is needed.
import { SectionTimeline, Card } from "march/ui"

// The camps: a name, the altitude in metres and a note.
const camps = [
  { name: "Ana kamp", m: 2400, note: "Çadırlar kuruldu, çay demlendi." },
  { name: "Kamp 1", m: 3100, note: "Buzul başlıyor, kramponlar takıldı." },
  { name: "Kamp 2", m: 3800, note: "Rüzgâr sert, ip sıkı." },
  { name: "Son durak", m: 4300, note: "Oksijen az, adımlar kısa." },
  { name: "Zirve", m: 4810, note: "Bayrak dikildi, manzara bedava!" },
]

export function SummitTrail() {
  // `let $at` is a March signal: onChange writes the index of the camp being read (-1 before the first) and the altitude
  // line below redraws.
  let $at = -1
  // The scrolling box; the ref below fills it in once it exists.
  let box: HTMLElement | undefined
  // One item per camp: its name and a `target` function that finds the section inside the box (null while missing).
  const items = camps.map((c, i) => ({ label: c.name, target: () => box?.querySelector(`[data-camp="${i}"]`) ?? null }))
  // The scrolling box's height is set with a style object, because sx has no height token.
  // m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme.
  return <Card m:theme="night" title="Zirve yolu" sx={{ w: "sm" }}>
    <div sx={{ flex: "col", gap: 3 }}>
      <div ref={(el: HTMLElement) => box = el} style={{ "block-size": "11rem", overflow: "auto" }}>
        {camps.map((c, i) => <section data-camp={String(i)} sx={{ p: 4 }}>
          <h3>{`⛺ ${c.name}`}</h3>
          <p sx={{ color: "muted" }}>{`${c.m} m · ${c.note}`}</p>
        </section>)}
      </div>
      {/* The timeline sits in a centred row, so the magnifier's names can open to both sides.
          - orientation="horizontal": a row of dots instead of a column.
          - root={() => box}: the box that scrolls.
          - line={0.7}: the reading line is 70 % down the box, so a camp counts as reached a little later than with the
            default 0.33.
          - offset={0}: no room kept above a camp when scrolling to it (the default 80 px is for a sticky top bar).
          - m:color="brand-green": the colour of the dots (a common prop).
          - onChange(index): the camp being read changed; it feeds the altitude line.
          The dots are a nav with buttons: the camp being read has aria-current="location" and is the one tab stop; the
          arrow keys, Home and End move between them. Motion (the wave of colour, scrolling) follows reduced motion. */}
      <div sx={{ flex: ["row", "center"] }}>
        <SectionTimeline items={items} root={() => box} orientation="horizontal" line={0.7} offset={0} m:color="brand-green"
          onChange={(i: number) => $at = i} />
      </div>
      <span sx={{ text: "lg", color: "brand-green" }}>{$at < 0 ? "Yola çık: kutuyu kaydır" : `Rakım: ${camps[$at].m} m`}</span>
    </div>
  </Card>
}
