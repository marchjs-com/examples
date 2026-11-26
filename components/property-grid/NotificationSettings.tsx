// NotificationSettings: the real-life PropertyGrid example.
//
// What it shows: a notification settings page: groups, a search field, changed-row marks and a Save button that
// sends the values to a server (a toast stands in here). A row is hidden while it does not apply, and the end of
// the quiet hours is validated against their start.
// When to use this pattern: a settings page with many options; every change is an undo step and unsaved changes
// are registered, so leaving the page can warn about them.
//
// Accessibility: errors are linked to their field with aria-describedby and announced; groups are native <details>.

import { PropertyGrid, toast } from "march/ui"

// Rows: `type` picks the control; `group` the collapsible section; `unit` is shown after the value.
// - hidden(values): the row disappears while it returns true (the digest row is hidden when e-mail is off).
// - validate(value, values): return an error text, or null when the value is fine (the end of the quiet hours must
//   come after the start).
const ROWS = [
  { key: "email", label: "E-posta bildirimleri", type: "switch" as const, group: "E-posta" },
  { key: "digest", label: "Özet sıklığı", type: "select" as const, options: [{ value: "daily", label: "Günlük" }, { value: "weekly", label: "Haftalık" }, { value: "never", label: "Hiç" }], group: "E-posta", hidden: (v: Record<string, unknown>) => !v.email },
  { key: "push", label: "Anlık bildirimler", type: "switch" as const, group: "Mobil" },
  { key: "quietFrom", label: "Sessiz saat başlangıcı", type: "int" as const, min: 0, max: 23, unit: "sa", group: "Mobil" },
  { key: "quietTo", label: "Sessiz saat bitişi", type: "int" as const, min: 0, max: 23, unit: "sa", group: "Mobil",
    validate: (to: unknown, v: Record<string, unknown>) => (Number(to) <= Number(v.quietFrom) ? "Bitiş başlangıçtan sonra olmalı" : null) },
]

export function NotificationSettings() {
  // The edited object; bind:value below keeps it in step with the grid.
  let $prefs: Record<string, unknown> = { email: true, digest: "weekly", push: true, quietFrom: 22, quietTo: 7 }
  // - onSave(values): shows the Save button; it is called with the current values (a real app would send them).
  // - label: the accessible name of the grid and the name of its undo steps.
  return <PropertyGrid properties={ROWS} bind:value={$prefs} label="Bildirim ayarları"
    onSave={(v) => toast(`Kaydedildi: özet ${String(v.digest)}`, { kind: "success" })} />
}
