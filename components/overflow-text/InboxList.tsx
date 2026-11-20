import { OverflowText, Marquee, Badge, Card } from "march/ui"

// gelen kutusu: üstte duyuru şeridi (Marquee) akar; her satırın konusu sığmazsa üzerine gelince ya da Tab ile
// odaklanınca kayar, açılan satırın konusu hep kayar (play)
const MAILS = [
  { id: 1, from: "Ece", subject: "Cumartesi Moda sahili koşusu: buluşma 08:30'da vapur iskelesinde, kahvaltı sonrası", unread: true },
  { id: 2, from: "HADİ Ekibi", subject: "Hesabınızda yeni oturum açıldı: İstanbul, Chrome. Bu siz değilseniz parolanızı değiştirin", unread: true },
  { id: 3, from: "Mert", subject: "Sunum dosyası ekte", unread: false },
  { id: 4, from: "Kitap Kulübü", subject: "Bu ayın kitabı ve tartışma soruları: ilk üç bölümü okuyup gelmeyi unutmayın", unread: false },
]

// bir posta satırı: odaklanabilir (tabindex), OverflowText onun üzerine gelmeyi ve odağını dinler
const MailRow = (props: { from: string; subject: string; unread: boolean; open: boolean; onOpen: () => void }) =>
  <div tabindex="0" sx={{ flex: ["row", "center"], gap: 2, p: 2, radius: 2 }} on:click={() => props.onOpen()}>
    <span sx={{ text: "bold", w: "sm" }}>{props.from}</span>
    <div sx={{ flex: "grow" }}><OverflowText text={props.subject} play={() => props.open} /></div>
    {props.unread ? <Badge tone="info">yeni</Badge> : null}
  </div>

export function InboxList() {
  let $open = 0
  let $read: number[] = []
  return <Card title="Gelen kutusu" sx={{ w: "md" }}>
    <div sx={{ flex: "col", gap: 1 }}>
      <div sx={{ text: "sm", color: "brand-orange" }}>
        <Marquee text="Bakım: Pazar 02:00–03:00 arası posta gönderilemez · Yeni: aramada etiketler · Karanlık tema geldi" separator="•" />
      </div>
      {MAILS.map((m) => <MailRow from={m.from} subject={m.subject} unread={m.unread && !$read.includes(m.id)} open={$open === m.id}
        onOpen={() => { $open = m.id; $read = [...$read, m.id] }} />)}
    </div>
  </Card>
}
