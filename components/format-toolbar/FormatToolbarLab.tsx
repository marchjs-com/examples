// FormatToolbarLab: the full-featured FormatToolbar example; it uses every prop at least once.
//
// Props shown here: tools (with a separator), onTool, label (live), labels, name, icons (false: no icon), disabled (per
// tool or the whole bar), pressed, keys, hints, size, prefix, attrs and class.
// Use it as a reference when you need one option: find the prop below and copy the line.
// FormatToolbarLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { FormatToolbar, Card, Badge, Button } from "march/ui"
import { bold as boldIcon } from "march/icons"
import type { FormatTool } from "march/ui"

// State: two toggle flags, the last tool, a press counter and a size switch.
export function FormatToolbarLab() {
  let $bold = false
  let $italic = true
  let $last = "yok"
  let $count = 0
  let $big = true
  // onTool handler: toggles the flags of the two toggle tools and records which tool was pressed.
  const run = (tool: FormatTool) => {
    if (tool === "bold") $bold = !$bold
    if (tool === "italic") $italic = !$italic
    $last = tool
    $count++
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The main bar.
        - tools: the order, with "|" separators. onTool: called with the tool name.
        - label as a function: the bar's accessible name stays live (it shows the press count). labels as a function: own names
          for single tools, live too. name(tool): own names per tool; it wins over labels (returning undefined keeps the default).
        - icons: own marks per tool: an icon, a text ("S") or false for no icon.
        - pressed: functions that say whether a toggle tool is on (aria-pressed and the pressed look).
        - disabled as a function: disables single tools (here redo). Passing true would disable the whole bar (second bar below).
        - keys: aria-keyshortcuts per tool; false removes one. hints: also shows the shortcut in the tooltip.
        - size as a function: "md" or "sm". prefix: extra class names for a host (<prefix>-toolbar, -tool ...). class on the root.
        - attrs(tool): extra attributes for a tool's button (here a popup hint and a class on the link tool). */}
    <FormatToolbar tools={["bold", "italic", "strike", "|", "link", "code", "|", "undo", "redo"]} onTool={run}
      label={() => `Biçim (${$count})`} labels={() => ({ bold: $bold ? "Kalın: açık" : "Kalın: kapalı", italic: "Eğik" })}
      name={(tool) => (tool === "link" ? "Bağlantı ekle" : undefined)}
      icons={{ bold: boldIcon, strike: "S", code: false }} pressed={{ bold: () => $bold, italic: () => $italic }}
      disabled={(tool) => tool === "redo"} keys={{ link: "Control+L", code: false }} hints={() => $big}
      size={() => ($big ? "md" : "sm")} prefix="lab" class="lab-bar"
      attrs={(tool) => (tool === "link" ? { "aria-haspopup": "dialog", class: "lab-link" } : {})} />
    {/* Shows the last tool and a button that switches the bar between the big and the small size. */}
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Badge tone="neutral">{`Son araç: ${$last}`}</Badge>
      <Button size="sm" variant="secondary" on:click={() => $big = !$big}>{$big ? "Küçült" : "Büyüt (ipucunda kısayol)"}</Button>
    </div>
    {/* The second bar is completely disabled (disabled = true) on a dark card: all its buttons get the disabled attribute. */}
    <Card m:theme="night">
      <FormatToolbar tools={["h2", "h3", "|", "ul", "ol", "task", "quote"]} onTool={run} disabled label="Kapalı çubuk" />
    </Card>
  </div>
}
