// SectionLabelLab: the full-featured SectionLabel example; it uses every prop at least once.
//
// Props shown here: label or children, as (the root element: h3, legend...), icon (an icon or an emoji), count (live),
// actions (the end slot), upper (uppercase or as written), size (sm, md), rule (a line), class, m:color and other
// attributes (id, aria-*), which go to the root element.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SectionLabelLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { SectionLabel, IconButton, Card } from "march/ui"
import { star, plus, clock } from "march/icons"

export function SectionLabelLab() {
  // Plain `let $name` variables are March signals: assigning one redraws whatever reads it.
  let $tasks = 3
  let $title = "Görevler"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The text can come from `label` (a prop) or from the children, as in the second label. Here: label with an icon
        and a static count. */}
    <SectionLabel label="Sık kullanılanlar" icon={star} count={2} />
    {/* The second label: an emoji as icon, a live count, an end slot with an IconButton (its `label` is its accessible
        name), a class for the tests and m:color (a common prop: the colour token of the label). The children are the
        text, here a signal, so the text is live too. */}
    <SectionLabel icon="🔥" class="lab-tasks" count={$tasks} m:color="brand-orange"
      actions={<IconButton icon={plus} label="Görev ekle" size="xs" on:click={() => $tasks++} />}>{$title}</SectionLabel>
    {/* as="h3": the root becomes a heading element (use it where the label starts a section of the page).
        upper={false}: the text is kept as written instead of uppercase. size="md": the larger size (default "sm").
        rule: a thin line fills the row after the text. id (like role and aria-*) goes to the root element, so an
        aria-labelledby can point to it. */}
    <SectionLabel as="h3" upper={false} size="md" rule class="lab-reports" id="raporlar">Raporlar</SectionLabel>
    {/* as="legend": the right root inside a fieldset, so the label names the group of fields for assistive technology.
        m:color="primary" takes the theme's primary colour. */}
    <fieldset>
      <SectionLabel as="legend" label="Bildirimler" size="md" m:color="primary" />
    </fieldset>
    {/* A live label: `label` receives a signal, and the end button changes it. aria-description is not a SectionLabel
        prop: it is one of the other attributes passed to the root element. */}
    <SectionLabel label={$title} icon={clock} upper={false} class="lab-live" aria-description="canlı başlık"
      actions={<IconButton icon={star} label="Başlığı değiştir" size="xs" on:click={() => $title = $title === "Görevler" ? "Yapılacaklar" : "Görevler"} />} />
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. */}
    <Card m:theme="night">
      <SectionLabel label="Gece paneli" icon={star} count={7} rule m:color="brand-purple" />
    </Card>
  </div>
}
