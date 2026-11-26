// TreeLab: the full-featured Tree example; it uses every prop at least once.
//
// Props shown here: nodes (icon, meta text on the right, children), expanded, selected + onSelect, label, chevron (your
// own mark, or none), toggle ("row" / "chevron"), class and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// TreeLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Tree, Card } from "march/ui"
import { folder, star, heart, bell } from "march/icons"

// Node shape: { id, label, icon?, meta?, children? }. `id` is what `expanded`, `selected` and onSelect use; `meta` is a
// small text at the end of the row. A very long label (the last leaf) is not cut with an ellipsis: it scrolls so it
// can be read in full.
const nodes = [
  { id: "fav", label: "Favoriler", icon: star, meta: "3", children: [
    { id: "songs", label: "Şarkılar", icon: heart, meta: "128" },
    { id: "alerts", label: "Uyarılar", icon: bell, meta: "7" },
    { id: "deep", label: "Klasörler", icon: folder, children: [{ id: "leaf", label: "çok-uzun-bir-klasör-adı-kayarak-okunur" }] },
  ] },
  { id: "other", label: "Diğerleri", children: [{ id: "misc", label: "Çeşitli" }] },
]

// A small layout helper: a caption above each tree so the three variants can be told apart.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

// $sel and $count are shared by all three trees: `selected` takes an accessor (so the highlighted row follows the
// signal), and every tree reports clicks to the same onSelect handler.
export function TreeLab() {
  let $sel = "songs"
  let $count = 0
  const pick = (n: { id: string }) => { $sel = n.id; $count++ }
  return <div sx={{ flex: "col", gap: 3 }}>
    <p>Seçili: <b>{() => $sel}</b> · seçim sayısı: <b>{() => $count}</b></p>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      {/* Tree A, defaults: an arrow on branches, and a click on the whole row opens / closes it (toggle="row").
                expanded={["fav"]} opens that branch at start (ids). label is the accessible name of role="tree". */}
      <Box title="Ok (varsayılan), satır açar">
        <Tree label="Ağaç A" nodes={nodes} expanded={["fav"]} selected={() => $sel} onSelect={pick} />
      </Box>
      {/* Tree B:
                - toggle="chevron": only the arrow opens / closes a branch; clicking the row just selects it.
                - chevron as a function (node, open): you draw the mark; `open` is an accessor (call open()), so the inner
                  function child redraws when the branch opens or closes. Here a minus / plus.
                - m:color="brand-purple": a common prop that sets the colour token of the tree (selection, focus ring). */}
      <Box title="Kendi işaretim, yalnız ok açar, mor">
        <Tree label="Ağaç B" nodes={nodes} expanded={["fav", "deep"]} toggle="chevron" m:color="brand-purple"
          chevron={(_n: unknown, open: () => boolean) => <b>{() => (open() ? "−" : "+")}</b>} selected={() => $sel} onSelect={pick} />
      </Box>
      {/* Tree C sits in a Card with m:theme="night" (a common prop: this subtree is drawn in the dark theme whatever
              the page theme is). chevron={false} removes the arrows; class="lab-tree" gives tests and CSS a handle;
              m:color="success" tints it green. Keyboard (all trees): arrows move between rows, Right opens, Left closes,
              Enter / Space selects; the chevron turns on the motion engine, so reduced motion and "Stop all" apply. */}
      <Card m:theme="night">
        <Box title="Oksuz, koyu zemin, sınıf">
          <Tree label="Ağaç C" nodes={nodes} expanded={["fav", "other"]} chevron={false} class="lab-tree" m:color="success" selected={() => $sel} onSelect={pick} />
        </Box>
      </Card>
    </div>
  </div>
}
