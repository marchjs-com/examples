// EmojiPoll: the creative-minimal BarList example.
//
// An emoji poll: clicking a row adds 250 votes to that emoji (a classroom's worth) and the ranking reorders at once.
// It shows the smallest interactive BarList: data with the default "label" and "value" keys, and onSelect that makes
// the rows buttons. Use the pattern for polls and leaderboards.
import { BarList } from "march/charts"

export function EmojiPoll() {
  // The rows use the default keys (label, value), so no x / y props are needed. The list is sorted largest first by
  // default, so a row jumps up when it passes another.
  let $votes = [{ label: "🔥", value: 1730 }, { label: "😂", value: 2410 }, { label: "🤔", value: 640 }, { label: "😍", value: 1980 }]
  // data is a function over $votes so the list redraws on change. onSelect makes each row a button (Tab, Enter and
  // Space work) and gives us the clicked row; we return a new list with that emoji's value raised, which is what makes
  // the list update. title names the list for screen readers.
  return <BarList data={() => $votes} title="En sevilen emoji"
    onSelect={(r: { label: string; value: number; rank: number }) => { $votes = $votes.map((v) => (v.label === r.label ? { ...v, value: v.value + 250 } : v)) }} />
}
