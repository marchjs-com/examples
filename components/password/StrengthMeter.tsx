// StrengthMeter: the creative-minimal PasswordInput example.
//
// A password strength meter: as you type, the length, a digit, a capital letter and a symbol are counted, and a badge
// changes its colour and its word together. Use this pattern next to any sign-up password field; it needs no extra
// component, only a score derived from the bound value.
import { PasswordInput, Field, Badge } from "march/ui"

// Four rules (each a regular expression): at least 8 characters, a digit, a capital letter (with the Turkish capitals)
// and a symbol (a character that is not a letter, digit or space). The score is how many rules the text satisfies.
// The words and the badge tones are looked up by the score (0 to 4).
const rules = [/.{8,}/, /\d/, /[A-ZÇĞİÖŞÜ]/, /[^\p{L}\d\s]/u]
const words = ["Çok zayıf", "Zayıf", "Orta", "İyi", "Çok güçlü"]
const tones = ["danger", "danger", "warn", "info", "success"]

export function StrengthMeter() {
  // The password and the score derived from it: recalculated on every keystroke.
  let $pw = ""
  const $score = rules.filter((r) => r.test($pw)).length
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Field draws the visible label and the help text. autocomplete="new-password" lets a password manager offer a
        generated password; the input keeps its default show / hide button. */}
    <Field label="Yeni parola" help="8 karakter, bir rakam, bir büyük harf ve bir simge: dördü de tam puan">
      <PasswordInput bind:value={$pw} autocomplete="new-password" placeholder="Bir parola uydur" />
    </Field>
    {/* The meter: the Badge's tone gives the colour, the text gives the word, so the strength is not shown by colour
        alone. The score line says how many rules are met. */}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Badge tone={tones[$score]}>{words[$score]}</Badge>
      <span sx={{ text: "sm", color: "muted" }}>{$score} / 4 kural</span>
    </div>
  </div>
}
