import { CheckboxGroup } from "march/ui"

// spor günleri: çip görünümünde gün seçici, HADİ renkleriyle; kaç gün seçildiyse altında yazar
const DAYS = [{ value: "mon", label: "Pzt" }, { value: "tue", label: "Sal" }, { value: "wed", label: "Çar" }, { value: "thu", label: "Per" }, { value: "fri", label: "Cum" }, { value: "sat", label: "Cmt" }, { value: "sun", label: "Paz" }]

export function GymDays() {
  let $days = ["mon", "thu"]
  return <div sx={{ flex: "col", gap: 2 }}>
    <CheckboxGroup bind:value={$days} options={DAYS} variant="chip" colors="brand" inline aria-label="Spor günleri" />
    <span sx={{ text: "sm", color: "muted" }}>{$days.length ? `Haftada ${$days.length} gün 💪` : "Bu hafta dinlenme 😴"}</span>
  </div>
}
