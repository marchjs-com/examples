// SecretLab: the full-featured Secret example; it uses every prop at least once.
//
// Props shown here: value (live), regions (by index, negative from the end, open end), mask, maskLength, revealed
// (bind:revealed) with onRevealChange, toggle, copy with onCopy, mono, size, labels and class.
// The controls at the top change the first Secret live. Use it as a reference when you need one specific option: find
// the prop below, copy the line.
// SecretLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Secret, Card, Toggle, Segmented, Button } from "march/ui"
import { refresh } from "march/icons"

// The hidden ranges the Segmented control can pick. A range is [start, end]: indexes of characters, the end not
// included. A negative index counts from the end, and a range without an end runs to the end of the value.
// - undefined: Secret's default, which keeps the first 4 and the last 4 characters visible.
// - [[0, -4]]: hide everything except the last 4.
// - [[4, 12], [16]]: two hidden ranges: characters 4-11 and everything from 16 on.
const REGIONS = { "uçlar": undefined, "son 4": [[0, -4]], "ortalar": [[4, 12], [16]] } as const

export function SecretLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. $key is the secret itself
  // (a Secret may show a live value), $open is bound to the reveal state, $region picks a REGIONS entry, and $flips /
  // $copies count the two callbacks.
  let $key = "sk_live_7f3a9c21e4b8d05a"
  let $open = false
  let $region: keyof typeof REGIONS = "uçlar"
  let $flips = 0
  let $copies = 0
  return <Card title="Secret Lab">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* The control panel: the range picker, a switch that reveals the key from outside (it shares the $open signal
          with the Secret's eye button) and a button that replaces the value with a new random key. */}
      <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
        <Segmented options={Object.keys(REGIONS)} bind:value={$region} aria-label="Gizli aralıklar" />
        <Toggle bind:value={$open} label="Dışarıdan aç" />
        <Button size="sm" variant="ghost" icon={refresh} on:click={() => $key = `sk_live_${Math.random().toString(16).slice(2, 18)}`}>Yeni anahtar</Button>
      </div>
      {/* The main Secret:
          - class="lab-key": lets the tests find it.
          - value={$key}: live; the Secret follows it. regions={REGIONS[$region]}: the chosen hidden ranges.
          - bind:revealed={$open}: shows the whole value while true, and writes the state back when the eye button is
            pressed. onRevealChange is called by the eye button only (it counts the presses here).
          - copy: adds a button that copies the real value, hidden or not. onCopy runs after copying.
          - labels: your own texts: show / hide for the eye button, copy / copied for the copy button, and hidden(count),
            the text a screen reader hears instead of the hidden characters. */}
      <Secret class="lab-key" value={$key} regions={REGIONS[$region]} bind:revealed={$open} onRevealChange={() => $flips++}
        copy onCopy={() => $copies++} labels={{ show: "Anahtarı göster", hide: "Anahtarı gizle", copy: "Anahtarı kopyala", copied: "Kopyalandı", hidden: (n: number) => `${n} karakter gizli` }} />
      {/* A PIN: regions={[[0]]} hides it whole, mask="✱" changes the mask character, maskLength={6} draws 6 of them
          so the real length (4) stays secret, mono={false} uses the normal font instead of monospace, size="sm" is
          the smaller text, and toggle={false} removes the eye button, so it can never be shown. */}
      <Secret class="lab-pin" value="4821" regions={[[0]]} mask="✱" maskLength={6} mono={false} size="sm" toggle={false} />
      <span class="lab-stats" sx={{ text: "sm", color: "muted" }}>{`göz: ${$flips} · kopya: ${$copies} · açık: ${$open ? "evet" : "hayır"}`}</span>
    </div>
  </Card>
}
