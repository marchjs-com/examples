// PitchDeck: the real-life Presentation example.
//
// What it shows: an investor pitch of five slides (opening, problem, solution in two columns, numbers, closing),
// each with speaker notes, and a line under the deck that shows the current slide number.
// When to use this pattern: talks, demos and onboarding tours that live inside a page.
//
// Keyboard: arrow keys, Page Up / Down, Space and Home / End move through the deck, F goes full screen, P opens the
// speaker window. The deck is a focusable region and only the current slide is exposed to screen readers.
// Animation: slide changes and Appear steps run on the motion engine, so reduced motion (slides change without
// movement), global speed and "Stop all" apply; `transition="none"` turns the slide transition off.

import { Presentation, Slide, Appear } from "march/landing"
import { Overlay } from "march/ui"

export function PitchDeck() {
  // The index of the current slide. bind:index below keeps it in step with the deck in both directions.
  let $slide = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* - bind:index: the deck writes the current index into $slide (and follows it if you change it).
        - label: the accessible name of the deck.
        - sync="pitch": every window or tab with the same sync name stays on the same slide (the speaker window uses
          this).
        Slide props: layout picks the arrangement (title, split, center...), tone the colour treatment (brand,
        inverse...),
        notes the text shown in the speaker view. */}
    <Presentation bind:index={$slide} label="Mahalle Pazarı yatırımcı sunumu" sync="pitch">
      {/* Opening slide: a title layout on the brand tone. */}
      <Slide layout="title" tone="brand" notes="Kendini tanıt, 20 saniye.">
        <h2>Mahalle Pazarı</h2>
        <p>Semt pazarı, kapında. Tohum turu 2026</p>
      </Slide>
      <Slide notes="Sorunu bir hikâyeyle anlat.">
        <h2>Sorun</h2>
        {/* Appear reveals its children one per step: each press of "next" shows one more line before the deck moves on. */}
        <Appear><li>Pazarcıların %70'i internette yok</li><li>Gençler pazara gidecek vakit bulamıyor</li><li>Her pazar 120 kg ürün çöpe gidiyor</li></Appear>
      </Slide>
      {/* A split slide takes two children and puts them in two columns. */}
      <Slide layout="split" notes="Uygulamayı göster.">
        <div><h2>Çözüm</h2><p>Pazarcı ürününü sabah fotoğraflar, akşam kapına gelir.</p></div>
        <div sx={{ flex: "col", gap: 2, p: 4 }}><strong>🥬 Ispanak · 25 ₺</strong><strong>🍅 Domates · 40 ₺</strong><strong>🧀 Ezine peyniri · 180 ₺</strong></div>
      </Slide>
      {/* `background` takes any node drawn behind the slide; here a mesh Overlay at 35% opacity. */}
      <Slide layout="center" tone="inverse" background={<Overlay effect="mesh" opacity={0.35} />} notes="Rakamları yavaş söyle.">
        <h2>12 bin sipariş</h2>
        <p>ilk altı ayda, üç ilçede</p>
      </Slide>
      <Slide layout="title" notes="Teşekkür et, soruları al.">
        <h2>Teşekkürler</h2>
        <p>merhaba@mahallepazari.com</p>
      </Slide>
    </Presentation>
    {/* Reads $slide, so this text updates whenever the deck moves. */}
    <p sx={{ color: "muted", text: "sm" }}>Ok tuşları, boşluk ya da kaydırma ile ilerle · şu an {$slide + 1}. slayt</p>
  </div>
}
