import { PullToRefresh, Card } from "march/ui"
import { sparkles } from "march/icons"

// şans kurabiyesi: aşağı çek (ya da odaklanıp "Yeni şans" düğmesine bas), yeni bir söz gelsin
const SAYINGS = ["Bugün küçük bir adım büyük bir kapı açar.", "Bir fincan kahve iyi bir fikri çağırır.", "Beklemediğin bir mesaj seni gülümsetecek.", "Yarım kalan işini bitirmenin tam zamanı.", "Yeni bir dost kapıda."]

export function FortuneCookie() {
  let $n = 0
  return <Card title="🥠 Şans kurabiyesi">
    <div style={{ height: "160px" }}>
      <PullToRefresh icon={sparkles} m:color="brand-gold" labels={{ refresh: "Yeni şans" }}
        onRefresh={() => new Promise((ok) => setTimeout(ok, 700)).then(() => { $n++ })}>
        <p sx={{ text: ["lg", "center"], p: 4 }}>{() => SAYINGS[$n % SAYINGS.length]}</p>
        <p sx={{ text: ["sm", "center"], color: "muted" }}>Aşağı çekin</p>
      </PullToRefresh>
    </div>
  </Card>
}
