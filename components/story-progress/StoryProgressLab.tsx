import { StoryProgress } from "march/ui"

// StoryProgress'in özellikleri: count, index, duration, paused, run, onDone, label, color, class
export function StoryProgressLab() {
  return <div sx={{ flex: "col", gap: 2 }}>
    <StoryProgress class="lab-sp" count={4} index={2} duration={3000} paused run="a" onDone={() => {}}
      label={(i: number, n: number) => `Hikâye ${i + 1} / ${n}`} color="brand-green" />
  </div>
}
