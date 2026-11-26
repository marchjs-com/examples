// StoryProgressLab: the full-featured StoryProgress example.
//
// What it shows: every StoryProgress option on one bar: count, index, duration, paused, run, onDone, label, color and
// class. It is held (paused) at the third of four segments, so the earlier two are full, the current one is frozen and
// the last is empty, which is easy to inspect and to test.
//
// Animation: when not paused, the current segment fills over `duration` on March's motion engine. It is an "essential"
// animation: it keeps time even under the visitor's reduced-motion preference, while "pause all" and the global speed
// still apply. `paused` holds it; changing `run` restarts it.
// Accessibility: the bars are a progressbar whose value is read as text (aria-valuetext); `label` writes that text.
// The moving fill itself is not announced.
import { StoryProgress } from "march/ui"

export function StoryProgressLab() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* count: four segments. index: the current one is the third (0-based 2). duration: 3000 ms to fill it. paused: a
        bare boolean attribute means true, so the fill is held. run: restarts the fill when its value changes (the id of
        the story is typical). onDone runs when the current segment is full; it does nothing here. label: our own screen
        reader text. color: a colour token for the fill. class: kept on the root (the tests find it). */}
    <StoryProgress class="lab-sp" count={4} index={2} duration={3000} paused run="a" onDone={() => {}}
      label={(i: number, n: number) => `Hikâye ${i + 1} / ${n}`} color="brand-green" />
  </div>
}
