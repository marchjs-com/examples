import { ListRow, Badge, Card, StatusDot } from "march/ui"
import { home, zap, star } from "march/icons"

// ListRow'un bütün özellikleri bir arada: lead, title, sub, trail, actions, href, onClick, as, titleAs, subAs, direction,
// active, selected, disabled, interactive, size, color, align, overflow, marquee, indicator, tooltip, class ve children
export function ListRowLab() {
  let $sel = "a"
  let $clicks = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div>
      <ListRow class="lab-link" lead={home} title="Bağlantı satırı" sub="href + active" href="#ana" active indicator tooltip="Ana sayfaya git" />
      <ListRow class="lab-btn" lead={star} title={() => `Düğme satırı (${$clicks})`} trail={<Badge tone="info">yeni</Badge>} size="lg" color="brand-orange"
        selected={() => $clicks % 2 === 1} onClick={() => $clicks++} />
      <ListRow lead={<StatusDot tone="success" />} title="Çok uzun, sığmayan, üç noktayla biten bir satır başlığı burada" overflow="ellipsis" size="sm" />
      <ListRow title="Sürekli kayan uzun başlık: döngüde, hızlı, gözünüz yorulmasın diye yavaşlatılabilir" marquee={{ mode: "loop", speed: 40 }} size="xs" />
      <ListRow title="Kullanılamaz" disabled onClick={() => $clicks += 100} />
    </div>
    <ul role="listbox" aria-label="Seçenekler" sx={{ m: 0, p: 0 }}>
      {["a", "b"].map((id) => <ListRow as="li" role="option" interactive aria-selected={() => String($sel === id)} active={() => $sel === id}
        on:click={() => $sel = id}>{`Seçenek ${id.toUpperCase()}`}</ListRow>)}
    </ul>
    <Card m:theme="night">
      <ListRow as="article" direction="column" align="center" overflow="wrap" lead={zap} titleAs="h3" subAs="p" title="Karo"
        sub="Uzun açıklama alt satıra geçer, karo ortalıdır." actions={<Badge>eylem</Badge>} />
    </Card>
  </div>
}
