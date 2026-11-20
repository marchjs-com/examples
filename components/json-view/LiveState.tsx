import { JsonView, Button } from "march/ui"

// canlı durum: düğmelere bastıkça nesne değişir, ağaç yeniden çizilir (value bir erişimci)
export function LiveState() {
  let $likes = 0
  let $tags = ["march"]
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $likes++}>Beğen</Button>
      <Button size="sm" on:click={() => $tags = [...$tags, `etiket${$tags.length}`]}>Etiket ekle</Button>
    </div>
    <JsonView label="Gönderi durumu" open={2} value={() => ({ post: { title: "Sinyaller", likes: $likes, tags: $tags } })} />
  </div>
}
