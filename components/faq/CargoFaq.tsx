import { Faq } from "march/landing"
import { Button, toast } from "march/ui"
import { message } from "march/icons"

// bir kargo şirketinin yardım sayfası: solda başlık ve iletişim, sağda aranabilir sorular
export function CargoFaq() {
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
