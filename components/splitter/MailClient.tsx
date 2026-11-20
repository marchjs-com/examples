import { Splitter, ListRow } from "march/ui"
import { mail } from "march/icons"

// e-posta istemcisi: solda gelen kutusu, sağda seçilen ileti; liste payı kaydırılabilir
const inbox = [
  { from: "Elif", subject: "Toplantı notları", body: "Yarınki toplantının notlarını ekte bulabilirsin." },
  { from: "Can", subject: "Tasarım taslağı", body: "Yeni ana sayfa taslağına bakar mısın?" },
  { from: "Deniz", subject: "Fatura", body: "Kasım faturası hazır." },
]

export function MailClient() {
  let $open = 0
  return <div style={{ "block-size": "14rem" }} class="m-card">
    <Splitter initial={0.4} min={0.25} label="Gelen kutusu genişliği"
      start={<div>{inbox.map((m, i) => <ListRow icon={mail} title={m.from} subtitle={m.subject} on:click={() => $open = i} />)}</div>}
      end={<div sx={{ p: 4 }}><h4 sx={{ text: "bold" }}>{inbox[$open]!.subject}</h4><p>{inbox[$open]!.body}</p></div>} />
  </div>
}
