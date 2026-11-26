import { DotMatrix, Button, Slider } from "march/ui"

// DotMatrixLab: the full-featured DotMatrix example: every prop in one place.
// DotMatrix is an LED dot-matrix display: text and numbers in a 5×7 dot font over a grid of unlit dots, in a dark
// housing that stays dark in every theme. A new value appears with a wipe or a dissolve on the motion engine; text
// longer than the window scrolls like a marquee. Use it for signs, scoreboards, tickers and any value that should look
// like hardware.
//
// Props shown below: value, format, columns, align, scroll, speed, paused, pauseOnHover, hold, spacing, glyphs, dot,
// size, color, transition, duration, easing, motion, label, parts, class.
export function DotMatrixLab() {
  // A number for the scoreboard, a temperature for the formatted display, and the ticker's pause switch.
  let $score = 7
  let $temp = 21.5
  let $paused = false
  // A smiley drawn as 5 columns of bits (bit 0 is the top row): the other way to write a glyph besides row strings.
  const SMILE = [0b0010100, 0b0100010, 0b0100000, 0b0100010, 0b0010100]
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. A scoreboard number.
        - value: a number; columns={3} with align="end" keeps the units in the same column as the score grows.
        - transition="dissolve": the new score lights dot by dot; duration (ms) and easing replace the default motion.
        - color: the theme token of the lit dots; size="lg" a bigger dot pitch; dot="square" square LEDs.
        - class: a hook for the test (lab-score). */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <DotMatrix class="lab-score" value={$score} columns={3} align="end" transition="dissolve" duration={600} easing="out"
        color="danger" size="lg" dot="square" label="Skor" />
      <Button class="lab-goal" size="sm" on:click={() => { $score++ }}>Gol!</Button>
    </div>
    {/* 2. A formatted number.
        - format: Intl.NumberFormat options (or a function); the number is written in the page's language, so a
          Turkish page shows "21,5".
        - spacing={0}: no empty column between characters, for a dense look. size={5}: the dot pitch in px.
        - motion={false}: no wipe at all (the same as the OS reduced-motion setting); the value changes at once. */}
    <div sx={{ flex: "col", gap: 1 }}>
      <DotMatrix class="lab-temp" value={$temp} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} columns={5}
        align="end" spacing={0} size={5} motion={false} label="Sıcaklık" />
      {/* A Slider (keyboard: arrow keys) sets the temperature; aria-label names it for screen readers. */}
      <Slider aria-label="Sıcaklık" min={-10} max={40} step={0.5} bind:value={$temp} />
    </div>
    {/* 3. A scrolling ticker.
        - columns={12}: the window; the text is longer, so it scrolls (scroll="auto"; scroll={false} would cut it).
        - speed: dot columns per second; hold: ms the start of a new text stands before it moves.
        - paused: stop it from your own control; pauseOnHover (default true) also pauses it under the pointer. A long
          moving text should always have a pause control like this one (accessibility: WCAG 2.2.2).
        - glyphs: the smiley as column bits (characters outside the font, like ▲, show as a box unless you draw them).
        - parts: glow={false} drops the light around the dots; off and bezel stay on.
        Under reduced motion the ticker does not scroll; the whole text is in the accessible label anyway. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <DotMatrix class="lab-ticker" value="BIST 100 +1,2%  USD/TRY 34,20  ALTIN -0,4%  ☺" glyphs={{ "☺": SMILE }}
        columns={12} speed={20} hold={800} paused={$paused} pauseOnHover parts={{ glow: false }} color="info" label="Piyasa" />
      <Button class="lab-pause" size="sm" variant="ghost" on:click={() => { $paused = !$paused }}>{$paused ? "▶ Sürdür" : "⏸ Durdur"}</Button>
    </div>
    {/* 4. A bare board: parts bezel={false} removes the housing (the dots sit on the page), off={false} hides the unlit
        dots; scroll={false} cuts a text longer than the window instead of scrolling it; transition="none" swaps a
        new value at once while other motion (none here) would still run. */}
    <DotMatrix class="lab-bare" value="KESİK METİN" columns={5} scroll={false} parts={{ bezel: false, off: false }} transition="none" />
  </div>
}
