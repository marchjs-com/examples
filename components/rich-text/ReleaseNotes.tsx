import { RichTextEditor, Button, Badge, toast } from "march/ui"
import { send } from "march/icons"

// sürüm notu yazma ekranı: @ ile ekipten biri anılır, Yayınla notu Markdown olarak gönderir ve taslağı temizler
const TEAM = [
  { id: "u1", label: "Deniz Kaya", hint: "Tasarım" },
  { id: "u2", label: "Ece Demir", hint: "Ürün" },
  { id: "u3", label: "Mert Aydın", hint: "Mühendislik" },
]

export function ReleaseNotes() {
  let $md = "## Sürüm 2.4\n\n- Karanlık tema\n- Daha hızlı arama\n\nSorular için [@Ece Demir](mention:u2)."
  let $sent = 0
  const publish = () => {
    if (!$md.trim()) return toast("Önce bir şeyler yazın")
    $sent++
    toast(`Sürüm notu yayınlandı (${$md.length} karakter)`)
    $md = ""
  }
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span sx={{ text: "bold" }}>Sürüm notu</span>
      <Badge tone="neutral">{`${$sent} yayın`}</Badge>
    </div>
    <RichTextEditor bind:value={$md} mentions={TEAM} rows={6} placeholder="Bu sürümde neler var?" aria-label="Sürüm notu" />
    <div sx={{ flex: ["row", "end"] }}>
      <Button icon={send} disabled={!$md.trim()} on:click={publish}>Yayınla</Button>
    </div>
  </div>
}
