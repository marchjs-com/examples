import { CandlestickChart } from "march/charts"
import { Button } from "march/ui"

// Mood candles: a playful, minimal CandlestickChart that is not about money at all.
// Each day is one candle on a 0–10 mood scale: the morning mood is the open, the best and worst moments of the day are
// the high and low, the evening mood is the close. "Yarın" (tomorrow) adds a new day, and the last two weeks slide
// into view. Use candles whenever something has a start, an end and a range within one period: mood, temperature,
// response times per hour.

// One day: it opens where the previous day closed, and a sine / cosine mix moves the close up or down (deterministic,
// so the chart looks the same every time). Values are clamped to the 0–10 scale. The keys are CandlestickChart's
// defaults (date, open, high, low, close), so the chart needs no key props.
const day = (i: number, open: number) => {
  const close = Math.max(1, Math.min(10, open + Math.round((Math.sin(i * 1.7) + Math.cos(i * 0.6)) * 2)))
  return { date: Date.UTC(2026, 10, 1 + i), open, close, high: Math.min(10, Math.max(open, close) + 1 + (i % 2)), low: Math.max(0, Math.min(open, close) - 1 - (i % 3 ? 0 : 1)) }
}

export function MoodCandles() {
  // Start with one day and grow to ten before the first render; `next` is also the button's click handler.
  let $days = [day(0, 6)]
  const next = () => { const last = $days[$days.length - 1]!; $days = [...$days, day($days.length, last.close)] }
  for (let i = 0; i < 9; i++) next()
  // CandlestickChart props:
  // - window={14}: only the latest 14 days are shown; once there are more, each new day slides the view left.
  // - up / down: good days in green, bad days in purple (theme tokens) instead of the market's green / red.
  // - xFormat={["date", { weekday: "short" }]}: the date pipe with options, so the axis shows short weekday names.
  // - labels: the tooltip and table texts, renamed to the mood story (morning, evening, best moment, worst moment).
  // - animate={{ stagger: 40 }}: the default spring, with each candle starting 40 ms after the previous one, so the
  //   first draw ripples left to right. animate={false} switches motion off; reduced motion is honoured.
  // - zoom={false}: no drag-to-zoom; with two weeks on screen there is nothing to zoom into.
  // Accessibility: title names the SVG, a hidden table lists every day, and Tab + ← → walk the candles.
  return <div sx={{ flex: "col", gap: 2 }}>
    <Button size="sm" on:click={next}>Yarın ☀️</Button>
    <CandlestickChart data={() => $days} window={14} up="brand-green" down="brand-purple" xFormat={["date", { weekday: "short" }]}
      labels={{ open: "Sabah", close: "Akşam", high: "En iyi an", low: "En kötü an" }} animate={{ stagger: 40 }} zoom={false} title="Ruh hali" height={220} />
  </div>
}
