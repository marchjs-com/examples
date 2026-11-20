import { EditorFrame, Badge } from "march/ui"

// haiku defteri: çerçevenin alt çubuğu satırları sayar; üç satır olunca çerçeve yeşile döner
export function HaikuPad() {
  let $text = "Sessiz göl kıyı\nbir kurbağa atlıyor"
  const $lines = $text.split("\n").filter((l) => l.trim()).length
  return <EditorFrame m:color={$lines === 3 ? "success" : "brand-purple"}
    head={<span sx={{ text: "bold" }}>Haiku</span>}
    actions={<Badge tone={$lines === 3 ? "success" : "neutral"}>{`${$lines} / 3 satır`}</Badge>}
    foot={<span>{$lines === 3 ? "Tamam, şiir hazır" : "Üç kısa satır yazın"}</span>}>
    <textarea class="m-editor-area" rows={3} aria-label="Haiku" value={$text}
      on:input={(e: Event) => $text = (e.target as HTMLTextAreaElement).value} />
  </EditorFrame>
}
