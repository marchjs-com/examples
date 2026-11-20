import { MadeWithMarch, Card, Button } from "march/ui"

// imzanın kalbi senin: her basışta sıradaki işaret gelir; adı (heartLabel) da onunla değişir, cümle yerinde kalır
const marks = [["💗", "Sevgi"], ["☕", "Kahve"], ["🚀", "Roket"], ["✨", "Pırıltı"], ["🎵", "Müzik"]] as const
const markAt = (i: number) => marks[i % marks.length]!

export function HeartSwap() {
  let $i = 0
  const $mark = markAt($i)
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      <MadeWithMarch variant="badge" heart={$mark[0]} heartLabel={$mark[1]} />
      <Button variant="secondary" size="sm" on:click={() => $i = ($i + 1) % marks.length}>{`Kalbi değiştir (${$mark[1]})`}</Button>
    </div>
  </Card>
}
