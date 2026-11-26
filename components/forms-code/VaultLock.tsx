// VaultLock: the creative-minimal CodeInput example.
//
// What it shows: a vault lock on a dark card. Enter a four-digit code; the right one opens the vault, a wrong one empties
// the boxes and counts the try. The hint says the code is the current year.
// When to use this pattern: a short PIN. `mask` hides the digits as dots and `onComplete` fires once when every box is
// filled, so you can check the code without a submit button.
// Keyboard: typing moves to the next box, Backspace goes back, arrow keys move, and pasting fills the boxes.
import { CodeInput, Card } from "march/ui"

export function VaultLock() {
  // State: the typed code, whether the vault is open and how many wrong tries there were.
  let $code = ""
  let $open = false
  let $tries = 0
  // Called by onComplete with the full code: correct opens the vault; wrong counts a try and clears the boxes ($code = "").
  const check = (c: string) => {
    if (c === "2026") $open = true
    else { $tries++; $code = "" }
  }
  {/* m:theme="night" draws the card in the dark colour theme. */}
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      <span sx={{ text: ["2xl", "bold"], color: $open ? "brand-green" : "brand-gold" }}>{$open ? "🔓 Kasa açıldı" : "🔒 Kilitli"}</span>
      {/* - bind:value: the typed code. length={4}: four boxes. mask: show dots instead of the digits (a PIN).
          - size="lg": larger boxes. colors="palette": each box takes the next colour of the palette.
          - disabled: locks the boxes once the vault is open. onComplete: the check function.
          - boxLabel: the accessible name of each box ("digit i of n"), so a screen reader says where you are. */}
      <CodeInput bind:value={$code} length={4} mask size="lg" colors="palette" disabled={$open} onComplete={check}
        boxLabel={(i: number, n: number) => `Şifre hanesi ${i} / ${n}`} />
      <span sx={{ text: "sm", color: "muted" }}>{$tries ? `${$tries} yanlış deneme` : "İpucu: bu yıl"}</span>
    </div>
  </Card>
}
