// MoodBoard: the creative-minimal OptionList example.
//
// Today's mood: four emoji choices in two columns. The chosen mood changes the colour of the whole card and the
// sentence under the list. It is the smallest useful OptionList: bind:value, options with an icon and a hint, and the
// `columns` prop. Use this pattern for a pick-one choice where each option deserves an icon and a short description.
import { OptionList, Card } from "march/ui"

// Each option: `value` is what is stored, `label` the text, `icon` the lead of the row (here an emoji string, an icon
// definition works too) and `hint` a small second line.
const moods = [
  { value: "happy", label: "Neşeli", icon: "😄", hint: "Her şey yolunda" },
  { value: "calm", label: "Sakin", icon: "🌿", hint: "Yavaş bir gün" },
  { value: "busy", label: "Yoğun", icon: "⚡", hint: "Toplantıdan toplantıya" },
  { value: "sleepy", label: "Uykulu", icon: "😴", hint: "Kahve lazım" },
]
// A colour token per mood, used for m:color below.
const colors: Record<string, string> = { happy: "brand-orange", calm: "brand-green", busy: "brand-blue", sleepy: "brand-purple" }

export function MoodBoard() {
  // The chosen value; bind:value below writes the picked option back into it.
  let $mood = "happy"
  // m:color is a common prop (it works on every component): it sets the colour token of the Card and everything in
  // it, including the chosen row's tick. Because it reads $mood, the card changes colour when the mood changes.
  return <Card m:color={colors[$mood]} title="Bugün nasılsın?">
    {/* - options: the rows. columns={2}: a grid of two columns; the arrow keys then move in two directions.
        - label: the accessible name of the list. By default the list is a radio group (one value, aria-checked),
          one Tab stop: the arrow keys move between rows and Enter or Space chooses. */}
    <OptionList bind:value={$mood} options={moods} columns={2} label="Mod" />
    <p sx={{ text: "sm", color: "muted" }}>{`Seçtiğin mod: ${moods.find((m) => m.value === $mood)?.label}`}</p>
  </Card>
}
