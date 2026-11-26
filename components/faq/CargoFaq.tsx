// CargoFaq: the real-life Faq example.
//
// What it shows: the help page of a cargo company. The heading and a live-support button sit in the left column, the
// searchable questions on the right; a search that finds nothing sends people to the support button.
// When to use this pattern: help centres and landing pages, where people look for one answer. `keywords` lets the search find
// an answer by words that are not in the question ("fiyat" finds the pricing question).
// Accessibility: the questions are Accordion buttons (aria-expanded, arrow keys); the match count is a polite live region.
import { Faq } from "march/landing"
import { Button, toast } from "march/ui"
import { message } from "march/icons"

export function CargoFaq() {
  // layout="split": the heading, lead and contact line at the start (sticky), the questions at the end.
  // search: adds the search box; labels: the placeholder (it also names the box), the message when nothing matches and the
  // count line, written from (shown, total). contact: any node, here a button that opens support.
  // items: { q, a, keywords? }; keywords are extra words only the search looks at.
  return <Faq layout="split" search title="Kargonla ilgili sorular" lead="Yanıtı bulamazsan 7/24 canlı destekteyiz."
    contact={<Button variant="secondary" icon={message} on:click={() => toast("Canlı destek açılıyor")}>Canlı destek</Button>}
    labels={{ search: "Ara: takip, iade, ücret…", empty: "Bunu bulamadık. Canlı desteğe yaz.", count: (shown: number, total: number) => `${total} sorudan ${shown} eşleşme` }}
    items={[
      { q: "Kargomu nasıl takip ederim?", a: "Takip numaranı ana sayfadaki kutuya yaz ya da SMS'teki bağlantıya dokun.", keywords: "takip numara nerede" },
      { q: "Gönderim ücreti nasıl hesaplanır?", a: "Desi ve mesafeye göre; 2 desiye kadar şehir içi 89 TL.", keywords: "fiyat ücret desi" },
      { q: "Adresimde yoksam ne olur?", a: "Kurye bir not bırakır; paketi 3 gün içinde en yakın şubeden alabilirsin.", keywords: "teslim şube" },
      { q: "İade nasıl gönderilir?", a: "Satıcının iade kodunu şubede söyle; gönderim ücretsiz.", keywords: "iade geri" },
      { q: "Hafta sonu dağıtım var mı?", a: "Cumartesi büyükşehirlerde var, pazar yok.", keywords: "cumartesi pazar" },
    ]} />
}
