// FeatureFlags: the real-life JsonEditor example.
//
// What it shows: feature-flag settings. A JSON Schema requires every flag to be true or false and the rollout to be an integer
// from 0 to 100. The editor lists the first problem with its path, and Save stays disabled while there is any problem.
// When to use this pattern: configuration the user edits by hand. `schema` (a JSON Schema subset) checks both views; the
// text view shows live parse errors with line and column.
// Here the starting data has a mistake on purpose (a flag is the text "yes"), so you can see the validation.
import { JsonEditor, Button, toast } from "march/ui"

// The schema: an object that must have `flags`, each flag a boolean, and an optional rollout percentage (integer 0..100).
const SCHEMA = {
  type: "object", required: ["flags"],
  properties: { flags: { type: "object", additionalProperties: { type: "boolean" } }, rollout: { type: "integer", minimum: 0, maximum: 100 } },
} as const
type Config = { flags?: Record<string, unknown>; rollout?: number }
// While the text is not valid JSON the editor's value is the raw string, which cannot be saved either, so it counts as not ok.
// The same rules as the schema are checked here so the Save button can follow them.
const isOk = (c: unknown): boolean => {
  if (!c || typeof c !== "object") return false
  const { flags = {}, rollout = 0 } = c as Config
  return Object.values(flags).every((f) => typeof f === "boolean") && Number.isInteger(rollout) && rollout >= 0 && rollout <= 100
}

export function FeatureFlags() {
  // The edited config (unknown: it can be anything while typing).
  let $config: unknown = { flags: { darkMode: true, newSearch: false, betaExport: "yes" }, rollout: 25 }
  // Derived: whether the current value passes the checks; it drives the Save button.
  const $ok = isOk($config)
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* - bind:value: two-way link to $config. schema: the JSON Schema that checks both views.
        - mode="text" with modes={["text", "tree"]}: start with the source and offer both views. rows={9}: the text view's height.
        - aria-label: the accessible name. */}
    <JsonEditor bind:value={$config} schema={SCHEMA} mode="text" modes={["text", "tree"]} rows={9} aria-label="Ayarlar" />
    <div sx={{ flex: ["row", "end"] }}>
      {/* Save is disabled while there are problems, and its text says what to do. */}
      <Button disabled={!$ok} on:click={() => toast("Ayarlar kaydedildi")}>{$ok ? "Kaydet" : "Önce sorunları düzeltin"}</Button>
    </div>
  </div>
}
