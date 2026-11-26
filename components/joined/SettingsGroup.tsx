// SettingsGroup: the real-life Joined example.
//
// What it shows: a settings group. Rows (a bell with a switch, the dark theme with a switch, the language) sit one under the
// other with a thin line between them, inside a single frame.
// When to use this pattern: a list of rows that belong together. Joined removes each row's own frame and draws one for the
// whole group (vertical is the default direction). `radius` picks the corner size from the theme's scale.
// Accessibility: the parts keep their own roles; each Toggle has a label for its accessible name.
import { Joined, ListRow, Toggle } from "march/ui"
import { bell, moon, globe } from "march/icons"

export function SettingsGroup() {
  // One boolean per switch.
  let $notify = true
  let $dark = false
  // radius={3}: the corner size of the whole group (0 to 4, or "full").
  return <Joined radius={3}>
    {/* ListRow: an icon, a title and a trailing control (here a Toggle). The Toggle's label gives it an accessible name. */}
    <ListRow icon={bell} title="Bildirimler" trail={<Toggle label="Bildirimler" bind:value={$notify} />} />
    <ListRow icon={moon} title="Koyu tema" trail={<Toggle label="Koyu tema" bind:value={$dark} />} />
    {/* A row without a control: icon, title and subtitle only. */}
    <ListRow icon={globe} title="Dil" subtitle="Türkçe" />
  </Joined>
}
