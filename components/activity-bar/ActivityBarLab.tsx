import { ActivityBar, Button } from "march/ui"
import { files, search, gitBranch, settings, fileText, clock, star, inbox, send, edit } from "march/icons"

// ActivityBar'ın bütün özellikleri: items (id, label, short, icon, badge, position, shortcut, onSelect, children), value,
// onChange, collapsible, orientation, controls, label, indicator, motion, tooltips, showLabels, glass, subItems,
// subValue, onSubSelect, class; ortak özelliklerden m:color
export function ActivityBarLab() {
  let $view: string | null = "files"
  let $page = "open"
  let $hits = 7
  let $opened = 0
  let $box = "in"
  let $flat = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: "row", gap: 3 }}>
      <ActivityBar class="lab-ab" m:color="brand-green" label="Lab görünümleri" controls="lab-side" motion="fade" glass
        showLabels tooltips={false} subItems subValue={$page} onSubSelect={(child: { id: string }) => $page = child.id}
        value={$view} onChange={(id: string) => $view = id} items={[
          { id: "files", label: "Dosyalar", short: "Dosya", icon: files, children: [
            { id: "open", label: "Açık dosyalar", short: "Açık", icon: fileText },
            { id: "recent", label: "Son kullanılanlar", short: "Son", icon: clock },
            { id: "starred", label: "Yıldızlılar", short: "Yıldız", icon: star },
          ] },
          { id: "search", label: "Ara", icon: search, badge: () => $hits },
          { id: "git", label: "Kaynak denetimi", short: "Kaynak", icon: gitBranch, shortcut: "mod+shift+g" },
          { id: "settings", label: "Ayarlar", icon: settings, position: "end", onSelect: () => $opened++ },
        ]} />
      <div id="lab-side" role="tabpanel" sx={{ flex: "col", gap: 1 }}>
        <strong>{$view ? `${$view} görünümü` : "Yan görünüm kapalı"}</strong>
        <span sx={{ text: "sm", color: "muted" }}>Alt sayfa: {$page} · Ayarlar {$opened} kez açıldı</span>
        <Button size="sm" variant="ghost" on:click={() => $hits = 0}>Sonuçları temizle</Button>
      </div>
    </div>
    <div sx={{ flex: "col", gap: 2 }}>
      <ActivityBar class="lab-ab2" label="Posta kutuları" collapsible={false} indicator={false} orientation={() => ($flat ? "horizontal" : "vertical")}
        value={$box} onChange={(id: string) => $box = id ?? $box} items={[
          { id: "in", label: "Gelen", icon: inbox, badge: 2 },
          { id: "out", label: "Giden", icon: send },
          { id: "draft", label: "Taslaklar", icon: edit },
        ]} />
      <Button size="sm" variant="ghost" on:click={() => $flat = !$flat}>Çubuğu döndür</Button>
    </div>
  </div>
}
