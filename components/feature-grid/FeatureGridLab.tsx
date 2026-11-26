// FeatureGridLab: the full-featured FeatureGrid example; it uses every prop at least once.
//
// Props shown here: items (icon, title, body, href, tone, span, media), variant, cols, spotlight, reveal and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// FeatureGridLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { FeatureGrid } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"
import { mapPin, users, message, ticket, video, heart } from "march/icons"

// The four looks: cards (Cards with an icon tile), plain (no boxes), list (icon beside the text) and bento (tiles of different sizes).
const VARIANTS = ["cards", "plain", "list", "bento"] as const

// A small block used as the `media` of a bento tile: a big number and a label.
const Mini = (p: { n: string; label: string }) => <div sx={{ flex: "col", gap: 1, p: 3 }}>
  <strong sx={{ text: "xl", color: "brand-orange" }}>{p.n}</strong><span sx={{ color: "muted" }}>{p.label}</span>
</div>

// The three controls: the variant, the number of columns and the pointer light.
export function FeatureGridLab() {
  let $variant: (typeof VARIANTS)[number] = "cards"
  let $cols = 3
  let $spotlight = true
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Controls: they change the grid's props live. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Segmented aria-label="Sütun" options={[2, 3, 4].map((n) => ({ value: n, label: String(n) }))} bind:value={$cols} />
        <Toggle label="İmleç ışığı" bind:value={$spotlight} />
      </div>
    </Card>
    {() => {
      // variant, cols and spotlight are read when the grid is built, so this function re-runs and builds it again when one changes.
      const variant = $variant, cols = $cols, spotlight = $spotlight
      // The FeatureGrid:
      //   variant: the look. cols: columns for cards and plain (2, 3 or 4; on phones everything stacks). spotlight: a soft light
      //   that follows the pointer across the grid (cards and bento). reveal: the entrance of the tiles, one after another;
      //   "none" turns it off (the effect is skipped with reduced motion anyway). class: added to the root.
      //   items: { icon, title, body, href, tone, span, media }. icon: an icon tile; href: the title becomes a link and the whole
      //   tile is its hit area; tone: a colour tone for the item; span (bento): "big", "wide", "tall" or normal; media: any node
      //   shown in a bento tile (the first item here).
      // Accessibility: each item is an article with an h3; icons are decorative.
      return <FeatureGrid variant={variant} cols={cols as 3} spotlight={spotlight} reveal="none" class="lab-fg" items={[
      { icon: mapPin, title: "Yakınındaki etkinlikler", body: "Haritada ve takvimde.", span: "big", tone: "primary", media: <Mini n="1.200+" label="etkinlik her hafta" /> as Node },
      { icon: users, title: "Tanışma yemekleri", body: "Ortak ilgi alanı olanlarla.", tone: "violet" },
      { icon: message, title: "Sohbet", body: "Buluşmadan önce ve sonra.", tone: "info" },
      { icon: ticket, title: "Bilet sat", body: "Kontenjanı sen belirle.", span: "wide", tone: "success", href: "#bilet" },
      { icon: video, title: "Görüntülü görüşme", body: "Etkinlik öncesi tanış.", span: "tall", tone: "pink" },
      { icon: heart, title: "Akış", body: "Anıları paylaş.", tone: "teal" },
    ]} />
    }}
  </div>
}
