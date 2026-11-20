import { SectionLabel, IconButton, Card } from "march/ui"
import { star, plus, clock } from "march/icons"

// SectionLabel'in bütün özellikleri bir arada: label ya da children, as (kök öğe: h3, legend…), icon (ikon ya da emoji),
// count (canlı), actions (sondaki yuva), upper (büyük harf ya da yazıldığı gibi), size (sm, md), rule (çizgi), class,
// m:color ve öteki öznitelikler (id, aria-*)
export function SectionLabelLab() {
  let $tasks = 3
  let $title = "Görevler"
  return <div sx={{ flex: "col", gap: 3 }}>
    <SectionLabel label="Sık kullanılanlar" icon={star} count={2} />
    <SectionLabel icon="🔥" class="lab-tasks" count={$tasks} m:color="brand-orange"
      actions={<IconButton icon={plus} label="Görev ekle" size="xs" on:click={() => $tasks++} />}>{$title}</SectionLabel>
    <SectionLabel as="h3" upper={false} size="md" rule class="lab-reports" id="raporlar">Raporlar</SectionLabel>
    <fieldset>
      <SectionLabel as="legend" label="Bildirimler" size="md" m:color="primary" />
    </fieldset>
    <SectionLabel label={$title} icon={clock} upper={false} class="lab-live" aria-description="canlı başlık"
      actions={<IconButton icon={star} label="Başlığı değiştir" size="xs" on:click={() => $title = $title === "Görevler" ? "Yapılacaklar" : "Görevler"} />} />
    <Card m:theme="night">
      <SectionLabel label="Gece paneli" icon={star} count={7} rule m:color="brand-purple" />
    </Card>
  </div>
}
