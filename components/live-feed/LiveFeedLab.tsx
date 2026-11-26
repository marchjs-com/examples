// LiveFeedLab: the full-featured LiveFeed example; it uses every prop at least once.
//
// Props shown here: items (a list you control) and next (a function the feed pulls from), every, first, max, variant
// (rows or wall), label, live (announcements), pausable with pauseLabel and resumeLabel, pulse, pauseOnHover, renderItem
// (your own item drawing), enter and leave (arrival and departure motion), glow, move and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LiveFeedLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Animation: arrival, departure, glow and move run on the motion engine, so the global speed, the global pause and
// reduced motion apply (reduced motion: items appear without sliding). Set enter="none" leave="none" glow={false}
// move={false} for no motion at all.
import { LiveFeed } from "march/landing"
import { Segmented, Toggle, Button, Card } from "march/ui"

// The shape of a feed item. LiveFeed's FeedItem is { id, title, body?, avatar?, meta?, color? }; ours uses the first five.
type Ev = { id: number; avatar: string; title: string; body: string; meta: string }

export function LiveFeedLab() {
  // Signals: the events (newest first), the next id, the view, and two switches.
  let $events: Ev[] = [{ id: 2, avatar: "B", title: "Burak koşuya katıldı", body: "Kadıköy", meta: "1 dk" }, { id: 1, avatar: "A", title: "Aslı kulüp kurdu", body: "Beşiktaş", meta: "3 dk" }]
  let $n = 3
  let $variant: "list" | "wall" = "list"
  let $auto = false
  let $own = false
  // Put a new event at the head of the list (a new array, so the signal notices).
  const add = () => { $events = [{ id: $n, avatar: "Y", title: `Yeni olay ${$n}`, body: "Çankaya", meta: "şimdi" }, ...$events]; $n++ }
  // A `next` source: each call returns one new item. The feed calls it by itself when the automatic switch is on.
  let k = 0
  const source = () => ({ id: 1000 + k, avatar: "O", title: `Otomatik olay ${++k}`, body: "Nilüfer", meta: "şimdi" })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls: the view, your own item drawing, the automatic source, and a button that adds an event. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={[{ value: "list", label: "satırlar" }, { value: "wall", label: "duvar" }]} bind:value={$variant} />
        <Toggle label="Kendi çizimim" bind:value={$own} />
        <Toggle label="Otomatik akış" bind:value={$auto} />
        <Button on:click={add}>Olay ekle</Button>
      </div>
    </Card>
    {/* The feed sits in a live region that reads the three switches, so it is built again when one changes. The
        props, one by one:
        - variant: "list" (rows) or "wall" (a grid of cards).
        - items: the list you control, newest first; a new head slides in. next: a function pulled every `every` ms
          while the feed is visible and not paused (undefined when the automatic switch is off). first: wait before the
          first pull. max: how many items stay on screen.
        - label: the accessible name. live="polite": announce new items (the default is off, so a busy feed does not
          talk over the page).
        - pausable: show the pause button; pauseLabel / resumeLabel: its two texts; pulse: the pulsing dot in it;
          pauseOnHover: pause while the pointer or focus is inside the feed.
        - renderItem: draw the content of an item yourself (when the switch is on); undefined keeps the default row.
        - enter="pop": new items arrive with an overshoot; leave="shrink": the oldest shrinks away; glow: an accent
          ring around a new item; move: the other items glide to their new places.
        - class: for tests and your CSS. */}
    {() => { const variant = $variant, auto = $auto, own = $own; return <LiveFeed class="lab-lf" variant={variant} items={() => $events} next={auto ? source : undefined}
      every={2000} first={500} max={5} label="Kulüp akışı" live="polite"
      pausable pauseLabel="Canlı · durdur" resumeLabel="Durdu · sürdür" pulse pauseOnHover
      renderItem={own ? (it: Ev) => <span class="lab-own"><b>{it.title}</b> · <small>{it.body}</small></span> : undefined}
      enter="pop" leave="shrink" glow move /> }}
  </div>
}
