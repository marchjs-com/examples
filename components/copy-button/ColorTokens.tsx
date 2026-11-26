// ColorTokens: the creative-minimal CopyButton example.
//
// What it shows: a colour palette. Each row has the token's colour, its name and a one-tap copy button; after copying, the
// button takes the colour of that token for a moment, so you see which row you copied.
// When to use this pattern: lists of copyable values (tokens, codes, links). iconOnly keeps rows compact, so give each
// button its own `label` / `copiedLabel` text, which is its accessible name and what is announced after the copy.
// copiedColor sets the colour of the copied state (the default is the success colour).
import { CopyButton, Card } from "march/ui"

const tokens = ["brand-orange", "brand-blue", "brand-green", "brand-purple", "brand-pink"] as const

// One row: a coloured dot (decoration, hidden from screen readers), the token's CSS variable name and the button.
const TokenRow = (props: { token: (typeof tokens)[number] }) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
  <span sx={{ color: props.token, text: "2xl" }} aria-hidden="true">●</span>
  <code sx={{ text: "sm" }}>{`--m-${props.token}`}</code>
  {/* text is what goes to the clipboard (a ready-to-paste var()); the label names the button by its token. */}
  <CopyButton text={`var(--m-${props.token})`} iconOnly label={`${props.token} kopyala`} copiedLabel={`${props.token} panoda`} copiedColor={props.token} />
</div>

export function ColorTokens() {
  // m:theme="night" (a common prop) draws the whole card in the dark theme, whatever the page theme is.
  return <Card title="HADİ renkleri" m:theme="night">
    <div sx={{ flex: "col", gap: 1 }}>{tokens.map((t) => <TokenRow token={t} />)}</div>
  </Card>
}
