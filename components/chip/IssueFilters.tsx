import { Chip, Card, Button, Form, TextInput } from "march/ui"
import { tag } from "march/icons"

// sorun takipçisi: üstte durum süzgeçleri (aç / kapa çipler), altta kaldırılabilir etiketler ve yeni etiket ekleme;
// liste ikisine birden göre süzülür
const issues = [
  { title: "Giriş sayfası yavaş", status: "Açık", tags: ["performans"] },
  { title: "Karanlık temada düşük kontrast", status: "Bekliyor", tags: ["tasarım"] },
  { title: "Ödeme sonrası e-posta gitmiyor", status: "Açık", tags: ["e-posta"] },
  { title: "Profil fotoğrafı kırpılıyor", status: "Çözüldü", tags: ["tasarım"] },
]

export function IssueFilters() {
  let $statuses = new Set(["Açık", "Bekliyor"])
  let $labels = ["tasarım", "performans", "e-posta"]
  let $draft = ""
  const toggle = (s: string) => { const n = new Set($statuses); if (n.has(s)) n.delete(s); else n.add(s); $statuses = n }
  const add = () => { const t = $draft.trim().toLowerCase(); if (t && !$labels.includes(t)) $labels = [...$labels, t]; $draft = "" }
  const $shown = issues.filter((i) => $statuses.has(i.status) && i.tags.some((t) => $labels.includes(t)))
  return <Card title="Sorunlar">
    <div sx={{ flex: "col", gap: 3 }}>
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {["Açık", "Bekliyor", "Çözüldü"].map((s) => <Chip tone="primary" selected={$statuses.has(s)} onClick={() => toggle(s)}>{s}</Chip>)}
      </div>
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        {$labels.map((t) => <Chip icon={tag} size="sm" removeLabel={`${t} etiketini kaldır`} onRemove={() => $labels = $labels.filter((x) => x !== t)}>{t}</Chip>)}
        <Form actions={false} onSubmit={() => add()}>
          <div sx={{ flex: ["row", "center"], gap: 1 }}>
            <TextInput bind:value={$draft} placeholder="Etiket ekle" aria-label="Yeni etiket" />
            <Button type="submit" size="sm" variant="secondary">Ekle</Button>
          </div>
        </Form>
      </div>
      <ul sx={{ flex: "col", gap: 1 }}>
        {$shown.length ? $shown.map((i) => <li>{`${i.title} · ${i.status}`}</li>) : <li sx={{ color: "muted" }}>Bu süzgeçlerle sorun yok</li>}
      </ul>
    </div>
  </Card>
}
