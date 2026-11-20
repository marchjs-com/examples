import { Menu, Dropdown, Chip, Avatar, action, Button } from "march/ui"
import { edit, copy, trash, more, settings, helpCircle, filter, star } from "march/icons"

// Menu'nün bütün özellikleri: items (düz öğe: icon, shortcut, disabled, hidden, danger, href, sub, current, checked,
// radio; "-" ayraç; action()), args, label, icon (yalnız ikon), trigger (kendi içeriğin), variant, size, class,
// panelClass, placement, disabled ve ortak m:color; Dropdown: aynı tetik, içeriği (close) => … işlevi
export function MenuLab() {
  let $last = "henüz yok"
  let $sort = "Ad"
  let $hidden = false
  let $locked = false
  let $tags = new Set(["Tasarım"])
  const file = { name: "rapor.pdf" }
  const remove = action("Sil", (f: { name: string }) => { $last = `${f.name} silindi` }, { icon: trash, danger: true })
  const pick = (what: string) => () => { $last = what }
  const tag = (t: string) => { const n = new Set($tags); if (n.has(t)) n.delete(t); else n.add(t); $tags = n }
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Menu label="Dosya" class="lab-file" panelClass="lab-file-panel" args={[file]} items={[
        { label: "Yeniden adlandır", icon: edit, shortcut: "F2", onSelect: pick("Yeniden adlandır") },
        { label: "Kopyala", icon: copy, shortcut: "mod+c", onSelect: pick("Kopyala") },
        { label: "Arşivle", disabled: true },
        { label: "Gizli öğe", hidden: true },
        "-", remove,
      ]} />
      <Menu label="Sırala" variant="primary" m:color="brand-purple" items={[
        ...["Ad", "Tarih", "Boyut"].map((k) => ({ label: k, radio: true, checked: () => $sort === k, onSelect: () => { $sort = k } })),
        "-", { label: "Gizli dosyaları göster", checked: () => $hidden, onSelect: () => { $hidden = !$hidden } },
      ]} />
      <Menu label="Bölümler" variant="ghost" size="sm" placement="bottom-end" items={[
        { label: "Formlar", sub: "Alanlar ve seçiciler", current: true, onSelect: pick("Formlar") },
        { label: "Tablolar", sub: "Sıralama ve süzme", onSelect: pick("Tablolar") },
        { label: "Yardım", icon: helpCircle, href: "#yardim" },
      ]} />
      <Menu label="Daha fazla" icon={more} size="lg" items={[{ label: "Ayarlar", icon: settings, onSelect: pick("Ayarlar") }]} />
      <Menu label="Hesap" trigger={<><Avatar name="Elif Arslan" size="xs" /> Elif</>} items={[{ label: "Profil", onSelect: pick("Profil") }, { label: "Çıkış", danger: true, onSelect: pick("Çıkış") }]} />
      <Menu label="Kilitli" disabled={$locked} items={[{ label: "Aç", onSelect: pick("Aç") }]} />
      <Button on:click={() => $locked = !$locked}>{$locked ? "Kilidi kaldır" : "Kilitle"}</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Dropdown label="Etiketler" icon={filter} m:color="brand-green">
        {(close: () => void) => <div sx={{ flex: "col", gap: 2 }}>
          <div sx={{ flex: ["row", "wrap"], gap: 1 }}>{["Tasarım", "Ürün", "Pazarlama"].map((t) => <Chip selected={$tags.has(t)} onClick={() => tag(t)}>{t}</Chip>)}</div>
          <Button on:click={() => close()}>Tamam</Button>
        </div>}
      </Dropdown>
      <Dropdown label="Yıldızlılar" variant="secondary" placement="top-start"><Chip icon={star}>3 yıldızlı belge</Chip></Dropdown>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{`Seçilen: ${$last} · Sıra: ${$sort} · Gizliler: ${$hidden ? "açık" : "kapalı"} · Etiketler: ${[...$tags].join(", ") || "yok"}`}</p>
  </div>
}
