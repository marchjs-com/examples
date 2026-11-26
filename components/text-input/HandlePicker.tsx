// HandlePicker: the creative-minimal TextInput example.
//
// What it shows: choosing a username. The input has an "@" prefix, turns what you type into lower case without spaces, shows
// an error while the name is shorter than three characters, and the profile address under it updates as you type.
// When to use this pattern: a single input that must keep a strict format. `transform` rewrites the text as it is typed (so
// the user cannot enter a bad value), and `error` + `errorSpace` give an input its own error line without a <Field>.
//
// Animation: none of its own.
// Accessibility: a native <input>; there is no <Field> here, so the accessible name comes from `aria-label`. The `error` text
// is linked to the input (aria-describedby, aria-invalid) and is a role="alert". `errorSpace` keeps the error line's height
// while it is empty, so nothing moves when an error appears. The "@" prefix is plain text next to the input.
import { TextInput, Card } from "march/ui"

export function HandlePicker() {
  // Reactive state: the username, and a derived value (a `const $x` is recomputed when $handle changes): is it too short?
  let $handle = "deniz.yildiz"
  const $short = $handle.length < 3
  // m:theme="night" draws the card in the dark theme.
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* prefix="@" is text before the input. maxLength={20} limits the length. transform runs on every change: it lower-cases
          with the Turkish locale rules and removes whitespace. error shows its text under the input and marks it
          invalid; an empty string means no error. */}
      <TextInput bind:value={$handle} prefix="@" aria-label="Kullanıcı adı" maxLength={20}
        transform={(v: string) => v.toLocaleLowerCase("tr").replace(/\s+/g, "")}
        error={$short ? "En az 3 harf" : ""} errorSpace />
      {/* A live preview of the address; its colour is a second signal of the same state as the error. */}
      <span sx={{ text: "sm", color: $short ? "danger" : "brand-green" }}>hadisosyal.com/@{$handle}</span>
    </div>
  </Card>
}
