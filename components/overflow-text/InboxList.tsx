// InboxList: the real-life OverflowText example.
//
// An inbox: an announcement strip (Marquee) runs across the top, and every row's subject line scrolls only when it does
// not fit, on hover or keyboard focus. The subject of the row you opened scrolls all the time. Use this pattern for
// lists with long single-line text, where wrapping would make rows uneven and an ellipsis would hide the end.
import { OverflowText, Marquee, Badge, Card } from "march/ui"

const MAILS = [
  { id: 1, from: "Ece", subject: "Cumartesi Moda sahili koşusu: buluşma 08:30'da vapur iskelesinde, kahvaltı sonrası", unread: true },
  { id: 2, from: "HADİ Ekibi", subject: "Hesabınızda yeni oturum açıldı: İstanbul, Chrome. Bu siz değilseniz parolanızı değiştirin", unread: true },
  { id: 3, from: "Mert", subject: "Sunum dosyası ekte", unread: false },
  { id: 4, from: "Kitap Kulübü", subject: "Bu ayın kitabı ve tartışma soruları: ilk üç bölümü okuyup gelmeyi unutmayın", unread: false },
]

// One mail row. The row is focusable (tabindex="0") and OverflowText listens to its hover and focus, so a keyboard user
// can make a long subject scroll with Tab. `play` is an extra condition that keeps the text scrolling: here it is true
// for the opened row. Text that fits stays still: a short subject never moves.
const MailRow = (props: { from: string; subject: string; unread: boolean; open: boolean; onOpen: () => void }) =>
  <div tabindex="0" sx={{ flex: ["row", "center"], gap: 2, p: 2, radius: 2 }} on:click={() => props.onOpen()}>
    <span sx={{ text: "bold", w: "sm" }}>{props.from}</span>
    <div sx={{ flex: "grow" }}><OverflowText text={props.subject} play={() => props.open} /></div>
    {props.unread ? <Badge tone="info">yeni</Badge> : null}
  </div>

export function InboxList() {
  // The id of the opened mail, and the ids already read (they lose their "new" badge).
  let $open = 0
  let $read: number[] = []
  return <Card title="Gelen kutusu" sx={{ w: "md" }}>
    <div sx={{ flex: "col", gap: 1 }}>
      {/* Marquee is the endless ticker preset of OverflowText (always visible, loops). `separator` goes between the
          repeats. It does not move under reduced motion; the motion engine's global speed and "Stop all" apply to it. */}
      <div sx={{ text: "sm", color: "brand-orange" }}>
        <Marquee text="Bakım: Pazar 02:00–03:00 arası posta gönderilemez · Yeni: aramada etiketler · Karanlık tema geldi" separator="•" />
      </div>
      {MAILS.map((m) => <MailRow from={m.from} subject={m.subject} unread={m.unread && !$read.includes(m.id)} open={$open === m.id}
        onOpen={() => { $open = m.id; $read = [...$read, m.id] }} />)}
    </div>
  </Card>
}
