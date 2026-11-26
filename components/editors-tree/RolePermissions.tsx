// RolePermissions: the real-life TreeEditor example.
//
// What it shows: the permissions of a role. The schema wants a role name from a list, every permission to be true or
// false, and an upload limit between 1 and 500; one permission ("maybe") breaks the rule, so Save stays disabled until
// it is fixed. onValidate carries the problem count out to the button.
// When to use this pattern: configuration or settings forms where the data is a JSON document and a schema says what is valid.
import { TreeEditor, Button, Badge, toast } from "march/ui"

// required: keys that must exist; enum: the allowed words; additionalProperties: the rule for every key under
// `permissions` (a boolean); minimum / maximum: bounds for the integer.
const SCHEMA = {
  type: "object", required: ["role", "permissions"],
  properties: {
    role: { enum: ["admin", "editor", "viewer"] },
    permissions: { type: "object", additionalProperties: { type: "boolean" } },
    maxUploadMb: { type: "integer", minimum: 1, maximum: 500 },
  },
} as const

// $role is the value being edited (one permission is wrong on purpose); $problems is the count from onValidate.
export function RolePermissions() {
  let $role: unknown = { role: "editor", permissions: { publish: true, delete: "maybe", invite: false }, maxUploadMb: 50 }
  let $problems = 0
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* schema marks invalid rows with their message; onValidate(errors) is called with every validation result, and we keep
            how many there are. */}
    <TreeEditor bind:value={$role} schema={SCHEMA} label="Editör rolü" onValidate={(e) => $problems = e.length} />
    {/* The badge shows the count; Save is disabled while any problem is left. */}
    <div sx={{ flex: ["row", "center", "between"] }}>
      <Badge tone={$problems ? "danger" : "success"}>{$problems ? `${$problems} sorun` : "Hazır"}</Badge>
      <Button disabled={$problems > 0} on:click={() => toast("Rol kaydedildi")}>Kaydet</Button>
    </div>
  </div>
}
