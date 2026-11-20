import { Card, Button, Badge, KeyValue, toast } from "march/ui"
import { edit, download } from "march/icons"

// bir abonelik kartı: başlıkta rozet ve düzenle düğmesi, gövdede ayrıntı, altta fatura indirme; düzenleyince alt bilgi değişir
export function PlanCard() {
  let $seats = 48
  return <Card as="article" title="Kurumsal plan" subtitle="HADİ A.Ş."
    actions={[<Badge tone="success">Aktif</Badge>, <Button size="sm" icon={edit} on:click={() => { $seats += 5; toast("5 koltuk eklendi") }}>Koltuk ekle</Button>]}
    footer={<div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span sx={{ color: "muted" }}>Yenileme: 1 Aralık</span>
      <Button size="sm" variant="ghost" icon={download}>Fatura</Button>
    </div>}>
    <KeyValue columns={2} items={[
      { label: "Koltuk", value: () => String($seats) },
      { label: "Aylık", value: () => `${($seats * 120).toLocaleString("tr-TR")} ₺` },
      { label: "Depolama", value: "1 TB" },
      { label: "Destek", value: "7/24" },
    ]} />
  </Card>
}
