import { JsonEditor, Button, toast } from "march/ui"

// özellik bayrakları ayarı: şema her bayrağın true / false olmasını ister; sorun varken Kaydet kapalı
const SCHEMA = {
  type: "object", required: ["flags"],
  properties: { flags: { type: "object", additionalProperties: { type: "boolean" } }, rollout: { type: "integer", minimum: 0, maximum: 100 } },
} as const
type Config = { flags?: Record<string, unknown>; rollout?: number }
// bozuk metin bir string olarak gelir: o da kaydedilemez
const isOk = (c: unknown): boolean => {
  if (!c || typeof c !== "object") return false
  const { flags = {}, rollout = 0 } = c as Config
  return Object.values(flags).every((f) => typeof f === "boolean") && Number.isInteger(rollout) && rollout >= 0 && rollout <= 100
}

export function FeatureFlags() {
  let $config: unknown = { flags: { darkMode: true, newSearch: false, betaExport: "yes" }, rollout: 25 }
  const $ok = isOk($config)
  return <div sx={{ flex: "col", gap: 2 }}>
    <JsonEditor bind:value={$config} schema={SCHEMA} mode="text" modes={["text", "tree"]} rows={9} aria-label="Ayarlar" />
    <div sx={{ flex: ["row", "end"] }}>
      <Button disabled={!$ok} on:click={() => toast("Ayarlar kaydedildi")}>{$ok ? "Kaydet" : "Önce sorunları düzeltin"}</Button>
    </div>
  </div>
}
