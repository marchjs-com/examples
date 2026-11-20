import { ExplodedView, Button, Badge, Card, Avatar } from "march/ui"

// ExplodedView'un özellikleri: open / setOpen, parts, target, layers, tags, gap, tilt, fit, motion, onPick, active, label, class
// İki kip: parts verilince içerikte seçiciye uyan her öğe ayrı plaka olur; verilmezse tek öğenin katmanları (gölge,
// zemin, içerik, odak halkası) ayrılır ve target hangi öğe olduğunu seçer (yoksa ilk öğe)
// parts: id onPick'e gider ve active ile karşılaştırılır (yoksa label); level kaç basamak yükseleceği (varsayılan 1)
const parts = [{ selector: ".m-avatar", label: "Avatar", id: "avatar" }, { selector: ".m-badge", label: "Rozet", level: 2 }]

// startOpen: ayrık başlar (Özellikler'deki open ve tags hemen görünür); testler birleşik başlatır
export function ExplodedViewLab(props: { startOpen?: boolean }) {
  let $open = props.startOpen ?? true
  let $picked = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button size="sm" class="lab-flip" on:click={() => $open = !$open}>{$open ? "Kapat" : "Ayır"}</Button>
    {/* katman kipi: target ile içerikteki ikinci düğme ayrılır */}
    <ExplodedView class="lab-ev" open={$open} setOpen={(v: boolean) => $open = v} target=".lab-save" label="Düğmenin katmanları" tags={false} gap={20}
      tilt={{ x: 46, z: -24 }} fit={false} motion="none" layers={{ ring: false, surface: "Zemin" }} onPick={(id: string) => $picked = id} active={$picked}>
      <div sx={{ flex: "row", gap: 2 }}>
        <Button size="sm">Vazgeç</Button>
        <Button class="lab-save" icon={undefined}>Kaydet <Badge>2</Badge></Button>
      </div>
    </ExplodedView>
    {/* parça kipi: avatar ve rozet ayrı plakalar; rozet iki basamak yükselir */}
    <ExplodedView class="lab-parts" open={$open} parts={parts} label="Profil kartının parçaları" onPick={(id: string) => $picked = id} active={$picked}>
      <Card>
        <div sx={{ flex: ["row", "center"], gap: 2 }}><Avatar name="Elif Arslan" /><strong>Elif Arslan</strong><Badge tone="success">Etkin</Badge></div>
      </Card>
    </ExplodedView>
    <span class="lab-state">{$open ? "ayrık" : "birleşik"} · seçilen: {$picked || "—"}</span>
  </div>
}
