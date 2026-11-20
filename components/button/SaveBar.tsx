import { Button, toast } from "march/ui"
import { check, x } from "march/icons"

// bir ayarlar formunun alt çubuğu: kaydederken Kaydet kilitlenip döner, Vazgeç bekler
export function SaveBar() {
  let $saving = false
  const save = () => {
    $saving = true
    setTimeout(() => { $saving = false; toast("Değişiklikler kaydedildi") }, 1200)
  }
  return <div sx={{ flex: ["row", "end"], gap: 2 }}>
    <Button variant="ghost" icon={x} disabled={$saving}>Vazgeç</Button>
    <Button variant="primary" icon={check} loading={$saving} on:click={save}>Kaydet</Button>
  </div>
}
