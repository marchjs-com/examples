import { DotMatrix, Button } from "march/ui"

// LedMessage: the creative-minimal DotMatrix example.
// One LED board that shows a short message with a heart drawn as your own glyph, and three buttons that change the
// message and the colour of the light. Every change wipes across the board column by column on the motion engine.
// Use this pattern for a playful status sign, a "now playing" strip or a greeting on a landing page.

// The heart is not in the 5×7 font, so we draw it: 7 rows of 5 characters, "#" is a lit dot, "." an unlit one.
// The `glyphs` prop adds it to the font (it would also replace a built-in character with the same key).
const HEART = [".#.#.", "#####", "#####", "#####", ".###.", "..#..", "....."]

// The three messages and the theme colour token each one lights in. Colours are theme tokens, never CSS colours:
// the board then follows light / dark themes and the app's accent rules.
const MESSAGES = [
  { text: "MERHABA ♥", color: "warning" },
  { text: "MARCH ♥ LED", color: "danger" },
  { text: "İYİ GÜNLER", color: "success" },
] as const

export function LedMessage() {
  // The index of the message on the board; the board reads it reactively, so assigning it is the whole update.
  let $i = 0
  return <div sx={{ flex: ["col", "center"], gap: 3 }}>
    {/* The board.
        - value: the text; a change starts the wipe (transition="wipe" is the default; "dissolve" lights dot by dot).
        - glyphs: our heart. the Turkish letters (dotted capital I, G with breve, S with cedilla…) are in the built-in font already.
        - columns={11}: the window is 11 characters wide; a longer text would scroll like a marquee.
        - align="center": a shorter text sits in the middle of the window.
        - size="lg": a bigger dot pitch. color: the theme token of the lit dots.
        - label: the accessible name; a screen reader hears "Mesaj: MERHABA ♥" once, never the moving dots.
        Motion: the wipe runs on the motion engine, so the OS "reduce motion" setting (and motion={false}) shows the new
        text at once, and the global speed / "Stop all" controls slow or freeze it. */}
    <DotMatrix value={MESSAGES[$i].text} color={MESSAGES[$i].color} glyphs={{ "♥": HEART }} columns={11} align="center"
      size="lg" label="Mesaj" />
    {/* Ordinary Buttons: keyboard users reach them with Tab and press Enter or Space. Each one only sets $i. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" on:click={() => { $i = 0 }}>Merhaba</Button>
      <Button size="sm" variant="ghost" on:click={() => { $i = 1 }}>March</Button>
      <Button size="sm" variant="ghost" on:click={() => { $i = 2 }}>İyi günler</Button>
    </div>
  </div>
}
