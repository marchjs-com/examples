import { CandlestickChart } from "march/charts"
import { Button } from "march/ui"

// Mood candles: a playful, minimal CandlestickChart that is not about money at all.
// Each day is one candle on a 0–10 mood scale: the morning mood is the open, the best and worst moments of the day are
// the high and low, the evening mood is the close, and the cups of coffee that day sit in a small pane underneath.
// "Yarın" (tomorrow) adds a new day, and the last two weeks slide into view. Use candles whenever something has a
// start, an end and a range within one period: mood, temperature, response times per hour.

// One day: it opens where the previous day closed, and a sine / cosine mix moves the close up or down (deterministic,
// so the chart looks the same every time). Values are clamped to the 0–10 scale. The keys are CandlestickChart's
// defaults (date, open, high, low, close), so the chart needs no key props; `kahve` (cups of coffee) is our own key,
// named by the volume prop below.
const day = (i: number, open: number) => {
  const close = Math.max(1, Math.min(10, open + Math.round((Math.sin(i * 1.7) + Math.cos(i * 0.6)) * 2)))
  return { date: Date.UTC(2026, 10, 1 + i), open, close, high: Math.min(10, Math.max(open, close) + 1 + (i % 2)), low: Math.max(0, Math.min(open, close) - 1 - (i % 3 ? 0 : 1)), kahve: 1 + ((i * 5) % 4) }
}

export function MoodCandles() {
  // Start with one day and grow to twenty before the first render (more than the 14-day window, so there is history
  // to scroll back to); `next` is also the button's click handler.
  let $days = [day(0, 6)]
  const next = () => { const last = $days[$days.length - 1]!; $days = [...$days, day($days.length, last.close)] }
  for (let i = 0; i < 19; i++) next()
  // CandlestickChart props:
  // - window={14}: only the latest 14 days are shown; each new day slides the view left.
  // - navigator: a small overview of every day under the chart; drag its window (or its edges) to look back.
  // - volume="kahve": the cups of coffee as bars in a lower pane (any count per period works: trades, visits, steps).
  // - format: the mood axis and tooltip read "7/10" instead of a bare number (a pipe name or [pipe, ...args] works too).
  // - marks: a reference line at 7, the "good day" level; marks also take bands ({ y: [a, b] }) and { y: "average" }.
  // - up / down: good days in green, bad days in purple (theme tokens) instead of the market's green / red.
  // - xFormat={["date", { weekday: "short" }]}: the date pipe with options, so the axis shows short weekday names.
  // - labels: the tooltip and table texts, renamed to the mood story (morning, evening, best and worst moment, coffee).
  // - animate={{ stagger: 40 }}: the default spring, with each candle starting 40 ms after the previous one, so the
  //   first draw ripples left to right. animate={false} switches motion off; reduced motion is honoured.
  // - zoom={false}: no drag-to-zoom; with two weeks on screen there is nothing to zoom into (the navigator looks back).
  // Accessibility: title names the SVG, a hidden table lists every day, and Tab + ← → walk the candles.
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button size="sm" on:click={next}>Yarın ☀️</Button>
    <CandlestickChart data={() => $days} window={14} navigator volume="kahve" up="brand-green" down="brand-purple"
      format={(v: number) => `${v}/10`} marks={[{ y: 7, label: "İyi gün 🙂", color: "brand-green" }]} xFormat={["date", { weekday: "short" }]}
      labels={{ open: "Sabah", close: "Akşam", high: "En iyi an", low: "En kötü an", volume: "Kahve ☕" }} animate={{ stagger: 40 }} zoom={false}
      title="Ruh hali" height={320} />
  </div>
}
