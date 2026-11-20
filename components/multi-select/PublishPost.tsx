import { MultiSelect, Field, Button, Card, toast } from "march/ui"
import { send } from "march/icons"

// blog yazısını yayınlama adımı: konu etiketleri (yeni etiket yazılabilir) ve ortak yazarlar (sunucudan aranır)
const topics = ["JavaScript", "TypeScript", "CSS", "Erişilebilirlik", "Performans", "Tasarım", "Sinyaller"]
const people = [
  { value: "ayse", label: "Ayşe Yılmaz", hint: "Editör" }, { value: "mehmet", label: "Mehmet Demir", hint: "Yazar" },
  { value: "zeynep", label: "Zeynep Kaya", hint: "Tasarımcı" }, { value: "can", label: "Can Öztürk", hint: "Yazar" },
]
// gerçekte bir API çağrısı: 300 ms sonra eşleşen kişiler
const searchPeople = (q: string) => new Promise<typeof people>((done) =>
  setTimeout(() => done(people.filter((p) => p.label.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))), 300))

export function PublishPost() {
  let $tags = ["TypeScript", "Sinyaller"]
  let $authors: string[] = []
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: ["lg", "bold"] }}>Yayınlamadan önce</span>
      <Field label="Etiketler" required help="Listede yoksa yaz ve Enter'a bas">
        <MultiSelect bind:value={$tags} options={topics} allowCustom placeholder="Etiket ekle" />
      </Field>
      <Field label="Ortak yazarlar">
        <MultiSelect bind:value={$authors} search={searchPeople} placeholder="İsimle ara" labels={{ noResults: "Kimse bulunamadı", searching: "Aranıyor…" }} />
      </Field>
      <div sx={{ flex: ["row", "between", "center"] }}>
        <span sx={{ text: "sm", color: "muted" }}>{$tags.length} etiket · {$authors.length} ortak yazar</span>
        <Button variant="primary" icon={send} disabled={$tags.length === 0} on:click={() => toast("Yazı yayınlandı")}>Yayınla</Button>
      </div>
    </div>
  </Card>
}
