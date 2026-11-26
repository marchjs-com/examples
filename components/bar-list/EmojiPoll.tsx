import { BarList } from "march/charts"

// An emoji poll: a playful, minimal BarList.
// Clicking a row adds 250 votes to that emoji (a whole school class voting at once), and the ranking changes on the
// spot: the bar grows and, when it overtakes another, its row glides up to its new place.
// Use a BarList like this for any ranked count where people care about "who is first": votes, top songs, countries.

export function EmojiPoll() {
  // The rows use BarList's default keys `label` and `value`, so no x / y props are needed.
  let $votes = [{ label: "🔥", value: 1730 }, { label: "😂", value: 2410 }, { label: "🤔", value: 640 }, { label: "😍", value: 1980 }]
  // BarList props:
  // - data={() => $votes}: a function reading the signal, so every vote redraws the list.
  // - No `sort` prop: rows are sorted largest first by default, which is what makes the ranking move.
  // - title: the accessible name of the list ("the most loved emoji").
  // - onSelect: makes each row a button and receives { label, value, rank, datum }; here it adds 250 votes to the
  //   clicked emoji by replacing the array (a new array is what tells March the data changed).
  // Motion: no `animate` prop, so the default spring applies: the bar widths morph to their new values, and rows whose
  // rank changed glide to their new place (FLIP). animate={false} jumps; reduced motion is honoured automatically.
  // Keyboard: every row is a real button, so Tab reaches it and Enter / Space votes.
  return <BarList data={() => $votes} title="En sevilen emoji"
    onSelect={(r: { label: string; value: number; rank: number }) => { $votes = $votes.map((v) => (v.label === r.label ? { ...v, value: v.value + 250 } : v)) }} />
}
