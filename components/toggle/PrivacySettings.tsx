// PrivacySettings: the real-life Toggle example.
//
// What it shows: the privacy page of a profile editor. A private profile turns "show that I am online" off and locks
// it; a Field under each important switch explains what it does; Reset and Save buttons act on the whole group, and
// Save reports a summary in a toast.
// When to use this pattern: settings pages made of on / off switches where one setting depends on another. Toggle
// does not hold any state of its own besides the value you give it, so dependent settings are just derived values.
import { Toggle, Field, Card, Button, toast } from "march/ui"

export function PrivacySettings() {
  // `$` variables are signals: everything that reads them updates when they change.
  let $public = true
  let $online = true
  let $ads = false
  let $digest = true
  // Derived: how many settings are effectively on. "Online" counts only when the profile is public, the same rule the
  // second switch shows.
  const $count = [$public, $public && $online, $ads, $digest].filter(Boolean).length
  const save = () => toast(`Gizlilik ayarları kaydedildi (${$count} açık)`)
  return <Card title="Gizlilik" subtitle="Profilini kimlerin, nasıl göreceğini seç">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field with `help` shows an explanation under the switch; the help text changes with the value, so it always
          describes the current state. bind:value is the two-way binding. */}
      <Field help={$public ? "Herkes gönderilerini ve takipçilerini görebilir" : "Yalnız onayladığın takipçiler görür"}>
        <Toggle bind:value={$public} label="Herkese açık profil" />
      </Field>
      {/* A dependent switch: it displays `$online && $public`, so it looks off in a private profile, and `disabled`
          locks it there. The user's own choice ($online) is kept, so it comes back when the profile is public again. */}
      <Field help="Gizli profilde bu ayar kapalıdır">
        <Toggle value={$online && $public} onChange={(v: boolean) => $online = v} disabled={!$public} label="Çevrimiçi olduğumu göster" />
      </Field>
      <Toggle bind:value={$ads} label="Kişiselleştirilmiş reklamlar" />
      {/* m:color is a common prop (it works on every component): the colour token of the switch when it is on. */}
      <Toggle bind:value={$digest} m:color="brand-green" label="Haftalık e-posta özeti" />
      <div sx={{ flex: ["row", "end"], gap: 2 }}>
        {/* Reset writes the default of each signal; the switches follow because they read the same signals. */}
        <Button on:click={() => { $public = true; $online = true; $ads = false; $digest = true }}>Sıfırla</Button>
        <Button variant="primary" on:click={save}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
