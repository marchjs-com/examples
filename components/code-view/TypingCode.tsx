import { CodeView, Button } from "march/ui"
import { onCleanup } from "march"
import { rotateCcw } from "march/icons"

// kod kendini yazar: code bir erişimci, her tikte bir harf daha; satırlar ve renkler yazdıkça gelir
const SRC = `export function Merhaba() {
  let $ad = "March"
  return <h1>Merhaba, {$ad}!</h1>
}`

export function TypingCode() {
  let $n = 0
  const timer = setInterval(() => { if ($n < SRC.length) $n++ }, 45)
  onCleanup(() => clearInterval(timer))
  return <div sx={{ flex: "col", gap: 2 }}>
    <CodeView code={() => SRC.slice(0, $n)} lang="tsx" langLabel="Merhaba.tsx" copy={false} wrapButton={false} label="Kendini yazan kod" />
    <div sx={{ flex: ["row", "between"], gap: 2 }}>
      <span sx={{ text: "sm", color: "muted" }}>{$n} / {SRC.length} harf</span>
      <Button variant="ghost" size="sm" icon={rotateCcw} disabled={$n < SRC.length} on:click={() => $n = 0}>Baştan yaz</Button>
    </div>
  </div>
}
