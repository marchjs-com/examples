import { RichTextEditor, UndoRedo, Card, Badge, Button, CodeView } from "march/ui"
import type { RichTextApi } from "march/ui"

// RichTextEditor'ün bütün özellikleri: değer (bind:value ve onChange), yer tutucu, kendi araç listesi, @ bahsetme
// (liste ya da async arama), kendi emoji kümesi, Markdown kısayolları, ortak geri alma geçmişi (history), yükseklik,
// sayaç ve ipucu, api (dışarıdan yaz), kendi ikonları ve metinleri, sınıf, salt okunur
const PEOPLE = [
  { id: "u1", label: "Ada Lovelace", hint: "Matematik" },
  { id: "u2", label: "Alan Turing", hint: "Bilgisayar" },
]
const EMOJI = [["🚀", "rocket", "roket hız"], ["🎉", "party", "kutlama"], ["✅", "done", "tamam bitti"]] as const

// async arama: ağdan gelir gibi biraz bekler
const lookup = async (q: string) => { await new Promise((r) => setTimeout(r, 50)); return PEOPLE.filter((p) => p.label.toLowerCase().includes(q.toLowerCase())) }

export function RichTextEditorLab() {
  let $md = "## Plan\n\n- **Ada** taslağı yazar\n- Alan gözden geçirir"
  let $changes = 0
  let $api = null as RichTextApi | null
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
      <Button on:click={() => $api?.insert(" 🚀 **Hazır!**")}>Sona ekle</Button>
      <Button on:click={() => $api?.setMarkdown("## Sıfırdan")}>Baştan yaz</Button>
      <Button on:click={() => $api?.exec("bold")}>Kalın yap</Button>
      <UndoRedo history={$api?.history} size="sm" />
      <Badge tone="neutral">{`${$changes} değişiklik`}</Badge>
    </div>
    <RichTextEditor bind:value={$md} onChange={() => $changes++} api={(a) => $api = a}
      placeholder="Planı yazın…" rows={5} class="lab-plan"
      toolbar={["h2", "bold", "italic", "link", "|", "ul", "ol", "|", "emoji", "undo", "redo"]}
      mentions={lookup} emoji={EMOJI} shortcuts
      toolIcons={{ bold: "K", italic: "İ" }}
      labels={{ editor: "Plan metni", toolbar: "Plan araçları", tools: { bold: "Kalın", italic: "Eğik", link: "Bağlantı" },
        hint: "@ ile kişi, : ile emoji", count: (w, c) => `${w} sözcük · ${c} harf` }} />
    <Card m:theme="night">
      <div sx={{ flex: "col", gap: 2 }}>
        <span sx={{ text: "xs", color: "muted" }}>Aynı geçmiş (history), kısayolsuz, sayaçsız, salt okunur ön izleme</span>
        {() => $api && <RichTextEditor value={$md} readonly rows={2} toolbar={false} counter={false} hint={false} shortcuts={false}
          emoji={false} history={$api.history} aria-label="Plan ön izlemesi" />}
      </div>
    </Card>
    <CodeView code={() => $md} lang="md" label="Markdown" toolbar={false} />
  </div>
}
