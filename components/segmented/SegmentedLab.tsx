import { Segmented, Card } from "march/ui"
import { sun, moon, monitor, bold, italic, strikethrough } from "march/icons"

// Segmented'in bütün özellikleri bir arada: değer (bind:value, onChange), seçenekler (metin, dizi, nesne: label, icon,
// title, disabled; label "" ile yalnız ikon), seçili gösterge (indicator: fill / slide), renk (m:color), durumlar
// (disabled, readonly, invalid, required), bağlar (id, name, class, aria-label, labelledby, onBlur) ve koyu zemin
const themes = [
  { value: "light", label: "Açık", icon: sun }, { value: "dark", label: "Koyu", icon: moon },
  { value: "system", label: "", icon: monitor, title: "Sisteme uy" },
]
const plans = [{ value: "monthly", label: "Aylık" }, { value: "yearly", label: "Yıllık" }, { value: "life", label: "Ömür boyu", disabled: true, title: "Yakında" }]

// bir bölüm: üstte adı, altında örnekler; sığmazsa alt satıra
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function SegmentedLab() {
  let $view = "Hafta"
  let $theme = "light"
  let $plan = "monthly"
  let $changes = 0
  let $touched = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Değer (bind:value, metin seçenekler), id, name, onBlur">
      <Segmented bind:value={$view} options="Gün, Hafta, Ay" aria-label="Dönem" id="lab-period" name="period" onBlur={() => $touched = true} />
      <span>Seçili: {$view}{$touched ? " · dokunuldu" : ""}</span>
    </Section>
    <Section title="İkonlar, yalnız ikon (title), kayan gösterge, onChange">
      <Segmented value={$theme} onChange={(v: string) => { $theme = v; $changes++ }} options={themes} indicator="slide" aria-label="Tema" />
      <span>Tema: {$theme} · {$changes} değişiklik</span>
    </Section>
    <Section title="Kapalı seçenek (title ipucu), renk">
      <Segmented bind:value={$plan} options={plans} m:color="brand-green" aria-label="Plan" />
      <Segmented value="b" options={[{ value: "b", label: "", icon: bold, title: "Kalın" }, { value: "i", label: "", icon: italic, title: "Eğik" }, { value: "s", label: "", icon: strikethrough, title: "Üstü çizili" }]} m:color="brand-purple" indicator="slide" aria-label="Biçim" />
    </Section>
    <Section title="Dizi seçenekler (sayılar)">
      <Segmented value={2} options={[1, 2, 3, 4]} m:color="brand-orange" aria-label="Kişi sayısı" />
    </Section>
    <Section title="Durumlar">
      <Segmented disabled value="Evet" options="Evet, Hayır" aria-label="Devre dışı" />
      <Segmented readonly value="Okunur" options="Okunur, Değişmez" aria-label="Salt okunur" />
      <span id="lab-size-title" sx={{ text: "bold" }}>Beden</span>
      <Segmented labelledby="lab-size-title" invalid required class="lab-size" options="S, M, L" />
    </Section>
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <Segmented value="Gece" options="Gece, Gündüz" indicator="slide" m:color="brand-blue" aria-label="Koyu zeminde" />
      </Section>
    </Card>
  </div>
}
