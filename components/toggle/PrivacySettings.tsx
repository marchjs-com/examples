import { Toggle, Field, Card, Button, toast } from "march/ui"

// profil düzenleyicide gizlilik ayarları: gizli profilde "çevrimiçi göster" kapanır; kaydedince özet bildirimi
export function PrivacySettings() {
  let $public = true
  let $online = true
  let $ads = false
  let $digest = true
  const $count = [$public, $public && $online, $ads, $digest].filter(Boolean).length
  const save = () => toast(`Gizlilik ayarları kaydedildi (${$count} açık)`)
  return <Card title="Gizlilik" subtitle="Profilini kimlerin, nasıl göreceğini seç">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field help={$public ? "Herkes gönderilerini ve takipçilerini görebilir" : "Yalnız onayladığın takipçiler görür"}>
        <Toggle bind:value={$public} label="Herkese açık profil" />
      </Field>
      <Field help="Gizli profilde bu ayar kapalıdır">
        <Toggle value={$online && $public} onChange={(v: boolean) => $online = v} disabled={!$public} label="Çevrimiçi olduğumu göster" />
      </Field>
      <Toggle bind:value={$ads} label="Kişiselleştirilmiş reklamlar" />
      <Toggle bind:value={$digest} m:color="brand-green" label="Haftalık e-posta özeti" />
      <div sx={{ flex: ["row", "end"], gap: 2 }}>
        <Button on:click={() => { $public = true; $online = true; $ads = false; $digest = true }}>Sıfırla</Button>
        <Button variant="primary" on:click={save}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
