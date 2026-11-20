import { StatTile, Card } from "march/ui"

// StatTile'ın bütün özellikleri bir arada: value (metin, sayı, düğüm, erişimci), label, hint, align, size, variant, order,
// onClick, href, disabled, term (dl içinde dt + dd), hintIn, emphasis, partClass, class ve öznitelikler (id, data-*)
const sizes = ["sm", "md", "lg", "xl"] as const

// bir sıra karo ve üstünde adı
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 2 }}>{props.children}</div>
</div>

export function StatTileLab() {
  let $n = 7
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Boyut ve görünüm">
      {sizes.map((s) => <StatTile size={s} variant="tile" value={s} label="boyut" />)}
      <StatTile variant="plain" value="yalın" label="plain" />
      <StatTile variant="card" value="kart" label="card" />
    </Row>
    <Row title="Hizalama, sıra, ipucu">
      <StatTile align="start" order="label" value="başta" label="önce etiket" hint="ipucu kendi satırında" variant="card" />
      <StatTile align="end" value="sonda" label="sona hizalı" hint="ipucu değerin içinde" hintIn="value" variant="card" />
    </Row>
    <Row title="Düğme, bağlantı, kapalı">
      <StatTile class="lab-btn" value={() => $n} label="Bas, artsın" onClick={() => $n++} variant="tile" m:color="brand-orange" />
      <StatTile value="Rapor" label="bağlantı" href="#rapor" variant="tile" />
      <StatTile value="Kapalı" label="kullanılamaz" onClick={() => $n += 100} disabled variant="tile" />
    </Row>
    <dl class="lab-dl">
      <StatTile term value="Uzun bir değer metni: ayrıntı listesinde gövde metni gibi alt satıra geçer" label="Açıklama" emphasis="text" align="start"
        partClass={{ value: "lab-value", label: "lab-label" }} id="lab-term" data-kind="ayrıntı" />
    </dl>
    <Card m:theme="night">
      <StatTile value={() => $n * 10} label="Koyu zeminde" hint="erişimci değer" />
    </Card>
  </div>
}
