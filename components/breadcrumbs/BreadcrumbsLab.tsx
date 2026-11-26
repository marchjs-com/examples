// BreadcrumbsLab: the full-featured Breadcrumbs example; it uses every prop at least once.
//
// Props shown here: items (id, label, icon, href, onSelect, siblings with id, label, icon, sub, href, onSelect and
// current), label, separator, collapse, ellipsis, labels (more, goTo), class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// BreadcrumbsLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Breadcrumbs } from "march/ui"
import { home, folder, fileText, hash, arrowRight } from "march/icons"

// The crumbs below that have an href point at this very page, so pressing one does not leave the page.
const here = location.pathname

export function BreadcrumbsLab() {
  // The open file (changed by the sibling menu) and how often the "Belgeler" crumb was pressed (reactive state).
  let $file = "rapor.md"
  let $opened = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The wrappers give the first bar a narrow box (a grid of 3 columns, the bar spans 2), so the path does not fit
        and its middle crumbs collapse into the "..." menu. */}
    <div sx={{ cols: 3 }}>
      <div sx={{ span: 2 }}>
        {/* The first bar, with everything:
            - class, m:color: added to the nav; m:color sets the colour token of the bar and what is inside it.
            - label: the accessible name of the nav landmark. separator="/": the text between crumbs (an icon, a
              function returning a node, or false for nothing also work). ellipsis: the content of the button that
              holds the collapsed crumbs. labels.more is that button's accessible name; labels.goTo builds the name of
              a sibling menu button from the crumb's name.
            - items as a function: it is re-read when $file changes, so the last crumb follows the open file.
            Crumb kinds: `href` makes a link, `onSelect` makes a button, and `siblings` makes a menu of the items beside
            it (each sibling can have a `sub` second line, an href or onSelect, and `current` marks the one the path
            goes through). The last crumb is the current page. When the path does not fit, the middle crumbs collapse
            into the menu (the first and last always stay). */}
        <Breadcrumbs class="lab-bc" m:color="brand-blue" label="Belge yolu" separator="/" ellipsis="···"
          labels={{ more: "Aradaki klasörler", goTo: (name: string) => `${name} yanındakiler` }} items={() => [
            { id: "home", label: "Ana sayfa", icon: home, href: here },
            { id: "docs", label: "Belgeler", icon: folder, onSelect: () => $opened++ },
            { id: "work", label: "İş", icon: folder },
            { id: "archive", label: "Arşiv", icon: folder },
            { id: "y2026", label: "2026", icon: folder },
            { id: "file", label: $file, icon: fileText, siblings: [
              { id: "r", label: "rapor.md", icon: fileText, sub: "Haftalık rapor", current: $file === "rapor.md", onSelect: () => $file = "rapor.md" },
              { id: "n", label: "notlar.md", icon: fileText, sub: "Toplantı notları", current: $file === "notlar.md", onSelect: () => $file = "notlar.md" },
              { id: "h", label: "Sürüm geçmişi", href: `${here}?surum=1` },
            ] },
            { id: "sym", label: "Özet", icon: hash },
          ]} />
      </div>
    </div>
    <span sx={{ text: "sm", color: "muted" }}>Bölüm ve Belgeler {$opened} kez açıldı · açık dosya: {$file}</span>
    {/* The second bar shows the "off" switches: separator={false} draws no separators, collapse={false} clips the path
        instead of collapsing it into a menu. Crumbs without href or onSelect are plain text. */}
    <Breadcrumbs class="lab-bc2" label="Düz yol" separator={false} collapse={false} items={[
      { id: "a", label: "Bölüm", onSelect: () => $opened++ },
      { id: "b", label: "Konu" },
      { id: "c", label: "Sayfa" },
    ]} />
    {/* The third bar uses an icon as the separator. */}
    <Breadcrumbs class="lab-bc3" label="İkonlu ayraç" separator={arrowRight} items={[{ id: "x", label: "Başlangıç" }, { id: "y", label: "Bitiş" }]} />
  </div>
}
