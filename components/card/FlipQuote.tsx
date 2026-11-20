import { Card, IconButton } from "march/ui"
import { refresh } from "march/icons"

// günün sözü: başlıktaki düğme sıradaki söze geçer, alt bilgi kaçıncı söz olduğunu yazar
const QUOTES = [
  { text: "Basit olan, karmaşığın en zor hâlidir.", who: "Leonardo da Vinci" },
  { text: "Önce çalıştır, sonra doğru yap, sonra hızlandır.", who: "Kent Beck" },
  { text: "Sabır acıdır, meyvesi tatlıdır.", who: "Atasözü" },
]

export function FlipQuote() {
  let $i = 0
  const q = () => QUOTES[$i % QUOTES.length]
  return <Card title="Günün sözü" subtitle={() => q().who}
    actions={<IconButton icon={refresh} label="Sıradaki söz" on:click={() => $i++} />}
    footer={<span sx={{ text: "xs", color: "muted" }}>{() => `${($i % QUOTES.length) + 1} / ${QUOTES.length}`}</span>}>
    <p sx={{ text: "lg" }}>{() => `“${q().text}”`}</p>
  </Card>
}
