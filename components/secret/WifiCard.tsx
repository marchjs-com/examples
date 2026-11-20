import { Secret, Card, Badge } from "march/ui"

// misafir Wi-Fi kartı: şifre tümüyle gizli; göze basan görür, kopyala düğmesi gizliyken de doğru şifreyi kopyalar
export function WifiCard() {
  let $copies = 0
  return <Card title="Misafir Wi-Fi" subtitle="Kafe Mars · 2. kat">
    <div sx={{ flex: "col", gap: 2 }}>
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <Badge tone="info" dot>MarsCafe_5G</Badge>
      </div>
      <Secret value="kirmizi-gezegen-2026" regions={[[0]]} maskLength={10} copy onCopy={() => $copies++} />
      <span sx={{ text: "xs", color: "muted" }}>{$copies ? `${$copies} kez kopyalandı` : "Şifreyi göster ya da kopyala"}</span>
    </div>
  </Card>
}
