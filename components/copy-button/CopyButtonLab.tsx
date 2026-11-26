// CopyButtonLab: the full-featured CopyButton example; it uses every prop at least once.
//
// Props shown here: text (a text, a number or a live value), label, copiedLabel, iconOnly, icon (true: the default icon,
// or your own), copiedIcon (your own, or false: the icon does not change), copiedColor, duration, errorText (a text or
// false), class, onCopy, onError and the common props m:color and m:theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CopyButtonLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CopyButton, Card, Button } from "march/ui"
import { link, heart, clipboard } from "march/icons"

// A layout helper: a caption above, the buttons below in a wrapping row. Only the Lab uses it.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function CopyButtonLab() {
  // $copies counts successful copies, $count is the live value copied in the second row, $error holds the last failure.
  let $copies = 0
  let $count = 7
  let $error = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* A text button: label and copiedLabel are its texts before and after the copy; duration={3000} keeps the copied
        state for three seconds (the default is 1.5 s); class lets a test find it; onCopy runs after a successful copy. */}
    <Row title="Metinli düğme: kendi metinlerin, 3 sn, onCopy">
      <code sx={{ text: "sm" }}>npm i github:marchjs-com/march</code>
      <CopyButton text="npm i github:marchjs-com/march" label="Komutu kopyala" copiedLabel="Kopyalandı!" duration={3000} class="lab-cmd" onCopy={() => $copies++} />
      <span sx={{ text: "xs", color: "muted" }}>{`${$copies} kez kopyalandı`}</span>
    </Row>
    {/* text as a function is read at click time, so the copy is always the current number. A text button shows an icon
        only when you give `icon` (true: the default copy icon). */}
    <Row title="Canlı değer ve varsayılan ikon (icon)">
      <Button on:click={() => $count++}>{`Sayı: ${$count}`}</Button>
      <CopyButton text={() => $count} icon label="Sayıyı kopyala" />
    </Row>
    {/* iconOnly: an icon button; its label is the accessible name (and the tooltip), copiedLabel the name after a
        copy. text may be a number. m:color (a common prop) sets the colour token of the button. icon / copiedIcon
        replace the two icons, copiedColor the colour after a copy, and copiedIcon={false} keeps the first icon. */}
    <Row title="Yalnız ikon, sayı, m:color">
      <CopyButton text={42} iconOnly label="Kırk ikiyi kopyala" copiedLabel="42 panoda" m:color="brand-blue" />
      <CopyButton text="https://marchjs.com" iconOnly icon={link} copiedIcon={heart} copiedColor="brand-purple" label="Bağlantıyı kopyala" copiedLabel="Bağlantı panoda" />
      <CopyButton text="sabit" iconOnly icon={clipboard} copiedIcon={false} label="İkon değişmesin" copiedLabel="İkon aynı kaldı" />
    </Row>
    {/* When the clipboard refuses, a toast reports it: errorText gives your own wording, errorText={false} switches the
        toast off and onError receives the error so you can handle the failure yourself. */}
    <Row title="Pano reddederse: kendi bildirim metnin ya da hiç (onError)">
      <CopyButton text="gizli" label="Bildirimle dene" errorText="Panoya yazılamadı, elle seç" />
      <CopyButton text="gizli" label="Sessizce dene" errorText={false} onError={(e: unknown) => $error = `Pano reddetti: ${String(e)}`} />
      <span sx={{ text: "xs", color: "danger" }}>{$error}</span>
    </Row>
    {/* m:theme="night" draws this card in the dark theme whatever the page theme is. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <CopyButton text="#0b1020" label="Gece mavisini kopyala" icon copiedColor="brand-gold" />
      </Row>
    </Card>
  </div>
}
