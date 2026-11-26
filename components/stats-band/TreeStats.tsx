// TreeStats: the real-life StatsBand example.
//
// What it shows: the figures of a tree-planting charity on a landing page: big numbers are shortened ("1.25M+"-style
// compact notation), they count up when the band scrolls into view, and some carry a small note.
// When to use this pattern: a row of proof points (users, uptime, satisfaction) near the top or bottom of a page.
// Each item is just data: { value, label, note?, format?, decimals?, prefix?, suffix? }.
//
// Animation: the numbers count up on March's motion engine and the items enter with a Reveal (the default is a rise
// with a stagger), so the global speed, "Stop all" and the visitor's reduced-motion preference apply. Use
// `mode="none"` for plain numbers and `reveal={false}` for no entrance.
// Accessibility: a description list: each label is a <dt> and the number a <dd>, read as its final value.
import { StatsBand } from "march/landing"

export function TreeStats() {
  // variant="divided" separates the figures with lines (the default; "plain" and "cards" are the other looks).
  // format: { notation: "compact" } passes Intl options, so a large number is written short; `suffix` adds "+".
  // decimals: 1 keeps 4.9 from being rounded. note: an extra line under the label.
  return <StatsBand variant="divided" items={[
    { value: 1250000, label: "fidan toprakla buluştu", format: { notation: "compact" }, suffix: "+" },
    { value: 81, label: "ilde gönüllü" },
    { value: 4.9, decimals: 1, label: "bağışçı memnuniyeti", note: "5 üzerinden" },
    { value: 92, label: "fidan yaşıyor", suffix: "%", note: "3 yıl sonra yapılan sayım" },
  ]} />
}
