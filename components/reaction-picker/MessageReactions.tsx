import { ReactionPicker } from "march/ui"

// mesaja tepki: aynı emojiye yeniden basınca kalkar; + düğmesi tam paneli açar
export function MessageReactions() {
  let $sel = ""
  let $panel = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <p>“Yarın 7'de sahilde!”</p>
    <ReactionPicker selected={$sel} onPick={(e: string) => $sel = $sel === e ? "" : e} onMore={() => $panel = !$panel} />
    {() => ($panel ? <ReactionPicker layout="grid" onPick={(e: string) => { $sel = e; $panel = false }} /> : null)}
  </div>
}
