import { SplitFlap, TextInput } from "march/ui"

// WordFlip: the creative-minimal SplitFlap example.
// Type a word and watch a split-flap board clatter to it: every cell turns its reel of letters forward, one flap at a
// time, the cells starting one after another. Use this pattern for a playful headline, a "word of the day" or a
// teaser that reveals a name.
export function WordFlip() {
  // The text on the board. TextInput writes it through bind:value, the board follows it reactively.
  let $word = "MERHABA"
  return <div sx={{ flex: ["col", "center"], gap: 3 }}>
    {/* The board.
        - value: the text. Lower case is turned into capitals in the page's language (a Turkish page turns "i" into
          a dotted capital I), because the default reel has capitals only.
        - length={10}: ten cells; a shorter word is padded with blank flaps, a longer one is cut.
        - align="center": the word sits in the middle of the ten cells.
        - flapTime (ms per flap) and stagger (ms between neighbouring cells) shape the motion; size="lg" big cards.
        - label: the accessible name; screen readers hear "Kelime: MERHABA" once, never the flaps on the way.
        Motion: the flaps turn on the motion engine, so the OS reduce-motion setting (and motion={false}) shows the
        word at once; global speed and "Stop all" slow or freeze the board. A new word typed mid-way keeps each reel
        turning from the flap it shows, the way a real board does. */}
    <SplitFlap value={$word} length={10} align="center" flapTime={60} stagger={40} size="lg" label="Kelime" />
    {/* An ordinary text field; its aria-label names it for screen readers. */}
    <TextInput aria-label="Kelime" bind:value={$word} placeholder="Bir kelime yazın" />
  </div>
}
