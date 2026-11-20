import { Accordion, SearchBox } from "march/ui"
import { truck, receipt, shieldCheck, creditCard } from "march/icons"

// yardım merkezi: arama kutusu soruları süzer; açılan soru sayılır
const faq = [
  { id: "kargo", title: "Kargom ne zaman gelir?", icon: truck, content: "Siparişler aynı gün paketlenir, 2–3 iş gününde teslim edilir." },
  { id: "iade", title: "Nasıl iade ederim?", icon: receipt, content: "Hesabım › Siparişler › İade et: etiket e-postanıza gelir." },
  { id: "garanti", title: "Garanti süresi ne kadar?", icon: shieldCheck, content: "Bütün cihazlar iki yıl garantilidir." },
  { id: "odeme", title: "Hangi ödeme yollarını kabul ediyorsunuz?", icon: creditCard, content: "Kredi kartı, banka kartı ve havale." },
]

export function HelpCenter() {
  let $q = ""
  let $opened = 0
  const shown = () => faq.filter((f) => f.title.toLocaleLowerCase("tr").includes($q.toLocaleLowerCase("tr")))
  return <div sx={{ flex: "col", gap: 3 }}>
    <SearchBox label="Soru ara" value={$q} onInput={(v: string) => $q = v} />
    {() => <Accordion variant="contained" items={shown()} onToggle={(_k: string | number, open: boolean) => { if (open) $opened++ }} />}
    <span sx={{ text: "xs", color: "muted" }}>{shown().length} soru · {$opened} kez açıldı</span>
  </div>
}
