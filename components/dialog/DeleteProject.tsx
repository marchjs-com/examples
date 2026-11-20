import { Button, confirm, prompt, toast } from "march/ui"

// projeyi sil: önce onay (tehlikeli), sonra yeniden adlandırma için prompt
export function DeleteProject() {
  let $name = "Vitrin"
  let $gone = false
  const remove = async () => { if (await confirm({ title: `${$name} silinsin mi?`, message: "Bu işlem geri alınamaz.", danger: true, ok: "Sil" })) { $gone = true; toast("Proje silindi") } }
  const rename = async () => { const n = await prompt({ title: "Yeni ad", value: $name, validate: (v: string) => (v.trim() ? null : "Ad gerekli"), ok: "Kaydet" }); if (n) $name = n }
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <strong>{$gone ? "Silindi" : $name}</strong>
    <Button size="sm" on:click={rename} disabled={$gone}>Yeniden adlandır</Button>
    <Button size="sm" variant="danger" on:click={remove} disabled={$gone}>Sil</Button>
  </div>
}
