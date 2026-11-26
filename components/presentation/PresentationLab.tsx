// PresentationLab: the full-featured Presentation example; it uses every prop at least once.
//
// Props shown here: index / setIndex (as bind:index), transition (a ready name or your own function), presenter,
// sync, presenterUrl, label, controls, counter, progress, progressColor, fullscreen, timer, icons, labels, class;
// Slide: notes, layout, tone, background, class; Appear: as, effect, class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PresentationLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { Presentation, Slide, Appear } from "march/landing"
import { Segmented, Toggle, Card, Overlay } from "march/ui"
import { arrowLeft, arrowRight, monitor, maximize } from "march/icons"
import { animate } from "march/motion"

//  Options of the transition switch: three ready transition names (slide, fade, none) and 'own', which selects our
// function below.
const TRANSITIONS = [{ value: "slide", label: "kaydır" }, { value: "fade", label: "sol" }, { value: "own", label: "dönerek" }, { value: "none", label: "yok" }]

// A transition of our own: (incoming, outgoing, direction) => void. The deck hands over the two slide elements and
// the direction (1 forward, -1 back); we animate the incoming one with `animate` from march/motion, so reduced
// motion, global speed and "Stop all" still apply to it.
const turn = (incoming: HTMLElement, _out: HTMLElement | undefined, dir: 1 | -1): void => {
  animate(incoming, { opacity: [0, 1], transform: [`rotate(${6 * dir}deg) scale(.8)`, "rotate(0deg) scale(1)"] }, { duration: 400, easing: "expo" })
}

export function PresentationLab() {
  // The current slide, shared with the text in the Card above through bind:index.
  let $slide = 0
  // The chosen transition ("slide", "fade", "own" or "none").
  let $transition = "slide"
  // Whether the control row under the stage is shown.
  let $controls = true
  // Whether the speaker view (next slide, notes, timer) is shown in place.
  let $presenter = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        {/* The switches change the deck's props live. */}
        <Segmented aria-label="Geçiş" options={TRANSITIONS} bind:value={$transition} />
        <Toggle label="Denetimler" bind:value={$controls} />
        <Toggle label="Konuşmacı görünümü" bind:value={$presenter} />
      </div>
      <p sx={{ color: "muted" }}>Dışarıdaki sıra: {$slide + 1}</p>
    </Card>
    {/* The deck is built inside a function so the signals read below re-create it when a switch changes. */}
    {() => {
      // The signals are read here (the index is not: it flows live through bind:index).
      const tr = $transition, controls = $controls, presenter = $presenter
      // - bind:index: two-way current slide; sync: decks with the same name stay in step across windows or tabs.
      // - transition: "slide", "fade", "zoom", "none" or your own function (see `turn` above).
      // - presenter + presenterUrl: the speaker view in place, and the address the speaker button / P key opens.
      // - controls, counter (a function here), progress, progressColor: the control row, the counter text, the progress
      //   line and its colour; fullscreen: the full-screen button and the F key; timer={false} hides the speaker timer.
      // - icons: your own icons for the buttons; labels: every text the deck writes itself (here in Turkish).
      return <Presentation class="lab-deck" bind:index={$slide} label="Deneme sunumu" sync="lab-deck"
        transition={tr === "own" ? turn : tr as "slide"} presenter={presenter} presenterUrl="#konusmaci"
        controls={controls} counter={(i: number, n: number) => `${i + 1} / ${n}`} progress progressColor="brand-purple"
        fullscreen timer={false} icons={{ previous: arrowLeft, next: arrowRight, speaker: monitor, fullscreen: maximize }}
        labels={{ previous: "Önceki", next: "Sonraki", speaker: "Konuşmacı penceresi", fullscreen: "Tam ekran", pages: "Slaytlar",
          deck: "slayt destesi", speakerView: "Konuşmacı", upNext: "Sıradaki", end: "Son slayt", notes: "Notlar", noNotes: "Not yok", elapsed: "Geçen süre" }}>
        {/* Slides: layout (title, split, center...), tone (brand, inverse...), notes (speaker text), background (a node
            behind the slide), class. Appear: `effect` is how a step enters, `as` the element it renders (ul by
            default),
            and effect="none" makes a step appear without movement. */}
        <Slide layout="title" tone="brand" notes="Merhaba de" class="lab-first"><h2>Deneme sunumu</h2><p>Sağ ok ile ilerle</p></Slide>
        <Slide notes="Maddeler birer birer"><h2>Üç madde</h2>
          <Appear effect="fade" class="lab-steps"><li>Bir</li><li>İki</li></Appear>
        </Slide>
        <Slide layout="split"><div><h2>İki sütun</h2></div><Appear as="div" effect="none"><p>Hareketsiz adım</p></Appear></Slide>
        <Slide layout="center" tone="inverse" background={<Overlay effect="dots" opacity={0.4} />}><h2>Son</h2></Slide>
      </Presentation>
    }}
  </div>
}
