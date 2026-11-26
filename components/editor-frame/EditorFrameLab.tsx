// EditorFrameLab: the full-featured EditorFrame example; it uses every prop at least once.
//
// Props shown here: head and actions (the head bar), showHead / showFoot (show or hide a bar), headProps / footProps
// (props of the bars), foot, disabled and readonly (getters), ring (the focus ring), class, the content (children) and
// other attributes (id, data-*), plus the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// EditorFrameLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { EditorFrame, FormatToolbar, Badge, Button, Card } from "march/ui"

// $text is the editor's text; $tools shows / hides the head bar; $mode is edit, readonly or disabled; $last is the last tool.
export function EditorFrameLab() {
  let $text = "Bir not"
  let $tools = true
  let $mode = "edit" as "edit" | "readonly" | "disabled"
  let $last = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" variant="secondary" on:click={() => $tools = !$tools}>{$tools ? "Araçları gizle" : "Araçları göster"}</Button>
      <Button size="sm" variant="secondary" on:click={() => $mode = $mode === "edit" ? "readonly" : $mode === "readonly" ? "disabled" : "edit"}>{`Durum: ${$mode}`}</Button>
    </div>
    {/* The EditorFrame is only the frame: a border, a focus ring, a head bar and a foot bar. The editing area is yours.
            - id / data-kind / class: other attributes go to the frame itself.
            - m:color (a common prop): colour token of the frame and everything inside it.
            - head: content of the head bar (here a FormatToolbar); actions: its end side (a letter count as a Badge).
            - showHead: a getter; false hides the head bar. headProps: props of the bar (sticky, a class, an aria-label).
            - foot: content of the foot bar; showFoot hides it; footProps: props of the bar (divider, class, aria-live).
            - readonly / disabled: getters that mark the frame (is-readonly marks it, is-disabled dims it). They only mark
              the frame, so the editing area must be readonly / disabled itself, as the textarea below is.
            Accessibility: the frame is a plain container; the role and the name belong to the editing area (the textarea has
            an aria-label). The ring shows while anything inside has focus. */}
    <EditorFrame id="lab-frame" data-kind="note" class="lab-frame" m:color="brand-orange"
      head={<FormatToolbar tools={["bold", "italic"]} onTool={(t) => $last = t} />}
      actions={() => <Badge tone="neutral">{`${$text.length} harf`}</Badge>}
      showHead={() => $tools} headProps={{ sticky: true, class: "lab-head", "aria-label": "Not araçları" }}
      foot={<span>{$last ? `Son araç: ${$last}` : "Bir araca basın"}</span>}
      showFoot={() => $mode !== "disabled"} footProps={{ divider: true, class: "lab-foot", "aria-live": "polite" }}
      readonly={() => $mode === "readonly"} disabled={() => $mode === "disabled"}>
      {/* m-editor-area: a ready class for a plain editing area inside the frame (no border of its own). */}
      <textarea class="m-editor-area" rows={3} aria-label="Not" value={$text} readonly={$mode === "readonly"} disabled={$mode === "disabled"}
        on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
    </EditorFrame>
    {/* A bare frame in a dark card (m:theme="night" draws this subtree in the dark theme): ring={false} leaves the
            focus mark to the area, showFoot={false} hides the foot bar even though `foot` is given. */}
    <Card m:theme="night">
      <EditorFrame ring={false} showFoot={false} foot="görünmez" class="lab-plain">
        <textarea class="m-editor-area" rows={2} aria-label="Halkasız not" />
      </EditorFrame>
    </Card>
  </div>
}
