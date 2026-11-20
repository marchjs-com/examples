import { CtaBand } from "march/landing"
import { toast } from "march/ui"
import { arrowRight, phone } from "march/icons"

// bir spor salonunun sayfa sonu çağrısı: ilk ay ücretsiz deneme ve telefonla bilgi
export function GymTrial() {
  return <CtaBand variant="gradient" title="İlk ay bizden"
    lead="Ekipman, grup dersleri ve havuz dahil. Sözleşme yok, istediğin an bırak."
    actions={[
      { label: "Ücretsiz dene", iconEnd: arrowRight, onClick: () => toast("Deneme üyeliğin oluşturuldu") },
      { label: "Bizi ara", icon: phone, href: "tel:+902120000000", variant: "secondary" },
    ]}
    note="Kart bilgisi istemiyoruz · Kadıköy ve Beşiktaş şubeleri" />
}
