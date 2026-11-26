// ApiResponse: the real-life JsonView example.
//
// What it shows: inspecting an API response. Pick an endpoint and its response opens as a tree. The counts of closed branches
// use Turkish words ("items" and "keys" are replaced through `labels`).
// When to use this pattern: developer tools, admin panels, docs. JsonView is read-only and collapsible; keys, strings, numbers,
// booleans and null have their own theme colours, and a closed object or array shows how many keys or items it holds.
// Accessibility: nested lists, and every object / array is a disclosure button with aria-expanded.
import { JsonView, Card, Badge, Segmented } from "march/ui"

// Three fake responses keyed by endpoint; they show different shapes (an object with a list, nested objects, null).
const RESPONSES: Record<string, unknown> = {
  "/users/7": { id: 7, name: "Ada Yılmaz", email: "ada@ornek.com", roles: ["admin", "editor"], lastLogin: "2026-11-18T08:30:00Z", manager: null },
  "/orders?limit=2": { total: 128, page: 1, data: [{ id: 48210, sum: 1249.3, paid: true }, { id: 48211, sum: 89.9, paid: false }] },
  "/health": { ok: true, uptime: 86400, services: { db: "up", cache: "up", mail: "degraded" } },
}

export function ApiResponse() {
  // The selected endpoint.
  let $url = "/users/7"
  {/* Card with a status badge in its actions; the response sits inside. */}
  return <Card title="İstek" actions={<Badge tone="success">200 OK</Badge>}>
    {/* The endpoint switcher; its options are the keys of RESPONSES. */}
    <Segmented aria-label="Uç nokta" options={Object.keys(RESPONSES)} bind:value={$url} />
    {/* - label: the accessible name of the root list. open={1}: one level is expanded at the start.
        - value as a function: it reads $url, so the tree changes with the selection.
        - labels: our words for the counts of closed branches (items, keys). */}
    <JsonView label="Yanıt" open={1} value={() => RESPONSES[$url]} labels={{ items: "öğe", keys: "alan" }} />
  </Card>
}
