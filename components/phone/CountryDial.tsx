import { PhoneInput, Button } from "march/ui"

// ülke seç, numarayı yaz: kod düğmeleri öneki değiştirir; saklanan değer her zaman "+" ve rakamlardan oluşur
const countries = [
  { code: "+90", flag: "🇹🇷", sample: "532 111 22 33" },
  { code: "+49", flag: "🇩🇪", sample: "151 2345 6789" },
  { code: "+44", flag: "🇬🇧", sample: "7700 900123" },
  { code: "+1", flag: "🇺🇸", sample: "202 555 0143" },
]

export function CountryDial() {
  let $cc = "+90"
  let $phone = ""
  const $sample = countries.find((c) => c.code === $cc)?.sample ?? ""
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 1 }}>
      {countries.map((c) => <Button size="sm" shape="pill" pressed={$cc === c.code} on:click={() => { $cc = c.code; $phone = "" }}>{c.flag} {c.code}</Button>)}
    </div>
    <PhoneInput bind:value={$phone} country={$cc} placeholder={$sample} aria-label="Telefon" />
    <span sx={{ text: ["sm", "mono"], color: "muted" }}>{$phone || "henüz numara yok"}</span>
  </div>
}
