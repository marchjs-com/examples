// NetworkThrottleLab: the full-featured NetworkThrottle example; it uses every prop at least once.
//
// NetworkThrottle is a network-speed panel like the one in browser developer tools: it slows the page's fetch calls
// (latency, download and upload bandwidth, or offline) and shows a speed gauge and a waterfall of the requests it slowed.
// Props shown here: scope (limit it to some code), value (a signal) and onChange, presets (your own networks), gauge,
// custom, requests, max, label and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// NetworkThrottleLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { signal } from "march"
import { NetworkThrottle } from "march/ui"

// A network profile: bandwidths in kb/s (null means no limit), latency in ms, or offline.
type Net = { offline?: boolean; down?: number | null; up?: number | null; latency?: number }
// Our own list of networks: it replaces the built-in ones. Each preset has an id, the chip's label and its profile.
const PRESETS: { id: string; label: string; profile: Net }[] = [
  { id: "none", label: "Kısıtsız", profile: {} },
  { id: "cafe", label: "Kafe Wi-Fi", profile: { down: 2500, up: 500, latency: 120 } },
  { id: "metro", label: "Metroda", profile: { down: 250, up: 100, latency: 900 } },
  { id: "offline", label: "Çevrimdışı", profile: { offline: true } },
]

export function NetworkThrottleLab() {
  // A signal is a value you can pass around and read from outside the component; here it is the two-way `value`
  // of the panel, so other code could read or set the chosen network as well.
  const net = signal({} as Net)
  let $last = "değişiklik yok"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* - class="lab-net": a class on the root (.m-nt) for CSS or tests.
        - scope: a function that gets the call stack of each request and says whether to slow it. Here only calls
          coming from code loaded as a blob: module are slowed, so the rest of the page is left alone. Without a
          scope every request of the page is slowed.
        - value={net}: the network as a signal (two-way). onChange gets the new profile on every choice.
        - presets: our own networks instead of the built-in ones.
        - gauge: the speed gauge (default on). custom: the sliders for your own bandwidth and latency (default on).
          requests: the waterfall of slowed requests (default on); max={6} keeps at most six rows in it.
        - label: the accessible name of the panel. The networks are toggle chips with a pressed state, and the
          sliders have names and spoken values. The gauge needle moves with the motion engine, so reduced motion,
          global speed and "Stop all" apply to it. */}
    <NetworkThrottle class="lab-net" scope={(stack: string) => stack.includes("blob:")} value={net} onChange={(p: Net) => ($last = JSON.stringify(p))}
      presets={PRESETS} gauge custom requests max={6} label="Önizlemenin ağı" />
    {/* Shows the last profile that onChange reported, as JSON text. */}
    <span class="lab-last" sx={{ text: "sm", color: "muted" }}>{() => `Son ağ: ${$last}`}</span>
  </div>
}
