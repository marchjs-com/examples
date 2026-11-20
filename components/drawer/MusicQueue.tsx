import { Drawer, Button, Card } from "march/ui"

// sıradaki şarkılar: alttan açılan, iki durma noktalı çekmece; koyu tema
const queue = ["Gece Yolu", "Sahil", "Kuzey Rüzgârı", "Şafak", "Son Vapur"]

export function MusicQueue() {
  let $open = false
  return <Card m:theme="night">
    <Button on:click={() => $open = true}>Sıradakiler ({queue.length})</Button>
    <Drawer open={$open} onClose={() => $open = false} side="bottom" snapPoints={[0.4, 0.9]} title="Sıradakiler">
      <ol>{queue.map((s) => <li>{s}</li>)}</ol>
    </Drawer>
  </Card>
}
