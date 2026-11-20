import { JsonView, Card, Badge, Segmented } from "march/ui"

// bir API yanıtını incelemek: uç noktayı seç, yanıt ağaç olarak açılır; Türkçe sayım metinleri
const RESPONSES: Record<string, unknown> = {
  "/users/7": { id: 7, name: "Ada Yılmaz", email: "ada@ornek.com", roles: ["admin", "editor"], lastLogin: "2026-11-18T08:30:00Z", manager: null },
  "/orders?limit=2": { total: 128, page: 1, data: [{ id: 48210, sum: 1249.3, paid: true }, { id: 48211, sum: 89.9, paid: false }] },
  "/health": { ok: true, uptime: 86400, services: { db: "up", cache: "up", mail: "degraded" } },
}

export function ApiResponse() {
  let $url = "/users/7"
  return <Card title="İstek" actions={<Badge tone="success">200 OK</Badge>}>
    <Segmented aria-label="Uç nokta" options={Object.keys(RESPONSES)} bind:value={$url} />
    <JsonView label="Yanıt" open={1} value={() => RESPONSES[$url]} labels={{ items: "öğe", keys: "alan" }} />
  </Card>
}
