// AvatarMaker: the creative-minimal PropertyGrid example.
//
// What it shows: an emoji avatar maker. The avatar on the left is drawn from the same object the grid on the right
// edits (bind:value), so every control changes the picture live. When to use this pattern: an editor panel next to a
// live preview (a theme editor, a badge maker, an inspector).
//
// Here the grid is stripped down to the rows: search, footer, undo history and the "unsaved" registration are off.
// Accessibility: the grid is a named section, each row's name is a label of its editor and groups are native
// <details> elements (keyboard and screen readers work without extra code).

import { PropertyGrid, Card } from "march/ui"

// The rows. `type` picks the control (segmented, slider, switch, color; also text, textarea, number, int and select);
// `group` puts rows under a collapsible heading; options / min / max / unit configure the control.
const ROWS = [
  { key: "face", label: "Yüz", type: "segmented" as const, options: ["😀", "😎", "🤖", "🦊"], group: "Avatar" },
  { key: "size", label: "Boyut", type: "slider" as const, min: 32, max: 96, unit: "px", group: "Avatar" },
  { key: "round", label: "Yuvarlak", type: "switch" as const, group: "Çerçeve" },
  { key: "ring", label: "Halka rengi", type: "color" as const, group: "Çerçeve" },
]

export function AvatarMaker() {
  // The edited object. bind:value below keeps it in step with the grid in both directions.
  let $look: Record<string, unknown> = { face: "🦊", size: 64, round: true, ring: "#f2801f" }
  return <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
    {/* The preview: a plain element drawn from $look, so it updates by itself when a control changes. */}
    <Card>
      <div sx={{ flex: ["row", "center"] }} style={{
        width: `${Number($look.size) + 24}px`, height: `${Number($look.size) + 24}px`, fontSize: `${Number($look.size) * 0.6}px`,
        borderRadius: $look.round ? "50%" : "12px", border: `4px solid ${String($look.ring)}`,
      }}>{String($look.face)}</div>
    </Card>
    {/* - properties: the rows; bind:value: the edited object; label: the grid's accessible name.
        - search={false}, footer={false}, history={false}, dirty={false}: this editor has no search field, no Revert /
          Save
          bar, and records nothing in the app's undo history or the unsaved-changes registry. */}
    <PropertyGrid properties={ROWS} bind:value={$look} label="Avatar" search={false} footer={false} history={false} dirty={false} />
  </div>
}
