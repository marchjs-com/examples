// ListRowLab: the full-featured ListRow example; it uses every prop at least once.
//
// Props shown here: lead, title, sub, trail, actions, href, onClick, as, titleAs, subAs, direction, active, selected,
// disabled, interactive, size, color, align, overflow, marquee, indicator, tooltip, class and children.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ListRowLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Animation: text that does not fit scrolls (the marquee row); it stops under reduced motion.
import { ListRow, Badge, Card, StatusDot } from "march/ui"
import { home, zap, star } from "march/icons"

export function ListRowLab() {
  // Signals: the chosen option of the listbox ("a" or "b") and a click counter for the button row.
  let $sel = "a"
  let $clicks = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div>
      {/* Row 1, a link: href makes it an <a>. active marks the current page (aria-current="page"); indicator draws the
          bar at the start edge of the active row; tooltip is the native tooltip (the title attribute); lead is an
          icon. */}
      <ListRow class="lab-link" lead={home} title="Bağlantı satırı" sub="href + active" href="#ana" active indicator tooltip="Ana sayfaya git" />
      {/* Row 2, a button: onClick makes it a <button>. title is a function, so it shows the click count. selected is a
          function too: odd counts are "selected" (aria-pressed). trail is the node at the end; size="lg" a taller row;
          color tints the selected row. */}
      <ListRow class="lab-btn" lead={star} title={() => `Düğme satırı (${$clicks})`} trail={<Badge tone="info">yeni</Badge>} size="lg" color="brand-orange"
        selected={() => $clicks % 2 === 1} onClick={() => $clicks++} />
      {/* Row 3: a StatusDot as the lead; a title too long for the row is cut with an ellipsis (overflow="ellipsis");
          size="sm" is a denser row. */}
      <ListRow lead={<StatusDot tone="success" />} title="Çok uzun, sığmayan, üç noktayla biten bir satır başlığı burada" overflow="ellipsis" size="sm" />
      {/* Row 4: marquee passes options to the scrolling text: mode "loop" scrolls it round and round, speed sets how
          fast. size="xs" is the densest row (a status bar item). */}
      <ListRow title="Sürekli kayan uzun başlık: döngüde, hızlı, gözünüz yorulmasın diye yavaşlatılabilir" marquee={{ mode: "loop", speed: 40 }} size="xs" />
      {/* Row 5: disabled. Its click does nothing, so the counter is not raised by 100. */}
      <ListRow title="Kullanılamaz" disabled onClick={() => $clicks += 100} />
    </div>
    {/* A listbox made of plain rows: as="li" with role="option" makes a list item that takes the role the list needs.
        interactive gives it the hover look (the host list handles the click, here on:click). aria-selected and active
        follow $sel. The children are the row's title. Keyboard handling for a real listbox belongs to the host list. */}
    <ul role="listbox" aria-label="Seçenekler" sx={{ m: 0, p: 0 }}>
      {["a", "b"].map((id) => <ListRow as="li" role="option" interactive aria-selected={() => String($sel === id)} active={() => $sel === id}
        on:click={() => $sel = id}>{`Seçenek ${id.toUpperCase()}`}</ListRow>)}
    </ul>
    {/* A tile-like row on the dark theme (m:theme="night" on the Card):
        - as="article": the row is an <article>; direction="column": the lead sits above the text; align="center"
          centres it.
        - overflow="wrap": long text wraps instead of scrolling. titleAs="h3" and subAs="p": real heading and paragraph
          elements for the title and the sub text.
        - actions: a control placed at the end of a plain row. */}
    <Card m:theme="night">
      <ListRow as="article" direction="column" align="center" overflow="wrap" lead={zap} titleAs="h3" subAs="p" title="Karo"
        sub="Uzun açıklama alt satıra geçer, karo ortalıdır." actions={<Badge>eylem</Badge>} />
    </Card>
  </div>
}
