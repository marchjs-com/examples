import { PasswordInput, Field, Badge } from "march/ui"

// parola gücü: yazdıkça uzunluk, rakam, büyük harf ve simge sayılır; rozetin rengi ve sözü birlikte değişir
const rules = [/.{8,}/, /\d/, /[A-ZÇĞİÖŞÜ]/, /[^\p{L}\d\s]/u]
const words = ["Çok zayıf", "Zayıf", "Orta", "İyi", "Çok güçlü"]
const tones = ["danger", "danger", "warn", "info", "success"]

export function StrengthMeter() {
  let $pw = ""
  const $score = rules.filter((r) => r.test($pw)).length
  return <div sx={{ flex: "col", gap: 2 }}>
    <Field label="Yeni parola" help="8 karakter, bir rakam, bir büyük harf ve bir simge: dördü de tam puan">
      <PasswordInput bind:value={$pw} autocomplete="new-password" placeholder="Bir parola uydur" />
    </Field>
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Badge tone={tones[$score]}>{words[$score]}</Badge>
      <span sx={{ text: "sm", color: "muted" }}>{$score} / 4 kural</span>
    </div>
  </div>
}
