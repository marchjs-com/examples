import { BarList } from "march/charts"

// emoji anketi: bir satıra tıklamak o emojiye 250 oy ekler (bir sınıf dolusu), sıra hemen değişir
export function EmojiPoll() {
  let $votes = [{ label: "🔥", value: 1730 }, { label: "😂", value: 2410 }, { label: "🤔", value: 640 }, { label: "😍", value: 1980 }]
  return <BarList data={() => $votes} title="En sevilen emoji"
    onSelect={(r: { label: string; value: number; rank: number }) => { $votes = $votes.map((v) => (v.label === r.label ? { ...v, value: v.value + 250 } : v)) }} />
}
