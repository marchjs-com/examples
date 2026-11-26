// IconButtonLab: the full-featured IconButton example; it uses every prop at least once.
//
// Props shown here: icon, label, size, variant, shape, pressed (toggle), m:color, inverse (on dark media), href (a link),
// title (your own tooltip, or false for none), aria-label only, class, children (a count badge) and extra attributes.
// Use it as a reference when you need one option: find the prop below and copy the line.
// IconButtonLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { IconButton, Badge, Card } from "march/ui"
import { heart, star, bell, plus, send, arrowUp, x, globe, settings, info, trash } from "march/icons"

// The four sizes, and the variants (undefined is the plain one, the others are danger, solid and raised).
const sizes = ["xs", "sm", "md", "lg"] as const
const variants = [undefined, "danger", "solid", "raised"] as const

// A row of buttons with a caption above: side by side, wrapping to the next line when they do not fit. It only organises the lab.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 2 }}>{props.children}</div>
</div>

export function IconButtonLab() {
  // State for the toggles and the unread count.
  let $liked = false
  let $starred = true
  let $unread = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Sizes: xs, sm, md, lg. The label includes the size so each button has a distinct accessible name. */}
    <Row title="Boyut">{sizes.map((s) => <IconButton icon={plus} label={`Ekle (${s})`} size={s} />)}</Row>
    {/* Variants: plain, danger (red icon), solid (filled with the accent), raised (surface, border, shadow). */}
    <Row title="Varyant">{variants.map((v) => <IconButton icon={send} label={`Gönder (${v ?? "düz"})`} variant={v} />)}</Row>
    {/* shape="round": a circle, with each variant. */}
    <Row title="Yuvarlak">{variants.map((v) => <IconButton icon={arrowUp} label={`Başa dön (${v ?? "düz"})`} variant={v} shape="round" />)}</Row>
    {/* Toggles: pressed gives aria-pressed and the pressed look. The first changes its label with the state; the second uses
        m:color (a colour token for the button) instead. */}
    <Row title="Aç / kapa">
      <IconButton icon={heart} label={$liked ? "Beğenildi" : "Beğen"} pressed={$liked} on:click={() => $liked = !$liked} />
      <IconButton icon={star} label="Yıldızla" m:color="brand-gold" pressed={$starred} on:click={() => $starred = !$starred} />
    </Row>
    {/* Content: children follow the icon. A Badge inside sits on the button's corner. A button can also have no icon and only
        children (here "+1"). */}
    <Row title="İçerik">
      <IconButton icon={bell} label={`Bildirimler (${$unread})`} on:click={() => $unread = 0}>
        <Badge count={$unread} />
      </IconButton>
      <IconButton label="Yeni bildirim" variant="raised" on:click={() => $unread++}>+1</IconButton>
    </Row>
    {/* Tooltip: by default the label is also the tooltip. `title` sets your own text, title={false} removes the tooltip, and
        aria-label alone (no label) names the button without any tooltip. */}
    <Row title="İpucu">
      <IconButton icon={info} label="Bilgi" title="Kendi ipucum: sürüm 0.2.0" />
      <IconButton icon={settings} label="Ayarlar" title={false} />
      <IconButton icon={trash} aria-label="Çöp kutusu" class="lab-trash" />
    </Row>
    {/* href makes the button a real link (<a>); target and rel are passed through. Colour and variant still apply. */}
    <Row title="Bağlantı">
      <IconButton icon={globe} label="March sitesi" href="https://marchjs.com" target="_blank" rel="noopener" m:color="brand-blue" variant="solid" />
    </Row>
    {/* On a dark surface: `inverse` gives a light icon, hover and focus ring (made for photos and video); with raised it draws a light disc. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <IconButton icon={x} label="Kapat" inverse />
        <IconButton icon={heart} label="Koyuda beğen" inverse pressed={$liked} on:click={() => $liked = !$liked} />
        <IconButton icon={arrowUp} label="Koyuda yukarı" inverse variant="raised" shape="round" />
      </Row>
    </Card>
  </div>
}
