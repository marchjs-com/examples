// WifiCard: the creative-minimal Secret example.
//
// What it shows: a cafe's guest Wi-Fi card. The password is hidden completely; whoever presses the eye sees it, and the
// copy button hands over the right password even while it is hidden. A small line counts how often it was copied.
// When to use this pattern: a value that should not be read over someone's shoulder but must stay easy to use: Wi-Fi
// passwords, one-time codes, API keys. Two props do the work: regions to hide, copy to offer the real value.
import { Secret, Card, Badge } from "march/ui"

export function WifiCard() {
  // `let $copies` is a March signal: onCopy increments it and the line at the bottom redraws.
  let $copies = 0
  return <Card title="Misafir Wi-Fi" subtitle="Kafe Mars · 2. kat">
    <div sx={{ flex: "col", gap: 2 }}>
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <Badge tone="info" dot>MarsCafe_5G</Badge>
      </div>
      {/* Secret options used here:
          - regions={[[0]]}: one range that starts at 0 and has no end, so the whole value is hidden (the default would
            keep the first and last 4 characters visible).
          - maskLength={10}: draw 10 mask characters whatever the real length, so the length stays private too.
          - copy: adds a button that copies the real value, hidden or not; onCopy runs afterwards.
          The eye button (toggle) is on by default and its name says what it does ("Show" / "Hide" in English). While
          the value is hidden its characters are not in the page at all. */}
      <Secret value="kirmizi-gezegen-2026" regions={[[0]]} maskLength={10} copy onCopy={() => $copies++} />
      <span sx={{ text: "xs", color: "muted" }}>{$copies ? `${$copies} kez kopyalandı` : "Şifreyi göster ya da kopyala"}</span>
    </div>
  </Card>
}
