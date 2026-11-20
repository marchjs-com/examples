import { Newsletter } from "march/landing"

// bir kitapçının bülteni: sunucu 600 ms sonra yanıt verir (bu sırada düğme dönen simgesini gösterir);
// zaten kayıtlı adres hata olarak okunur
const kayitli = new Set(["okur@ornek.com"])
const kaydet = (email: string) => new Promise((ok, no) => setTimeout(() => {
  if (kayitli.has(email)) no(new Error("Bu adres zaten bültende."))
  else { kayitli.add(email); ok(true) }
}, 600))

export function BookstoreBulletin() {
  return <Newsletter title="Haftanın kitapları" lead="Her cuma beş yeni kitap, bir de söyleşi daveti."
    placeholder="okur@ornek.com" button="Abone ol" note="Ayrılmak tek tık. Adresini kimseyle paylaşmayız."
    done="Teşekkürler! İlk bülten cuma sabahı gelecek." onSubmit={kaydet} />
}
