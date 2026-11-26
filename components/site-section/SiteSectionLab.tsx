// SiteSectionLab: the full-featured SiteSection example; it uses every prop at least once.
//
// Props shown here: eyebrow, title (live), lead, align, tone, width, space, level, reveal, id (the anchor), class, children
// and extra attributes passed to the section (data-*, aria-*).
// The controls at the top change the section live. Use it as a reference when you need one specific option: find the prop
// below, copy the line.
// SiteSectionLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { SiteSection } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"

// The four tones (the background of the section).
const TONES = ["plain", "muted", "brand", "inverse"] as const

export function SiteSectionLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it. $visits counts presses of the button
  // inside the section.
  let $tone: (typeof TONES)[number] = "muted"
  let $start = false
  let $wide = false
  let $h3 = false
  let $reveal = false
  let $visits = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Ton" options={TONES.map((t) => ({ value: t, label: t }))} bind:value={$tone} />
        <Toggle label="Başa hizala" bind:value={$start} />
        <Toggle label="Geniş" bind:value={$wide} />
        <Toggle label="Üçüncü düzey" bind:value={$h3} />
        <Toggle label="Giriş hareketi" bind:value={$reveal} />
      </div>
    </Card>
    {() => {
      // The options are read here, so changing a control draws the section again.
      const tone = $tone, start = $start, wide = $wide, h3 = $h3, reveal = $reveal
      // SiteSection props, one by one:
      // - class="lab-ss" and id="ozellikler": a class for the tests (or your CSS) and the anchor of the section. Other
      //   attributes, here data-section and aria-describedby, are passed on to the section element.
      // - eyebrow, title, lead: the heading group. title is a function, so it stays live and shows the counter.
      // - align: how the heading group is aligned ("center" is the default, "start" is the alternative).
      // - tone: plain, muted, brand or inverse (the background).
      // - width: "narrow", "default", "wide" or "full" (46 / 72 / 84 rem / edge to edge). space: the vertical padding
      //   (none, sm, md or lg).
      // - level: the heading level of the title (1-3, default 2); use 1 once on a page that has no hero.
      // - reveal: the entrance of the heading group. false means none; an object such as { effect: "blur", stagger: 120 }
      //   chooses the effect and the delay between parts. The default is { effect: "up", stagger: 90 }. It honours
      //   reduced motion.
      // The children (the note and the button below) are drawn inside the section. The section is named by its title
      // through aria-labelledby.
      return <SiteSection class="lab-ss" id="ozellikler" data-section="features" aria-describedby="lab-ss-note"
        eyebrow="Özellikler" title={() => `Her şey tek yerde (${$visits})`} lead="Takvim, sohbet ve ödeme aynı uygulamada."
        align={start ? "start" : "center"} tone={tone} width={wide ? "wide" : "narrow"} space="sm" level={h3 ? 3 : 2}
        reveal={reveal ? { effect: "blur", stagger: 120 } : false}>
        <p id="lab-ss-note" sx={{ text: "center" }}>Bölümün içeriği burada.</p>
        <Button on:click={() => $visits++}>Uğradım</Button>
      </SiteSection>
    }}
  </div>
}
