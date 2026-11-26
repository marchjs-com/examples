// CtaBandLab: the full-featured CtaBand example; it uses every prop at least once.
//
// Props shown here: title, lead, actions (objects or nodes), note, the five backgrounds (variant), video, align, backdrop
// (the decorative layers), reveal (the entrance motion) and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CtaBandLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CtaBand } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"
import { arrowRight, play } from "march/icons"

// The five variants for the Segmented control (value is what CtaBand takes, label is the Turkish text shown).
const VARIANTS = [{ value: "gradient", label: "gradyan" }, { value: "mesh", label: "ağ" }, { value: "glass", label: "cam" }, { value: "plain", label: "sade" }, { value: "video", label: "video" }]

export function CtaBandLab() {
  let $variant = "gradient"
  let $start = false
  let $backdrop = true
  let $motion = false
  let $joined = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls: they change the props of the band below at run time. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Arka plan" options={VARIANTS} bind:value={$variant} />
        <Toggle label="Başa hizala" bind:value={$start} />
        <Toggle label="Süs katmanları" bind:value={$backdrop} />
        <Toggle label="Giriş hareketi" bind:value={$motion} />
      </div>
    </Card>
    {() => {
      // The signals are read here, so the band is drawn again when one changes (variant, alignment and the entrance
      // are applied when the band is built). title and note below are functions, so they update on their own.
      const variant = $variant, start = $start, backdrop = $backdrop, motion = $motion
      // The prop list, one by one:
      // - variant: gradient, mesh, glass, plain or video; video gives the { src, poster } used by the video variant.
      // - align: "center" (the default) or "start".
      // - backdrop: the decorative layers of the variant (gradient, mesh, glass, grid, pointer light); false leaves a bare
      //   panel that you style yourself through `class`.
      // - reveal: the entrance of the panel when it scrolls into view ("blur" here; the default is "scale"; "none" turns
      //   it off). It runs on the motion engine, so reduced motion, the global speed and "Stop all" apply.
      // - title / lead / note: the texts; a function is live (it re-reads the state).
      // - actions: the first is the primary button; each is an object ({ label, icon, iconEnd, variant, href,
      //   onClick }) or a ready node (the link button at the end).
      return <CtaBand class="lab-cta" variant={variant as "gradient"} align={start ? "start" : "center"} backdrop={backdrop}
        reveal={motion ? "blur" : "none"} video={{ src: "/media/hadi-waves.webm", poster: "/media/hadi-waves.jpg" }}
        title={() => `Bugün ${$joined} kişi katıldı`} lead="Sen de aramıza katıl, ilk hafta ücretsiz."
        actions={[
          { label: "Katıl", iconEnd: arrowRight, onClick: () => $joined++ },
          { label: "Tanıtım", icon: play, variant: "secondary" },
          <Button variant="link" href="#sss" class="lab-faq">Sık sorulanlar</Button> as Node,
        ]}
        note={() => ($joined ? "Teşekkürler!" : "Kart gerekmez")} />
    }}
  </div>
}
