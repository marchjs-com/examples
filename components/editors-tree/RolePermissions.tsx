import { TreeEditor, Button, Badge, toast } from "march/ui"

// rol yetkileri: şema rolün adını ve her yetkinin true / false olmasını ister; onValidate sorun sayısını Kaydet'e taşır
const SCHEMA = {
  type: "object", required: ["role", "permissions"],
  properties: {
    role: { enum: ["admin", "editor", "viewer"] },
    permissions: { type: "object", additionalProperties: { type: "boolean" } },
    maxUploadMb: { type: "integer", minimum: 1, maximum: 500 },
  },
} as const

export function RolePermissions() {
  let $role: unknown = { role: "editor", permissions: { publish: true, delete: "maybe", invite: false }, maxUploadMb: 50 }
  let $problems = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    <TreeEditor bind:value={$role} schema={SCHEMA} label="Editör rolü" onValidate={(e) => $problems = e.length} />
    <div sx={{ flex: ["row", "center", "between"] }}>
      <Badge tone={$problems ? "danger" : "success"}>{$problems ? `${$problems} sorun` : "Hazır"}</Badge>
      <Button disabled={$problems > 0} on:click={() => toast("Rol kaydedildi")}>Kaydet</Button>
    </div>
  </div>
}
