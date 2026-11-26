// ProductFeatures: the real-life ListEditor example.
//
// What it shows: a section of a product edit page: the highlighted features of a product (at most 6), in the order the
// shop page will show them. The Save button is disabled while the list is empty, the Field shows an error for that
// case, and saving tells the seller how many features were stored.
// When to use this pattern: an ordered list of short texts inside a form. ListEditor sits in a Field, which gives it its
// label, help text and error message; the editor itself only handles the rows.
//
// Keyboard: type and press Enter to add; each row has move up / move down / remove buttons, and pasting several lines
// adds one item per line. Animation: only the Save button's loading indicator, which follows the motion engine.
import { ListEditor, Field, Button, Card, toast } from "march/ui"
import { check } from "march/icons"

export function ProductFeatures() {
  // The features, a signal bound to the editor. $saving drives the Button's loading state.
  let $features = ["Su geçirmez kumaş", "Dizüstü bölmesi (15 inç)", "Geri dönüştürülmüş fermuar"]
  let $saving = false
  // A derived signal: an empty list is not valid.
  const $empty = $features.length === 0
  // Stands in for a real request: waits 0.9 s, then clears the loading state and shows a toast. Replace the timeout
  // with your API call.
  const save = () => {
    $saving = true
    setTimeout(() => { $saving = false; toast(`${$features.length} özellik kaydedildi`) }, 900)
  }
  return <Card title="Gezgin Sırt Çantası" subtitle="Ürün özellikleri"
    footer={<Button variant="primary" icon={check} loading={$saving} disabled={$empty} on:click={save}>Kaydet</Button>}>
    {/* Field `group` is for controls that are not a single input: it labels the whole editor. `required` marks it,
        `error` shows the message only when the list is empty, and `help` explains the order and pasting. */}
    <Field label="Öne çıkan özellikler" group required error={$empty ? "En az bir özellik ekleyin." : null}
      help="Sıra, ürün sayfasındaki sıradır. Birden çok satır yapıştırabilirsiniz.">
      {/* max={6}: at most six features. placeholder and addLabel: the add line's hint and button text. labels: the
          accessible names of the rows and their buttons, in the page's language. */}
      <ListEditor bind:value={$features} max={6} placeholder="Özellik ekle" addLabel="Ekle"
        labels={{ item: (n: number) => `${n}. özellik`, moveUp: "Yukarı al", moveDown: "Aşağı al", remove: "Özelliği sil" }} />
    </Field>
  </Card>
}
