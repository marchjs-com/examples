import { Secret, Card, Toggle, Segmented, Button } from "march/ui"
import { refresh } from "march/icons"

// Secret'ın bütün özellikleri: canlı value, regions (dizinle, eksi sondan, açık uç), mask, maskLength,
// revealed + setRevealed (bind:revealed), onRevealChange, toggle, copy + onCopy, mono, size, labels, class
const REGIONS = { "uçlar": undefined, "son 4": [[0, -4]], "ortalar": [[4, 12], [16]] } as const

export function SecretLab() {
  let $key = "sk_live_7f3a9c21e4b8d05a"
  let $open = false
  let $region: keyof typeof REGIONS = "uçlar"
  let $flips = 0
  let $copies = 0
  return <Card title="Secret Lab">
    <div sx={{ flex: "col", gap: 3 }}>
      <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
        <Segmented options={Object.keys(REGIONS)} bind:value={$region} aria-label="Gizli aralıklar" />
        <Toggle bind:value={$open} label="Dışarıdan aç" />
        <Button size="sm" variant="ghost" icon={refresh} on:click={() => $key = `sk_live_${Math.random().toString(16).slice(2, 18)}`}>Yeni anahtar</Button>
      </div>
      <Secret class="lab-key" value={$key} regions={REGIONS[$region]} bind:revealed={$open} onRevealChange={() => $flips++}
        copy onCopy={() => $copies++} labels={{ show: "Anahtarı göster", hide: "Anahtarı gizle", copy: "Anahtarı kopyala", copied: "Kopyalandı", hidden: (n: number) => `${n} karakter gizli` }} />
      <Secret class="lab-pin" value="4821" regions={[[0]]} mask="✱" maskLength={6} mono={false} size="sm" toggle={false} />
      <span class="lab-stats" sx={{ text: "sm", color: "muted" }}>{`göz: ${$flips} · kopya: ${$copies} · açık: ${$open ? "evet" : "hayır"}`}</span>
    </div>
  </Card>
}
