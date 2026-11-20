import { PullToRefresh, Button } from "march/ui"
import { Icon, arrowDown, arrowUp, hourglass } from "march/icons"

// PullToRefresh'in bütün özellikleri bir arada: onRefresh, threshold, disabled, onPhase, labels, indicator (kendi
// içeriğin: ikinci örnek), icon, settle, refreshButton, class ve içerik (children)
export function PullToRefreshLab() {
  let $count = 0
  let $phase = "idle"
  let $off = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $off = !$off}>{() => ($off ? "Yenilemeyi aç" : "Yenilemeyi kapat")}</Button>
    </div>
    <p sx={{ text: "sm", color: "muted" }}>{() => `Evre: ${$phase} · yenileme: ${$count}`}</p>
    <div style={{ height: "200px" }}>
      <PullToRefresh class="lab-ptr" threshold={56} settle={180} refreshButton disabled={() => $off}
        onPhase={(p: string) => $phase = p}
        onRefresh={() => new Promise((ok) => setTimeout(ok, 300)).then(() => { $count++ })}
        labels={{ pull: "Çekmeye devam", release: "Bırakın, yenilensin", refreshing: "Yenileniyor…", refresh: "Şimdi yenile" }}
        icon={hourglass}>
        {Array.from({ length: 12 }, (_, i) => <p sx={{ p: 1 }}>{`Öğe ${i + 1}`}</p>)}
      </PullToRefresh>
    </div>
    <div style={{ height: "120px" }}>
      <PullToRefresh class="lab-own" refreshButton={false}
        indicator={(phase: string) => <Icon of={phase === "ready" ? arrowUp : arrowDown} />}>
        <p sx={{ p: 1 }}>Kendi göstergem: çekince oklar</p>
      </PullToRefresh>
    </div>
  </div>
}
