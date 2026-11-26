// SectionTimelineLab: the full-featured SectionTimeline example; it uses every prop at least once.
//
// Props shown here: items (label, target, slug: the dot becomes a link, placeholder: stands in for a section that is
// not drawn yet), orientation, axis, fixed, root, magnify, reach, grow, intro, hash, offset, line, smooth, wave, onChange,
// labels, label (your own content for a dot's name), class and the common prop m:color.
// The switches at the top change the timeline live. Use it as a reference when you need one specific option: find the
// prop below, copy the line.
// SectionTimelineLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { SectionTimeline, Toggle, Button } from "march/ui"

// One section of the timeline (the shape of an item): a name, a `target` function that returns the section element (or
// null while it is not drawn), an optional `slug` (the "#name" of the section) and an optional placeholder.
interface Sec { label: string; target: () => Element | null; slug?: string; placeholder?: () => Element | null }

const names = ["Giriş", "Kurulum", "Sinyaller", "Bileşenler", "Temalar", "Sonuç"]

export function SectionTimelineLab() {
  // Plain `let $name` variables are March signals: assigning one redraws whatever reads it. $read is the index that
  // onChange reports (-1 before the first section); the rest are bound to the switches below.
  let $read = -1
  let $row = false
  let $magnify = true
  let $smooth = true
  let $extra = false
  // The scrolling box; the ref below fills it in once it exists.
  let box: HTMLElement | undefined
  // Looks a section up inside the box; targets are functions so they are called when needed (null while missing).
  const sec = (i: number) => box?.querySelector(`[data-lab="${i}"]`) ?? null
  const items: Sec[] = [
    // Every second item has a slug, so its dot is a link (and, with `hash`, the address would follow the section).
    ...names.map((label, i) => ({ label, target: () => sec(i), slug: i % 2 ? undefined : `lab-${i}` })),
    // The last section is drawn only after the button is pressed. Until then `target` finds nothing, and the
    // placeholder (a stub paragraph) stands in for it: pressing its dot scrolls the placeholder into view first, then
    // goes on to the real section once it exists. This is the pattern for lazily loaded parts.
    { label: "Ekler", target: () => box?.querySelector("[data-lab=extra]") ?? null, placeholder: () => box?.querySelector("[data-lab=stub]") ?? null },
  ]
  // The scrolling box's height is set with a style object, because sx has no height token.
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The control panel: switches for orientation, magnifier and smooth scrolling, and a button that "loads" the last
        section. */}
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Toggle bind:value={$row} label="Yatay" />
      <Toggle bind:value={$magnify} label="Büyüteç" />
      <Toggle bind:value={$smooth} label="Yumuşak kaydırma" />
      <Button size="sm" disabled={$extra} on:click={() => $extra = true}>Ekleri yükle</Button>
    </div>
    <div sx={{ flex: $row ? "col" : "row", gap: 3 }}>
      <div sx={{ flex: "grow" }}>
        <div ref={(el: HTMLElement) => box = el} style={{ "block-size": "15rem", overflow: "auto" }}>
          {names.map((n, i) => <section data-lab={String(i)} sx={{ py: 4 }}>
            <h3>{`§${i + 1} · ${n}`}</h3>
            <p sx={{ color: "muted" }}>Kutuyu kaydır: okuma çizgisini geçen bölüm renklenir, geride kalanlar açık tonda kalır.</p>
          </section>)}
          {$extra
            ? <section data-lab="extra" sx={{ py: 4 }}><h3>§7 · Ekler</h3><p>Sonradan yüklenen bölüm.</p></section>
            : <p data-lab="stub" sx={{ py: 4, color: "muted" }}>Ekler henüz yüklenmedi…</p>}
        </div>
      </div>
      {/* SectionTimeline props, one by one:
          - items: the sections in page order. root={() => box}: the box that scrolls (default: the page).
          - class="lab-timeline": lets the tests (or your CSS) find the nav. m:color: the colour of the dots (common prop).
          - orientation: a column of dots ("vertical") or a row ("horizontal"). axis="y": the way the box scrolls; either
            orientation works with either axis.
          - fixed={false}: the timeline stays where it is written; true would pin it to the edge of the screen.
          - hash={false}: the address is not changed; with true the section being read writes "#slug" into it.
          - magnify: the dock-like magnifier near the pointer or the focused dot. reach: how far it reaches (px, default
            130), grow: the room a fully magnified dot takes (px, default 28). Neither changes any size: the dots only
            move and scale, so the page does no layout work.
          - intro: the magnifier sweeps once over the dots when the first section is reached, so a newcomer sees the
            names. It is skipped under reduced motion.
          - smooth: smooth scrolling to a pressed section (it is off under reduced motion anyway).
          - wave: when the section being read changes, the dots in between take their colour one after another over
            this many ms (default 480); false turns it off.
          - offset: room kept before a section scrolled to (default 80, for a sticky top bar; 0 here, no bar).
          - line: the reading line as a share of the box (default 0.33): a section counts as read once its start passes it.
          - labels: the accessible name of the nav (default is a translated "Sections").
          - label(item, index): your own content for a dot's name, here the number in front of the section name.
          - onChange(index): the section being read changed.
          Accessibility: a nav with links (items with a slug) or buttons; the section being read has aria-current="location"
          and is the one tab stop, and the arrow keys, Home and End move between the dots. */}
      <SectionTimeline items={items} root={() => box} class="lab-timeline" m:color="brand-purple"
        orientation={$row ? "horizontal" : "vertical"} axis="y" fixed={false} hash={false}
        magnify={$magnify} reach={150} grow={24} intro smooth={$smooth} wave={600} offset={0} line={0.4}
        labels={{ group: "Lab bölümleri" }} label={(it: Sec, i: number) => `${i + 1}. ${it.label}`}
        onChange={(i: number) => $read = i} />
    </div>
    <span sx={{ text: "sm", color: "muted" }}>{`Okunan: ${items[$read]?.label ?? "—"} (onChange: ${$read})`}</span>
  </div>
}
