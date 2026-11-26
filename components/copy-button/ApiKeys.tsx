// ApiKeys: the real-life CopyButton example.
//
// What it shows: the developer settings of an account: a secret API key (the first eight characters are visible, an
// eye button reveals the rest; the CopyButton always copies the current full value), a button that makes a new key,
// and an invite link with its own CopyButton that counts how often it was copied.
// When to use this pattern: any value people paste elsewhere (keys, links, commands, codes). `text` can be a function:
// it is read at click time, so the copy is always the current value, even after the key was regenerated.
// Accessibility: an icon-only button needs `label` (its accessible name); `copiedLabel` is announced after a copy.
import { CopyButton, IconButton, Card, Badge, Secret, toast } from "march/ui"
import { key } from "march/icons"

export function ApiKeys() {
  let $secret = "sk_live_7f3a9c21e4b8"
  let $shares = 0
  return <Card title="API anahtarları" subtitle="Üretim ortamı">
    <div sx={{ flex: "col", gap: 3 }}>
      <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
        <Badge tone="success">Etkin</Badge>
        {/* Secret hides the value except the region given in `regions` ([[8]] = the first eight characters) and draws
            maskLength mask characters; the labels name its show / hide button. */}
        <Secret value={$secret} regions={[[8]]} maskLength={8} size="sm" labels={{ show: "Anahtarı göster", hide: "Anahtarı gizle" }} />
        {/* text as a function: read when the button is pressed. iconOnly: an icon button, named by `label`. */}
        <CopyButton text={() => $secret} iconOnly label="Anahtarı kopyala" copiedLabel="Anahtar kopyalandı" />
        <IconButton icon={key} label="Yeni anahtar üret" size="sm" on:click={() => { $secret = `sk_live_${Math.random().toString(16).slice(2, 14)}`; toast("Yeni anahtar üretildi") }} />
      </div>
      <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
        <span sx={{ text: "sm", color: "muted" }}>Ekip davet bağlantısı</span>
        {/* A text button that also shows the copy icon (icon); onCopy runs after a successful copy. */}
        <CopyButton text="https://marchjs.com/davet/ekip-42" icon label="Bağlantıyı kopyala" copiedLabel="Bağlantı kopyalandı" onCopy={() => $shares++} />
        <span sx={{ text: "xs", color: "muted" }}>{$shares ? `${$shares} kez paylaşıldı` : ""}</span>
      </div>
    </div>
  </Card>
}
