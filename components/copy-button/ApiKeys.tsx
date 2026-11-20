import { CopyButton, IconButton, Card, Badge, Secret, toast } from "march/ui"
import { key } from "march/icons"

// geliştirici ayarları: gizli anahtar (Secret: ilk 8 karakter görünür, göz düğmesi açar; CopyButton her zaman
// güncel değeri kopyalar) ve davet bağlantısı
export function ApiKeys() {
  let $secret = "sk_live_7f3a9c21e4b8"
  let $shares = 0
  return <Card title="API anahtarları" subtitle="Üretim ortamı">
    <div sx={{ flex: "col", gap: 3 }}>
      <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
        <Badge tone="success">Etkin</Badge>
        <Secret value={$secret} regions={[[8]]} maskLength={8} size="sm" labels={{ show: "Anahtarı göster", hide: "Anahtarı gizle" }} />
        <CopyButton text={() => $secret} iconOnly label="Anahtarı kopyala" copiedLabel="Anahtar kopyalandı" />
        <IconButton icon={key} label="Yeni anahtar üret" size="sm" on:click={() => { $secret = `sk_live_${Math.random().toString(16).slice(2, 14)}`; toast("Yeni anahtar üretildi") }} />
      </div>
      <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
        <span sx={{ text: "sm", color: "muted" }}>Ekip davet bağlantısı</span>
        <CopyButton text="https://marchjs.com/davet/ekip-42" icon label="Bağlantıyı kopyala" copiedLabel="Bağlantı kopyalandı" onCopy={() => $shares++} />
        <span sx={{ text: "xs", color: "muted" }}>{$shares ? `${$shares} kez paylaşıldı` : ""}</span>
      </div>
    </div>
  </Card>
}
