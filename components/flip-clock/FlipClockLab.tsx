import { FlipClock, Button } from "march/ui"

// FlipClockLab: the full-featured FlipClock example: every prop in one place.
// FlipClock shows hours, minutes and seconds on split number cards (Odometer's flip look, rolling through CountRoll on
// the motion engine), separators that blink once a second, and a small split-flap (SplitFlap) with AM / PM on a
// 12-hour clock. The time is the system clock, a time zone's, or your own source. Use it wherever the time itself is
// the show.
//
// Props shown below: time, timeZone, hour12, seconds, separator, blink, size, color, duration, label, parts, motion,
// onTick, class.
export function FlipClockLab() {
  // A fixed time we can step through (a Date's timestamp), and how many beats onTick has seen.
  let $at = new Date(2026, 10, 26, 9, 41, 30).getTime()
  let $ticks = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. Your own time source.
        - time: a timestamp (a Date or a live accessor work too). The "+1 dakika" button moves it, the cards flip.
        - hour12: a 12-hour clock with the AM / PM flap. duration: the flip time of one card in ms (replaces the
          default 420). color: a theme token for the digits. class: a hook for the test (lab-own). */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <FlipClock class="lab-own" time={$at} hour12 duration={300} color="info" label="Saat" />
      <Button class="lab-plus" size="sm" on:click={() => { $at += 60_000 }}>+1 dakika</Button>
    </div>
    {/* 2. A city's clock.
        - timeZone: an IANA name; the system clock is shown in that zone.
        - separator=".": a dot instead of ":"; blink={false}: it does not blink.
        - seconds={false}: hours and minutes only. size={30}: the card height in px.
        - parts: frame={false} drops the housing; separators / period could be switched off the same way.
        - onTick(date): called once a second with the time shown (only while the clock is on screen). */}
    <FlipClock class="lab-tokyo" timeZone="Asia/Tokyo" hour12={false} separator="." blink={false} seconds={false} size={30}
      parts={{ frame: false }} label="Tokyo" onTick={() => { $ticks++ }} />
    <span sx={{ text: "sm", color: "muted" }}>onTick: <span class="lab-ticks">{$ticks}</span></span>
    {/* 3. motion={false}: the cards change without flipping and nothing blinks, as with the OS reduced-motion
        setting. size="sm": 24 px cards. */}
    <FlipClock class="lab-still" time={$at} hour12={false} size="sm" motion={false} label="Hareketsiz saat" />
  </div>
}
