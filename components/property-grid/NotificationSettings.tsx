import { PropertyGrid, toast } from "march/ui"

// gerçek hayattan: bildirim ayarları. Gruplar, arama, değişiklik işaretleri; Kaydet sunucuya gönderir (burada bir bildirim),
// sessiz saatlerin bitişi başlangıcından önce olamaz
const ROWS = [
  { key: "email", label: "E-posta bildirimleri", type: "switch" as const, group: "E-posta" },
  { key: "digest", label: "Özet sıklığı", type: "select" as const, options: [{ value: "daily", label: "Günlük" }, { value: "weekly", label: "Haftalık" }, { value: "never", label: "Hiç" }], group: "E-posta", hidden: (v: Record<string, unknown>) => !v.email },
  { key: "push", label: "Anlık bildirimler", type: "switch" as const, group: "Mobil" },
  { key: "quietFrom", label: "Sessiz saat başlangıcı", type: "int" as const, min: 0, max: 23, unit: "sa", group: "Mobil" },
  { key: "quietTo", label: "Sessiz saat bitişi", type: "int" as const, min: 0, max: 23, unit: "sa", group: "Mobil",
    validate: (to: unknown, v: Record<string, unknown>) => (Number(to) <= Number(v.quietFrom) ? "Bitiş başlangıçtan sonra olmalı" : null) },
]

export function NotificationSettings() {
  let $prefs: Record<string, unknown> = { email: true, digest: "weekly", push: true, quietFrom: 22, quietTo: 7 }
  return <PropertyGrid properties={ROWS} bind:value={$prefs} label="Bildirim ayarları"
    onSave={(v) => toast(`Kaydedildi: özet ${String(v.digest)}`, { kind: "success" })} />
}
