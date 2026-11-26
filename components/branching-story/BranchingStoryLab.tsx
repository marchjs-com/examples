// BranchingStoryLab: the full-featured BranchingStory example; it uses every prop at least once.
//
// Props shown here: passages, start, path (driven from outside) with onChange, trail, endings, action, minHeight,
// label, labels (every text the story writes), restart, keys, renderChoice (your own choice content), transition (a
// ready one or your own motion) and class. The controls above the story change the live ones.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// BranchingStoryLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { BranchingStory, type StoryChoice } from "march/landing"
import { Segmented, Toggle, Button, Card } from "march/ui"

// The story as data: an object of passages keyed by id. A passage has a title, a body, optional `media` (any node)
// and a `color` token, and either `choices` ({ label, to, note? }, where `to` is the id of the next passage) or an
// `ending` (a passage without choices is an ending; the text is the ending's name).
const PASSAGES = {
  orman: { title: "Ormanın girişi", color: "brand-green" as const, media: <span sx={{ text: "2xl" }}>🌲</span>, body: "İki patika var.", choices: [
    { label: "Dere boyu", note: "serin", to: "dere" }, { label: "Tepeye", note: "dik", to: "tepe" }] },
  dere: { title: "Derenin kıyısı", body: "Bir sal bağlı duruyor.", choices: [{ label: "Sala bin", to: "sal" }, { label: "Yürümeye devam", to: "tepe" }] },
  tepe: { title: "Tepede", ending: "Manzara", body: "Bütün vadi ayaklarının altında." },
  sal: { title: "Sal yolculuğu", ending: "Kaptan", body: "Dere seni göle taşıdı." },
}
// Your own page transition: a function of the direction (1 forward, -1 back) that returns keyframes for the leaving
// passage (it fades) and the entering one (it fades in while sliding from the side), plus a duration in ms. The motion
// engine plays it, so reduced motion and the global speed / "Stop all" settings still apply.
const OWN = (side: 1 | -1) => ({ leave: { opacity: [1, 0] }, enter: { opacity: [0, 1], transform: [`translateX(${40 * side}px)`, "translateX(0px)"] }, duration: 400 })

export function BranchingStoryLab() {
  // The path of passage ids (reactive: the Lab owns it and passes it in), and the switches of the controls.
  let $path = ["orman"]
  let $move: "yok" | "kendi" = "yok"
  let $trail = true
  let $keys = true
  let $own = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Geçiş" options={["yok", "kendi"]} bind:value={$move} />
        <Toggle label="İz" bind:value={$trail} />
        <Toggle label="Rakam tuşları" bind:value={$keys} />
        <Toggle label="Kendi seçeneklerim" bind:value={$own} />
        <Button variant="secondary" on:click={() => $path = ["orman"]}>Başa sar</Button>
      </div>
    </Card>
    {/* The function child builds a fresh story whenever one of the switches above changes (the Lab reads them into
        local constants first, so they take effect).
        - passages, start: the data and the first passage id.
        - path (a function) + onChange: the Lab drives the story's path from outside; every choice or rewind reports
          the new path through onChange. Setting $path (the rewind button) moves the story.
        - trail: the breadcrumb of the reader's choices; any earlier step rewinds the story to it.
        - endings: the "endings found" counter; its text comes from labels.endings.
        - action: extra content next to the restart button at an ending (here a link-styled Button).
        - minHeight: the stage keeps at least this height, so the page does not jump between passages.
        - label: the accessible name of the story (a labelled section).
        - labels: every text the story writes, so you can translate or reword it (path, start, endings as a function of
          found and total, missing, end, endingPrefix, restart).
        - restart: the "start again" button at an ending (restart={false} removes it).
        - keys: number keys 1-9 pick a choice, and each choice shows its number.
        - transition: "turn" (the default), "slide", "fade", "none", or a function like OWN above. With reduced motion
          passages swap without the transition.
        - renderChoice: draws the content of a choice button yourself (undefined keeps the default). */}
    {() => { const move = $move, trail = $trail, keys = $keys, own = $own; return <BranchingStory class="lab-bs"
      passages={PASSAGES} start="orman" path={() => $path} onChange={(p: string[]) => $path = p}
      trail={trail} endings action={<Button variant="link" href="#rota">Rotayı indir</Button>} minHeight="12rem" label="Orman macerası"
      labels={{ path: "Yolun", start: "Giriş", endings: (n: number, total: number) => `${n}/${total} son`, missing: "Bu yol kayıp.", end: "Bitti", endingPrefix: "Son: ", restart: "Yeniden" }}
      restart keys={keys} transition={move === "yok" ? "none" : OWN}
      renderChoice={own ? (c: StoryChoice, i: number) => <span class="lab-choice">{`${i + 1}. `}<b>{c.label}</b></span> : undefined} /> }}
    <p sx={{ color: "muted" }} class="lab-path">Yol: {$path.join(" → ")}</p>
  </div>
}
