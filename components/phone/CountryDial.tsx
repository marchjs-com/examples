// CountryDial: the creative-minimal PhoneInput example.
//
// Pick a country, type the number: the country buttons change the calling-code prefix of the field, and the stored value
// is always "+" followed by digits. Use this pattern for a phone field where the country is chosen outside of it.
import { PhoneInput, Button } from "march/ui"

// The countries: the calling code, a flag, and a sample number that is used as the placeholder.
const countries = [
  { code: "+90", flag: "🇹🇷", sample: "532 111 22 33" },
  { code: "+49", flag: "🇩🇪", sample: "151 2345 6789" },
  { code: "+44", flag: "🇬🇧", sample: "7700 900123" },
  { code: "+1", flag: "🇺🇸", sample: "202 555 0143" },
]

export function CountryDial() {
  // The chosen calling code, the stored phone value, and the sample derived from the code.
  let $cc = "+90"
  let $phone = ""
  const $sample = countries.find((c) => c.code === $cc)?.sample ?? ""
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 1 }}>
      {/* One pill button per country. `pressed` marks the chosen one (aria-pressed, so it is clear for screen readers
          too). Choosing a country also clears the number, because a number typed for another country would be wrong. */}
      {countries.map((c) => <Button size="sm" shape="pill" pressed={$cc === c.code} on:click={() => { $cc = c.code; $phone = "" }}>{c.flag} {c.code}</Button>)}
    </div>
    {/* country: the calling code is shown as a prefix and put in front of the national number you type, so a number such
        as "0532..." is stored as "+90532...". placeholder follows the country. aria-label names the field (there is no
        visible label). The input is type="tel", so phones show the phone keypad. */}
    <PhoneInput bind:value={$phone} country={$cc} placeholder={$sample} aria-label="Telefon" />
    <span sx={{ text: ["sm", "mono"], color: "muted" }}>{$phone || "henüz numara yok"}</span>
  </div>
}
