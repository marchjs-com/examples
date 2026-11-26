// NeonName: the creative-minimal PixelFont example.
//
// Type your name and see it in LED letters. PixelFont draws text in March's own pixel font (every Turkish letter
// included) on a screen exactly as wide as the text, so it grows as you type.
import { PixelFont, TextInput, Field } from "march/ui"

export function NeonName() {
  let $name = "Çağla"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* bind:value keeps $name and the field in step (two-way). */}
    <Field label="Adın"><TextInput bind:value={$name} /></Field>
    {/* text follows $name; `:heart:` puts a pixel emoji at the end. The pink tubes and a strong bloom give the neon
        look; pitch is the size of one LED in px. A screen reader hears the text itself, with the emoji read as the word "heart". */}
    <PixelFont text={() => `${$name || "?"} :heart:`} shape="tube" color="brand-pink" bloom={12} pitch={8} />
  </div>
}
