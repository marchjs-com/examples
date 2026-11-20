import { Spinner, Button, Card } from "march/ui"
import { save } from "march/icons"

// kaydet düğmesi: kaydederken düğmenin içinde metin boyunda (em), süs olarak dönen halka; metin durumu kendisi söyler
export function SaveButton() {
  let $saving = false
  let $saved = 0
  const run = () => { $saving = true; setTimeout(() => { $saving = false; $saved++ }, 1000) }
  return <Card title="Profil">
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button variant="primary" icon={save} disabled={() => $saving} on:click={run}>
        {() => $saving ? <span sx={{ flex: ["row", "center"], gap: 1 }}><Spinner size="em" decorative /> Kaydediliyor…</span> : "Kaydet"}
      </Button>
      <span sx={{ color: "muted" }}>{() => ($saved ? `${$saved} kez kaydedildi` : "")}</span>
    </div>
  </Card>
}
