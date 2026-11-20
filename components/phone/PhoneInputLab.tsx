import { PhoneInput, Card } from "march/ui"
import { Icon, phone } from "march/icons"

// PhoneInput'un bütün özellikleri: bind:value ve onChange, ülke kodu (country) önek olur ve ulusal numaranın başına
// eklenir, ülke kodu yokken 00 → +, kendi önek / sonekin, yer tutucu, otomatik doldurma, klavye (inputmode),
// en çok uzunluk, zorunlu, geçersiz, devre dışı, salt okunur, id / name / class, aria-label, describedby, odak olayları
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function PhoneInputLab() {
  let $tr = ""
  let $world = ""
  let $office = "+902125550101"
  let $edits = 0
  let $focused = false
  const $short = $office.length > 0 && $office.length < 13
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Ülke kodu (country), bind:value, onChange">
      <PhoneInput bind:value={$tr} country="+90" placeholder="532 111 22 33" aria-label="Türkiye numarası" onChange={() => $edits++} />
      <span sx={{ text: ["sm", "mono"] }}>Saklanan: {$tr || "—"} · değişiklik: {$edits}</span>
    </Row>
    <Row title="Ülke kodu yok: + ya da 00 ile uluslararası">
      <PhoneInput bind:value={$world} placeholder="+49 151 2345 6789" aria-label="Uluslararası numara" />
      <span sx={{ text: ["sm", "mono"] }}>Uluslararası: {$world || "—"}</span>
    </Row>
    <Row title="Kendi önek ve sonekin">
      <PhoneInput prefix={<Icon of={phone} />} suffix="dahili 12" value="+902125550199" aria-label="Santral" />
    </Row>
    <Row title="Form: zorunlu, geçersiz, uzunluk, otomatik doldurma, odak">
      <PhoneInput bind:value={$office} aria-label="İş telefonu" country="+90" id="lab-office-phone" name="office-phone" class="lab-phone" required
        invalid={$short} autocomplete="tel-national" inputmode="tel" maxLength={16} describedby="lab-phone-hint"
        onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-phone-hint" sx={{ text: "sm", color: "muted" }}>{$short ? "Numara eksik" : "Numara tamam"} · {$focused ? "yazıyorsun" : "odak dışında"}</span>
    </Row>
    <Row title="Devre dışı ve salt okunur">
      <PhoneInput value="+905321112233" country="+90" disabled aria-label="Kilitli numara" />
      <PhoneInput value="+442079460000" country="+44" readonly aria-label="Salt okunur numara" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <PhoneInput value="+15550143" country="+1" aria-label="Gece hattı" />
      </Row>
    </Card>
  </div>
}
