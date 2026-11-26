// PublishPost: the real-life MultiSelect example.
//
// The last step before publishing a blog post, with two different MultiSelects: topic tags (a fixed list that also
// accepts new tags) and co-authors (searched on a server). Use this pattern when one form needs both a closed list and
// a remote search, and the submit button depends on the selection.
import { MultiSelect, Field, Button, Card, toast } from "march/ui"
import { send } from "march/icons"

// A static list given as plain strings: each string is both the value and the label.
const topics = ["JavaScript", "TypeScript", "CSS", "Erişilebilirlik", "Performans", "Tasarım", "Sinyaller"]
const people = [
  { value: "ayse", label: "Ayşe Yılmaz", hint: "Editör" }, { value: "mehmet", label: "Mehmet Demir", hint: "Yazar" },
  { value: "zeynep", label: "Zeynep Kaya", hint: "Tasarımcı" }, { value: "can", label: "Can Öztürk", hint: "Yazar" },
]
// In a real app this is an API call: it answers after 300 ms with the matching people. A search function may return
// a Promise; MultiSelect shows its "searching" text while the Promise is pending and ignores late answers.
const searchPeople = (q: string) => new Promise<typeof people>((done) =>
  setTimeout(() => done(people.filter((p) => p.label.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))), 300))

export function PublishPost() {
  let $tags = ["TypeScript", "Sinyaller"]
  let $authors: string[] = []
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: ["lg", "bold"] }}>Yayınlamadan önce</span>
      {/* allowCustom: a tag that is not in the list can be typed and added with Enter (the Field's help text tells
          the user so). Field also draws the label and the "required" mark. */}
      <Field label="Etiketler" required help="Listede yoksa yaz ve Enter'a bas">
        <MultiSelect bind:value={$tags} options={topics} allowCustom placeholder="Etiket ekle" />
      </Field>
      {/* `search` instead of `options`: the list comes from the async function above. `labels` replaces the
          built-in texts for the empty result and the pending state; the other texts keep their translated defaults. */}
      <Field label="Ortak yazarlar">
        <MultiSelect bind:value={$authors} search={searchPeople} placeholder="İsimle ara" labels={{ noResults: "Kimse bulunamadı", searching: "Aranıyor…" }} />
      </Field>
      <div sx={{ flex: ["row", "between", "center"] }}>
        <span sx={{ text: "sm", color: "muted" }}>{$tags.length} etiket · {$authors.length} ortak yazar</span>
        {/* `disabled` is an expression of the state: with no tag left the button turns itself off. The toast is the
            feedback after a click; like all component motion it follows the motion engine (reduced motion, global
            speed, "Stop all"). */}
        <Button variant="primary" icon={send} disabled={$tags.length === 0} on:click={() => toast("Yazı yayınlandı")}>Yayınla</Button>
      </div>
    </div>
  </Card>
}
