// LinkCardLab: the full-featured LinkCard example; it uses every prop at least once.
//
// Props shown here: href (the whole card is the link), title (can be live), description, icon, tone, color (wins over
// tone), lead (your own start content instead of the icon tile), meta (can be live), arrow (true, false or your own
// mark), class, and other attributes (id, data-*) that go to the link.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LinkCardLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
// The links go to real pages of the showcase.
//
// Animation: the hover lift and arrow slide are turned off by reduced motion.
import { LinkCard, Avatar, Button, Card } from "march/ui"
import { Icon, star, gitBranch, sparkles, chevronRight } from "march/icons"

export function LinkCardLab() {
  // Signals: a star count shown in a card's `meta`, and whether another card's title is renamed.
  let $stars = 41
  let $renamed = false
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* These buttons change the signals, to show that `meta` and `title` are live. */}
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" variant="secondary" on:click={() => $stars++}>Yıldız ver</Button>
      <Button size="sm" variant="ghost" on:click={() => $renamed = !$renamed}>Başlığı değiştir</Button>
    </div>
    {/* Card 1, the usual form: href makes the whole card a link; icon is drawn in an icon tile coloured by `tone`;
        meta is a small text at the end (a template string reading $stars, so it follows it). class and data-kind are
        not LinkCard props: they pass to the <a> element, next to the built-in m-link-card class. */}
    <LinkCard href="/data/table" icon={star} tone="warn" title="Tablo" description="10.000 satır, sıralama, seçim"
      meta={`★ ${$stars}`} class="lab-table" data-kind="veri" />
    {/* Card 2: color is a colour token for the tile and wins over `tone`. title is a conditional that reads $renamed.
        arrow={false}: no hover arrow. id goes to the link (the test finds the card by it). */}
    <LinkCard href="/data/tree" icon={gitBranch} color="brand-purple" title={$renamed ? "Ağaç görünümü" : "Ağaç"}
      description="Ok tuşlarıyla gezinme" arrow={false} class="lab-noarrow" id="agac" />
    {/* Card 3: lead replaces the icon tile with your own node (an Avatar; `decorative` hides it from screen readers
        because the title already names the card). arrow can also be your own mark, here a chevron icon. */}
    <LinkCard href="/buttons/button" lead={<Avatar name="March Düğme" size="md" decorative />} title="Düğme"
      description="Kendi baş düğümü (lead) ve kendi ok işareti" arrow={<Icon of={chevronRight} /> as Node} class="lab-lead" />
    {/* The same component on the dark theme: m:theme="night" is a common prop that sets the theme of the card and
        everything inside it. */}
    <Card m:theme="night">
      <LinkCard href="/buttons/icon-button" icon={sparkles} tone="pink" title="İkon düğmesi" meta="yeni" class="lab-night" />
    </Card>
  </div>
}
