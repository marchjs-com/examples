// HeroLab: the full-featured Hero example; it uses every prop at least once.
//
// Props shown here: variant (all seven), align, size, level, eyebrow with eyebrowHref and eyebrowArrow, title and highlight,
// lead, actions, note, media, video, layers (parallax), colors (aurora), backdrop, reveal, frameBar, tilt, class and children.
// The switches above the hero drive variant, align, backdrop, tilt and frameBar so you can try them.
// Use it as a reference when you need one option: find the prop below and copy the line.
// HeroLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Hero } from "march/landing"
import { Segmented, Toggle, Card } from "march/ui"
import { arrowRight, play } from "march/icons"

// The seven looks of Hero.
const VARIANTS = ["centered", "split", "video", "mesh", "aurora", "product", "parallax"] as const

// The media of the product look: any node works (here a small fake app screen with a name for screen readers).
const Screen = () => <div sx={{ flex: ["col", "center"], gap: 2, p: 6 }} aria-label="Uygulama ekranı" role="img">
  <strong>Bugünün etkinlikleri</strong><span sx={{ color: "muted" }}>3 yeni buluşma</span>
</div>

export function HeroLab() {
  // State driven by the switches: the look, align to start, decorative layers, tilt, window bar and a click counter.
  let $variant: (typeof VARIANTS)[number] = "product"
  let $start = false
  let $backdrop = true
  let $tilt = true
  let $bar = true
  let $joined = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls. Segmented picks the variant; each Toggle is bound to a state value. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Toggle label="Başa hizala" bind:value={$start} />
        <Toggle label="Süs katmanları" bind:value={$backdrop} />
        <Toggle label="Eğim" bind:value={$tilt} />
        <Toggle label="Pencere çubuğu" bind:value={$bar} />
      </div>
    </Card>
    {() => {
      // Hero reads most props once. So every state is read here, in a function block: when one changes, the block runs again and
      // Hero is drawn again with the new values.
      const variant = $variant, start = $start, backdrop = $backdrop, tilt = $tilt, bar = $bar, joined = $joined
      // - variant: one of the seven looks. align: "start" or "center". size="md": medium minimum height. level={2}: an h2 title.
      // - eyebrow + eyebrowHref + eyebrowArrow: the pill above the title; with an href it is a link, and eyebrowArrow replaces the
      //   arrow after it (true / false / your own node).
      // - title + highlight: `highlight` is the part of the title drawn in the brand gradient. lead: the paragraph.
      // - actions: the first is primary; `variant` styles another one, icon / iconEnd add icons, onClick runs code.
      // - note: small text under the actions. media: a node (or an image object) for the split and product looks.
      // - video: used by the video look (src, poster). layers: the parallax look's layers; speed sets how fast a layer moves.
      // - colors: the colours of the aurora look. backdrop: the decorative layers of the look on or off.
      // - reveal="blur": the entrance effect of the copy ("none" switches it off; the motion engine honours reduced motion).
      // - frameBar: the window bar of the product look. tilt: whether its frame starts tilted. class: a hook for tests and CSS.
      // - Children: extra content under the note (here a small line).
      return <Hero variant={variant} align={start ? "start" : "center"} size="md" level={2} class="lab-hero"
      eyebrow="Yeni: canlı etkinlikler" eyebrowHref="#yenilikler" eyebrowArrow={<span aria-hidden="true">↗</span>}
      title="Bugün kiminle buluşuyorsun?" highlight="buluşuyorsun"
      lead="Yakınındaki etkinlikleri bul, bir dokunuşla katıl."
      actions={[{ label: `Katıl (${joined})`, iconEnd: arrowRight, onClick: () => $joined++ }, { label: "Tanıtımı izle", icon: play, variant: "secondary" }]}
      note="Ücretsiz · kart gerekmez" media={<Screen /> as Node}
      video={{ src: "/media/hadi-waves.webm", poster: "/media/hadi-waves.jpg" }}
      layers={[{ content: <div class="lab-sky" style={{ inlineSize: "100%", blockSize: "100%" }} />, speed: 0.4 }]}
      colors={["#ff7a59", "#7c5cff", "#2bb8ff"]} backdrop={backdrop} reveal="blur" frameBar={bar} tilt={tilt}>
      <small sx={{ color: "muted" }}>12 şehirde, 40 bin kişi</small>
    </Hero>
    }}
  </div>
}
