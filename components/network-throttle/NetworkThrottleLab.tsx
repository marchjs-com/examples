import { signal } from "march"
import { NetworkThrottle } from "march/ui"

// NetworkThrottle'ın bütün özellikleri: scope (yalnız bu kodun çağrıları), value (sinyal) ve onChange, presets (kendi
// ağların), gauge, custom, requests, max, label, class
// bir ağ: bant genişlikleri kb/s (null: limit yok), gecikme ms ya da çevrimdışı
type Net = { offline?: boolean; down?: number | null; up?: number | null; latency?: number }
const PRESETS: { id: string; label: string; profile: Net }[] = [
  { id: "none", label: "Kısıtsız", profile: {} },
  { id: "cafe", label: "Kafe Wi-Fi", profile: { down: 2500, up: 500, latency: 120 } },
  { id: "metro", label: "Metroda", profile: { down: 250, up: 100, latency: 900 } },
  { id: "offline", label: "Çevrimdışı", profile: { offline: true } },
]

export function NetworkThrottleLab() {
  const net = signal({} as Net)
  let $last = "değişiklik yok"
  return <div sx={{ flex: "col", gap: 3 }}>
    <NetworkThrottle class="lab-net" scope={(stack: string) => stack.includes("blob:")} value={net} onChange={(p: Net) => ($last = JSON.stringify(p))}
      presets={PRESETS} gauge custom requests max={6} label="Önizlemenin ağı" />
    <span class="lab-last" sx={{ text: "sm", color: "muted" }}>{() => `Son ağ: ${$last}`}</span>
  </div>
}
