import { JsonView, Card } from "march/ui"

// JsonView'un bütün özellikleri bir arada: value (her tür: sayı, metin, null, dizi, tarih, döngüsel, işlev),
// open, labels, arrow (ok / yok / kendi), label, describe ve class
const data: Record<string, unknown> = {
  name: "March", version: 2, stable: true, author: null, tags: ["tsx", "signals"],
  since: new Date(Date.UTC(2026, 0, 1)), nested: { deep: { deeper: { deepest: "dip" } } },
  onClick: () => 1,
}
data.self = data

// bir ağaç ve üstünde adı
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function JsonViewLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <Box title="Her tür değer, iki kat açık, kendi metinler, işlevin adı">
      <JsonView class="lab-json" label="Paket" value={data} open={2}
        labels={{ items: "öğe", keys: "alan", circular: "(kendisi)" }}
        describe={(v: unknown) => typeof v === "function" ? "ƒ işlev" : null} />
    </Box>
    <Box title="Kapalı, kendi işaretim">
      <JsonView label="Kapalı" value={{ a: 1, b: [1, 2, 3] }} open={0} arrow={(open: () => boolean) => <b>{() => (open() ? "−" : "+")}</b>} />
    </Box>
    <Card m:theme="night">
      <Box title="Oksuz, koyu zemin">
        <JsonView label="Koyu" value={[1, "iki", { üç: 3 }]} arrow={false} />
      </Box>
    </Card>
  </div>
}
