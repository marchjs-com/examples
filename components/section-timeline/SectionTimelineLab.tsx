import { SectionTimeline, Toggle, Button } from "march/ui"

// SectionTimeline'ın bütün özellikleri bir arada: items (label, target, slug: nokta bağlantı olur, placeholder: henüz
// çizilmemiş bir bölümün yerini tutan), orientation, axis, fixed, root, magnify, reach, grow, intro, hash, offset,
// line, smooth, wave, onChange, labels, label (adın kendi içeriği), class ve renk (m:color)

// bir bölüm (SectionTimeline'ın öğe biçimi)
interface Sec { label: string; target: () => Element | null; slug?: string; placeholder?: () => Element | null }

const names = ["Giriş", "Kurulum", "Sinyaller", "Bileşenler", "Temalar", "Sonuç"]

export function SectionTimelineLab() {
  let $read = -1
  let $row = false
  let $magnify = true
  let $smooth = true
  let $extra = false
  let box: HTMLElement | undefined
  const sec = (i: number) => box?.querySelector(`[data-lab="${i}"]`) ?? null
  const items: Sec[] = [
    ...names.map((label, i) => ({ label, target: () => sec(i), slug: i % 2 ? undefined : `lab-${i}` })),
    // "Ekler" düğmeye basılınca çizilir; o zamana dek yerini tutan kutu (placeholder) var
    { label: "Ekler", target: () => box?.querySelector("[data-lab=extra]") ?? null, placeholder: () => box?.querySelector("[data-lab=stub]") ?? null },
  ]
  // kayan kutunun yüksekliği style nesnesiyle (sx'te yükseklik yok)
  return <div sx={{ flex: "col", gap: 3 }}>
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
      <SectionTimeline items={items} root={() => box} class="lab-timeline" m:color="brand-purple"
        orientation={$row ? "horizontal" : "vertical"} axis="y" fixed={false} hash={false}
        magnify={$magnify} reach={150} grow={24} intro smooth={$smooth} wave={600} offset={0} line={0.4}
        labels={{ group: "Lab bölümleri" }} label={(it: Sec, i: number) => `${i + 1}. ${it.label}`}
        onChange={(i: number) => $read = i} />
    </div>
    <span sx={{ text: "sm", color: "muted" }}>{`Okunan: ${items[$read]?.label ?? "—"} (onChange: ${$read})`}</span>
  </div>
}
