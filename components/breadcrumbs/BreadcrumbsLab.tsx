import { Breadcrumbs } from "march/ui"
import { home, folder, fileText, hash, arrowRight } from "march/icons"

// Breadcrumbs'ın bütün özellikleri: items (id, label, icon, href, onSelect, siblings: id, label, icon, sub, href, onSelect,
// current), label, separator, collapse, ellipsis, labels (more, goTo), class; ortak özelliklerden m:color.
// href'ler bu sayfanın kendisi: basınca sayfadan çıkılmaz
const here = location.pathname

export function BreadcrumbsLab() {
  let $file = "rapor.md"
  let $opened = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ cols: 3 }}>
      <div sx={{ span: 2 }}>
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
    <Breadcrumbs class="lab-bc2" label="Düz yol" separator={false} collapse={false} items={[
      { id: "a", label: "Bölüm", onSelect: () => $opened++ },
      { id: "b", label: "Konu" },
      { id: "c", label: "Sayfa" },
    ]} />
    <Breadcrumbs class="lab-bc3" label="İkonlu ayraç" separator={arrowRight} items={[{ id: "x", label: "Başlangıç" }, { id: "y", label: "Bitiş" }]} />
  </div>
}
