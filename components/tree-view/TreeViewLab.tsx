import { TreeView } from "march/components/tree-view"
import { Empty, Button } from "march/ui"
import { star } from "march/icons"

// TreeView'in bütün özellikleri bir arada: nodes (ikon, bilgi, tembel, kapalı düğüm), load, selection + selected +
// onSelect, expanded + onExpand, search, draggable + canDrop + onMove, onActivate, height, rowHeight, icons, chevron,
// empty, ghost, labels, animate, label, class ve m:color
type Node = { id: string; label: string; icon?: unknown; meta?: string; lazy?: boolean; disabled?: boolean; children?: Node[] }
const nodes: Node[] = [
  { id: "inbox", label: "Gelen kutusu", meta: "12", children: [
    { id: "work", label: "İş", children: [{ id: "w1", label: "Toplantı notu" }, { id: "w2", label: "Fatura" }] },
    { id: "home", label: "Ev", children: [{ id: "h1", label: "Kira" }] },
    { id: "old", label: "Eski postalar", lazy: true },
  ] },
  { id: "starred", label: "Yıldızlı", icon: star, children: [{ id: "s1", label: "Önemli sözleşme", meta: "PDF" }] },
  { id: "locked", label: "Kilitli klasör", disabled: true },
]

export function TreeViewLab() {
  let $mode = "multiple"
  let $q = ""
  let $sel = "inbox"
  let $last = "—"
  let $plain = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $mode = $mode === "multiple" ? "single" : "multiple"}>{() => `Seçim: ${$mode}`}</Button>
      <Button size="sm" on:click={() => $q = $q ? "" : "fatura"}>{() => ($q ? "Aramayı temizle" : "“fatura” ara")}</Button>
      <Button size="sm" on:click={() => $plain = !$plain}>{() => ($plain ? "İkon ve ok göster" : "Sade görünüm")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Seçili: ${$sel} · Son olay: ${$last}`}</p>
    <TreeView label="Posta klasörleri" class="lab-tv" m:color="brand-purple" nodes={nodes}
      expanded={["inbox", "work"]} selected={["inbox"]} selection={() => $mode as "multiple"}
      search={() => $q} height={300} rowHeight={34} animate
      icons={() => !$plain} chevron={$plain ? false : (_n: unknown, open: boolean) => <b>{open ? "−" : "+"}</b>}
      draggable canDrop={(_ids: string[], target: { disabled?: boolean }) => !target.disabled}
      load={() => new Promise<Node[]>((ok) => setTimeout(() => ok([{ id: "o1", label: "2019 yedeği" }]), 400))}
      onSelect={(ids: string[]) => $sel = ids.join(", ") || "—"}
      onExpand={(id: string, open: boolean) => $last = `${id} ${open ? "açıldı" : "kapandı"}`}
      onMove={(ids: string[], target: string) => $last = `${ids.join(", ")} → ${target}`}
      onActivate={(n: { label: string }) => $last = `${n.label} açıldı`}
      ghost={(list: { label: string }[]) => <b>{`${list.length} öge taşınıyor`}</b>}
      empty={<Empty title="Klasör yok" />}
      labels={{ retry: "Yeniden dene", empty: "Boş", noMatch: (q: string) => `“${q}” bulunamadı` }} />
  </div>
}
