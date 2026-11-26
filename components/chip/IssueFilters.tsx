// IssueFilters: the real-life Chip example.
//
// What it shows: an issue tracker. Status filters are toggle chips (selected + onClick), the labels are removable chips
// (onRemove) with a small form to add a new one, and the list below is filtered by both at once.
// When to use this pattern: filter bars and tag inputs. Toggle chips are announced with aria-pressed; each remove
// button has its own accessible name (removeLabel) so screen readers say which tag goes away.
// Keyboard: chips that act are real buttons (Tab, Enter / Space); the add-label form submits with Enter.
import { Chip, Card, Button, Form, TextInput } from "march/ui"
import { tag } from "march/icons"

const issues = [
  { title: "Giriş sayfası yavaş", status: "Açık", tags: ["performans"] },
  { title: "Karanlık temada düşük kontrast", status: "Bekliyor", tags: ["tasarım"] },
  { title: "Ödeme sonrası e-posta gitmiyor", status: "Açık", tags: ["e-posta"] },
  { title: "Profil fotoğrafı kırpılıyor", status: "Çözüldü", tags: ["tasarım"] },
]

export function IssueFilters() {
  // The selected statuses (a Set, replaced with a new Set on every change so the view updates), the active labels
  // and the draft text of the "add label" input.
  let $statuses = new Set(["Açık", "Bekliyor"])
  let $labels = ["tasarım", "performans", "e-posta"]
  let $draft = ""
  const toggle = (s: string) => { const n = new Set($statuses); if (n.has(s)) n.delete(s); else n.add(s); $statuses = n }
  // Add the typed label once (lower-cased, no duplicates, no empty text), then clear the input.
  const add = () => { const t = $draft.trim().toLowerCase(); if (t && !$labels.includes(t)) $labels = [...$labels, t]; $draft = "" }
  // A derived list: an issue is shown when its status is selected and one of its tags is still active.
  const $shown = issues.filter((i) => $statuses.has(i.status) && i.tags.some((t) => $labels.includes(t)))
  return <Card title="Sorunlar">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Status filters: selected says whether the filter is on, onClick toggles it; tone="primary" colours them. */}
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {["Açık", "Bekliyor", "Çözüldü"].map((s) => <Chip tone="primary" selected={$statuses.has(s)} onClick={() => toggle(s)}>{s}</Chip>)}
      </div>
      {/* Label chips: icon + size="sm"; onRemove adds the × button and removeLabel names it for screen readers. */}
      <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
        {$labels.map((t) => <Chip icon={tag} size="sm" removeLabel={`${t} etiketini kaldır`} onRemove={() => $labels = $labels.filter((x) => x !== t)}>{t}</Chip>)}
        {/* Form with actions={false}: no default buttons, our own "add" button submits it (so Enter works too). */}
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
