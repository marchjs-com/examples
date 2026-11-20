import { Faq } from "march/landing"
import { Button, Card, Segmented, Toggle } from "march/ui"

// Faq'ın bütün özellikleri bir arada: sorular (q, a, keywords), düzen (layout), başlık (title), açıklama (lead),
// iletişim satırı (contact), arama (search), birden çok açık (multiple), kendi metinler (labels), eşleşme satırı
// (count), başlık girişi (reveal) ve sınıf (class)
const ITEMS = [
  { q: "Ücretsiz mi?", a: "Evet; Premium isteğe bağlı.", keywords: "fiyat para" },
  { q: "Telefonda çalışır mı?", a: "Telefonda da tarayıcıda da.", keywords: "mobil uygulama" },
  { q: "Etkinliğimi nasıl kurarım?", a: "Ne, nerede, ne zaman: birkaç adım." },
  { q: "İptal olursa ne olur?", a: "Katılanlara hemen bildirim gider.", keywords: "iade bilet" },
  { q: "Güvende miyim?", a: "Doğrulama, şikâyet ve engelleme her ekranda." },
]

export function FaqLab() {
  let $layout: "center" | "split" = "split"
  let $search = true
  let $multiple = false
  let $count = true
  let $asked = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Düzen" options={[{ value: "center", label: "ortada" }, { value: "split", label: "iki sütun" }]} bind:value={$layout} />
        <Toggle label="Arama" bind:value={$search} />
        <Toggle label="Birden çok açık" bind:value={$multiple} />
        <Toggle label="Eşleşme satırı" bind:value={$count} />
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince sorular yeniden çizilir; başlık ve açıklama işlev, kendileri güncellenir
      const layout = $layout, search = $search, multiple = $multiple, count = $count
      return <Faq class="lab-faq" layout={layout} search={search} multiple={multiple} count={count} reveal="none"
        title={() => `Sık sorulanlar (${ITEMS.length})`} lead={() => `${$asked} kişi bize yazdı`}
        contact={<Button variant="secondary" on:click={() => $asked++}>Bize yaz</Button>}
        labels={{ search: "Soru ara", empty: "Hiçbir soru tutmadı.", count: (shown: number, total: number) => `${total} sorudan ${shown} tanesi` }}
        items={ITEMS} />
    }}
  </div>
}
