import { ListEditor, Field, Button, Card, toast } from "march/ui"
import { check } from "march/icons"

// ürün düzenleme sayfasının bir bölümü: ürünün öne çıkan özellikleri (en fazla 6), sırası vitrindeki sıra;
// kaydedince satıcıya kaç özellik kaydedildiği söylenir, boş liste kaydedilemez
export function ProductFeatures() {
  let $features = ["Su geçirmez kumaş", "Dizüstü bölmesi (15 inç)", "Geri dönüştürülmüş fermuar"]
  let $saving = false
  const $empty = $features.length === 0
  const save = () => {
    $saving = true
    setTimeout(() => { $saving = false; toast(`${$features.length} özellik kaydedildi`) }, 900)
  }
  return <Card title="Gezgin Sırt Çantası" subtitle="Ürün özellikleri"
    footer={<Button variant="primary" icon={check} loading={$saving} disabled={$empty} on:click={save}>Kaydet</Button>}>
    <Field label="Öne çıkan özellikler" group required error={$empty ? "En az bir özellik ekleyin." : null}
      help="Sıra, ürün sayfasındaki sıradır. Birden çok satır yapıştırabilirsiniz.">
      <ListEditor bind:value={$features} max={6} placeholder="Özellik ekle" addLabel="Ekle"
        labels={{ item: (n: number) => `${n}. özellik`, moveUp: "Yukarı al", moveDown: "Aşağı al", remove: "Özelliği sil" }} />
    </Field>
  </Card>
}
