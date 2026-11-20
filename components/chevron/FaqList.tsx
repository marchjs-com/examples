import { Card, Button, Chevron } from "march/ui"

// bir kulübün sık sorulan soruları: her başlık düğmesi aria-expanded taşır, ok onu izler, cevap yalnız açıkken görünür
const faqs = [
  { q: "Üyelik ücretli mi?", a: "Hayır. Koşulara katılmak ücretsiz; yalnızca yarış kayıtları ücretlidir." },
  { q: "Hangi günler koşuyoruz?", a: "Salı ve perşembe 19.00'da, cumartesi 09.00'da Moda sahilinde." },
  { q: "Yeni başlayanlar katılabilir mi?", a: "Elbette. Her koşuda tempoyu düşük tutan bir rehber grup var." },
]

// tek bir soru: kendi açık / kapalı durumu var
const Faq = (props: { q: string; a: string }) => {
  let $open = false
  return <div sx={{ flex: "col", gap: 1 }}>
    <Button variant="ghost" block aria-expanded={$open ? "true" : "false"} on:click={() => $open = !$open}>
      <span sx={{ flex: ["row", "between"], w: "full" }}>{props.q} <Chevron direction="down" /></span>
    </Button>
    {$open ? <p sx={{ px: 3, color: "muted" }}>{props.a}</p> : null}
  </div>
}

export function FaqList() {
  return <Card title="Sık sorulanlar">
    <div sx={{ flex: "col", gap: 1 }}>{faqs.map((f) => <Faq q={f.q} a={f.a} />)}</div>
  </Card>
}
