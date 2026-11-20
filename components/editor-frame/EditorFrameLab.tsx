import { EditorFrame, FormatToolbar, Badge, Button, Card } from "march/ui"

// EditorFrame'in bütün özellikleri: üst çubuk içeriği ve eylemleri, gösterilip gizlenmesi (showHead / showFoot),
// çubukların kendi özellikleri (headProps / footProps), alt çubuk, devre dışı ve salt okunur (erişimci), odak halkası,
// sınıf, içerik (children) ve öteki öznitelikler (id, data-*)
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
    <EditorFrame id="lab-frame" data-kind="note" class="lab-frame" m:color="brand-orange"
      head={<FormatToolbar tools={["bold", "italic"]} onTool={(t) => $last = t} />}
      actions={() => <Badge tone="neutral">{`${$text.length} harf`}</Badge>}
      showHead={() => $tools} headProps={{ sticky: true, class: "lab-head", "aria-label": "Not araçları" }}
      foot={<span>{$last ? `Son araç: ${$last}` : "Bir araca basın"}</span>}
      showFoot={() => $mode !== "disabled"} footProps={{ divider: true, class: "lab-foot", "aria-live": "polite" }}
      readonly={() => $mode === "readonly"} disabled={() => $mode === "disabled"}>
      <textarea class="m-editor-area" rows={3} aria-label="Not" value={$text} readonly={$mode === "readonly"} disabled={$mode === "disabled"}
        on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
    </EditorFrame>
    <Card m:theme="night">
      <EditorFrame ring={false} showFoot={false} foot="görünmez" class="lab-plain">
        <textarea class="m-editor-area" rows={2} aria-label="Halkasız not" />
      </EditorFrame>
    </Card>
  </div>
}
