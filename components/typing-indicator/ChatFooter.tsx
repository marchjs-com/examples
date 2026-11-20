import { TypingIndicator, Button } from "march/ui"

// sohbet altı: yazanlar eklenip çıkar; kimse yazmıyorsa gösterge gizlenir
const all = ["Elif", "Can", "Deniz"]

export function ChatFooter() {
  let $n = 1
  return <div sx={{ flex: "col", gap: 2 }}>
    <TypingIndicator names={all.slice(0, $n)} />
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $n = Math.max(0, $n - 1)}>Biri sustu</Button>
      <Button size="sm" on:click={() => $n = Math.min(all.length, $n + 1)}>Biri yazıyor</Button>
    </div>
  </div>
}
