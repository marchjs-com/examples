import { CopyButton, Card, Button } from "march/ui"
import { link, heart, clipboard } from "march/icons"

// CopyButton'un bütün özellikleri: text (metin, sayı, canlı değer), label, copiedLabel, iconOnly, icon (true: kendi
// ikonu, ya da senin ikonun), copiedIcon (senin ikonun ya da false: değişmez), copiedColor, duration, errorText (metin
// ya da false), class, onCopy, onError ve ortak m:color, m:theme
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function CopyButtonLab() {
  let $copies = 0
  let $count = 7
  let $error = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Metinli düğme: kendi metinlerin, 3 sn, onCopy">
      <code sx={{ text: "sm" }}>npm i github:marchjs-com/march</code>
      <CopyButton text="npm i github:marchjs-com/march" label="Komutu kopyala" copiedLabel="Kopyalandı!" duration={3000} class="lab-cmd" onCopy={() => $copies++} />
      <span sx={{ text: "xs", color: "muted" }}>{`${$copies} kez kopyalandı`}</span>
    </Row>
    <Row title="Canlı değer ve varsayılan ikon (icon)">
      <Button on:click={() => $count++}>{`Sayı: ${$count}`}</Button>
      <CopyButton text={() => $count} icon label="Sayıyı kopyala" />
    </Row>
    <Row title="Yalnız ikon, sayı, m:color">
      <CopyButton text={42} iconOnly label="Kırk ikiyi kopyala" copiedLabel="42 panoda" m:color="brand-blue" />
      <CopyButton text="https://marchjs.com" iconOnly icon={link} copiedIcon={heart} copiedColor="brand-purple" label="Bağlantıyı kopyala" copiedLabel="Bağlantı panoda" />
      <CopyButton text="sabit" iconOnly icon={clipboard} copiedIcon={false} label="İkon değişmesin" copiedLabel="İkon aynı kaldı" />
    </Row>
    <Row title="Pano reddederse: kendi bildirim metnin ya da hiç (onError)">
      <CopyButton text="gizli" label="Bildirimle dene" errorText="Panoya yazılamadı, elle seç" />
      <CopyButton text="gizli" label="Sessizce dene" errorText={false} onError={(e: unknown) => $error = `Pano reddetti: ${String(e)}`} />
      <span sx={{ text: "xs", color: "danger" }}>{$error}</span>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <CopyButton text="#0b1020" label="Gece mavisini kopyala" icon copiedColor="brand-gold" />
      </Row>
    </Card>
  </div>
}
