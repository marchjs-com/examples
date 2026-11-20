import { TypingIndicator } from "march/ui"

// TypingIndicator'ın özellikleri: names, variant, text, label (kendi cümlen), dots (false ya da kendi öğen), motion, class
export function TypingIndicatorLab() {
  return <div sx={{ flex: "col", gap: 2 }}>
    <TypingIndicator class="lab-own" names={["Elif", "Can"]} variant="bubble" label={(n: readonly string[]) => `${n.join(" ve ")} karalıyor`} motion="none" />
    <TypingIndicator class="lab-nodots" names={["Deniz"]} variant="inline" dots={false} />
    <TypingIndicator class="lab-quiet" names={["Ada"]} text={false} />
  </div>
}
