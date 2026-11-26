// MoodSelect: the creative-minimal Select example.
//
// What it shows: a Select whose options hold whole objects, not just texts. Choosing a mood gives you the object back
// (with its emoji, colour and word), and the card text is drawn from it.
// When to use this pattern: when the choice carries more than one fact. Select keeps the type of each option value (a
// number stays a number, an object stays the same object), so you do not need to look the object up by an id afterwards.
import { Select, Card } from "march/ui"

// One mood: an emoji, a colour token and a word for the sentence.
type Mood = { emoji: string; color: "brand-orange" | "brand-blue" | "brand-green" | "brand-purple"; word: string }
// The options: { value, label }. `label` is the text in the dropdown, `value` is the object the Select returns.
const moods: { value: Mood; label: string }[] = [
  { value: { emoji: "🌞", color: "brand-orange", word: "enerjik" }, label: "🌞 Enerjik" },
  { value: { emoji: "🌊", color: "brand-blue", word: "sakin" }, label: "🌊 Sakin" },
  { value: { emoji: "🌿", color: "brand-green", word: "huzurlu" }, label: "🌿 Huzurlu" },
  { value: { emoji: "🔮", color: "brand-purple", word: "meraklı" }, label: "🔮 Meraklı" },
]

export function MoodSelect() {
  // `let $mood` is a March signal holding the chosen mood object; it starts with the first one. bind:value writes the
  // chosen object into it, and everything that reads it redraws.
  let $mood = moods[0]!.value
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Select options used here:
          - bind:value={$mood}: two-way binding; the value is the object itself.
          - options={moods}: objects with value and label (a plain array of values or a comma-separated text also work).
          - placeholder={false}: no empty first option, so something is always chosen (the default would add an empty one).
          - aria-label: the accessible name. There is no visible label here; with a Field around it (see
            ShippingAddress) the label comes from the Field.
          Select is the native <select> element, so phones show their own picker and keyboard and type-ahead work as on
          any page. */}
      <Select bind:value={$mood} options={moods} placeholder={false} aria-label="Bugünkü ruh halin" />
      <span sx={{ text: ["2xl", "bold"], color: $mood.color }}>{$mood.emoji} Bugün {$mood.word} hissediyorsun</span>
    </div>
  </Card>
}
