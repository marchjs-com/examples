import { CodeInput, Card } from "march/ui"

// kasa kilidi: dört haneli şifreyi gir; doğruysa kilit açılır, yanlışsa kutular boşalır (ipucu: bu yıl)
export function VaultLock() {
  let $code = ""
  let $open = false
  let $tries = 0
  const check = (c: string) => {
    if (c === "2026") $open = true
    else { $tries++; $code = "" }
  }
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      <span sx={{ text: ["2xl", "bold"], color: $open ? "brand-green" : "brand-gold" }}>{$open ? "🔓 Kasa açıldı" : "🔒 Kilitli"}</span>
      <CodeInput bind:value={$code} length={4} mask size="lg" colors="palette" disabled={$open} onComplete={check}
        boxLabel={(i: number, n: number) => `Şifre hanesi ${i} / ${n}`} />
      <span sx={{ text: "sm", color: "muted" }}>{$tries ? `${$tries} yanlış deneme` : "İpucu: bu yıl"}</span>
    </div>
  </Card>
}
