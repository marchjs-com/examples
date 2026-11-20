import { Toggle, Card, Badge } from "march/ui"

// Toggle'ın bütün özellikleri bir arada: değer (bind:value, onChange), etiket (label ya da children: zengin içerik),
// üç durum (tristate: açık / kapalı / ayarlanmamış), renk (m:color), durumlar (disabled, readonly, invalid, required),
// bağlar (id, name, class, aria-label, describedby, onFocus, onBlur) ve koyu zemin
const colors = ["brand-orange", "brand-blue", "brand-green", "brand-purple", "brand-pink"] as const
const word = (v: boolean | null): string => (v == null ? "ayarlanmamış" : v ? "açık" : "kapalı")

// bir bölüm: üstte adı, altında örnekler; sığmazsa alt satıra
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>{props.children}</div>
</div>

export function ToggleLab() {
  let $dark = false
  let $sound = true
  let $changes = 0
  let $pressed: boolean | null = null
  let $focus = "yok"
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Değer (bind:value), id, name, onFocus / onBlur">
      <Toggle bind:value={$dark} label="Karanlık mod" id="lab-dark" name="dark"
        onFocus={() => $focus = "karanlık"} onBlur={() => $focus = "yok"} />
      <span>Karanlık: {$dark ? "açık" : "kapalı"} · odak: {$focus}</span>
    </Section>
    <Section title="onChange ve children (zengin etiket)">
      <Toggle value={$sound} onChange={(v: boolean) => { $sound = v; $changes++ }}>
        Bildirim sesi <Badge tone={$sound ? "success" : "neutral"}>{$sound ? "Açık" : "Sessiz"}</Badge>
      </Toggle>
      <span>{$changes} değişiklik</span>
    </Section>
    <Section title="Üç durum (tristate)">
      <Toggle tristate value={$pressed} onChange={(v: boolean) => $pressed = v} label="Basılı (pressed)" />
      <span>Basılı: {word($pressed)}</span>
    </Section>
    <Section title="Renk (m:color)">{colors.map((c) => <Toggle m:color={c} value={true} label={c} />)}</Section>
    <Section title="Durumlar">
      <Toggle disabled value={true} label="Devre dışı (açık)" />
      <Toggle disabled label="Devre dışı (kapalı)" />
      <Toggle readonly value={true} label="Salt okunur" />
      <Toggle invalid required describedby="lab-terms-error" class="lab-terms" label="Koşulları kabul ediyorum" />
      <span id="lab-terms-error" sx={{ text: "sm", color: "danger" }}>Devam etmek için kabul et</span>
    </Section>
    <Section title="Görünür etiket yok (aria-label)">
      <Toggle aria-label="Konum paylaşımı" value={true} m:color="brand-blue" />
    </Section>
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <Toggle value={true} m:color="brand-gold" label="Gece vardiyası" />
        <Toggle tristate label="Gece belirsiz" />
      </Section>
    </Card>
  </div>
}
