import { Tree, Card } from "march/ui"
import { folder, star, heart, bell } from "march/icons"

// Tree'nin bütün özellikleri bir arada: nodes (ikon, sağdaki bilgi, alt dallar), expanded, selected + onSelect,
// label, chevron (kendi işaretin ya da hiç), toggle ("row" / "chevron"), class ve m:color
const nodes = [
  { id: "fav", label: "Favoriler", icon: star, meta: "3", children: [
    { id: "songs", label: "Şarkılar", icon: heart, meta: "128" },
    { id: "alerts", label: "Uyarılar", icon: bell, meta: "7" },
    { id: "deep", label: "Klasörler", icon: folder, children: [{ id: "leaf", label: "çok-uzun-bir-klasör-adı-kayarak-okunur" }] },
  ] },
  { id: "other", label: "Diğerleri", children: [{ id: "misc", label: "Çeşitli" }] },
]

// bir ağaç ve üstünde adı
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function TreeLab() {
  let $sel = "songs"
  let $count = 0
  const pick = (n: { id: string }) => { $sel = n.id; $count++ }
  return <div sx={{ flex: "col", gap: 3 }}>
    <p>Seçili: <b>{() => $sel}</b> · seçim sayısı: <b>{() => $count}</b></p>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Box title="Ok (varsayılan), satır açar">
        <Tree label="Ağaç A" nodes={nodes} expanded={["fav"]} selected={() => $sel} onSelect={pick} />
      </Box>
      <Box title="Kendi işaretim, yalnız ok açar, mor">
        <Tree label="Ağaç B" nodes={nodes} expanded={["fav", "deep"]} toggle="chevron" m:color="brand-purple"
          chevron={(_n: unknown, open: () => boolean) => <b>{() => (open() ? "−" : "+")}</b>} selected={() => $sel} onSelect={pick} />
      </Box>
      <Card m:theme="night">
        <Box title="Oksuz, koyu zemin, sınıf">
          <Tree label="Ağaç C" nodes={nodes} expanded={["fav", "other"]} chevron={false} class="lab-tree" m:color="success" selected={() => $sel} onSelect={pick} />
        </Box>
      </Card>
    </div>
  </div>
}
