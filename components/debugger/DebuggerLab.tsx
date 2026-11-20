import { Debugger, Toggle, createDebugSession, type DebugMeta, type DebuggerSection } from "march/ui"
import { sparkles, star } from "march/icons"

// Debugger'ın bütün özellikleri: oturum, başlat / bitir, satıra git (onReveal), bölümler ve dizilişleri, çıktı satırı,
// başta açık bölümler, zaman çizelgesi, anahtarlar, kendi ikonların ve metinlerin, açık derinlik, sınıf
const META: DebugMeta = { file: "toplam.js", module: ["sum", "list"], fns: [], steps: [[1, 1, -1, "", [], []], [3, 3, -1, "", [], []], [5, 1, -1, "", [], []]] }
type Hooks = { s(f: number, s: number, g: () => (() => unknown)[]): void }
function run() {
  const d = (globalThis as unknown as { __marchDebug: Hooks }).__marchDebug
  d.s(0, 0, () => [() => sum, () => list]); let sum = 0; const list = [{ n: 2 }, { n: 5 }]
  for (const it of list) { d.s(0, 1, () => [() => sum, () => list]); sum += it.n }
  d.s(0, 2, () => [() => sum, () => list]); console.log("toplam", sum)
}
const ALL: DebuggerSection[] = ["watch", "scope", "stack", "breakpoints", "output"]

export function DebuggerLab() {
  const session = createDebugSession({ evaluate: async (expr, scope) => scope[expr], maxSteps: 500 })
  session.setBreakpoint("toplam.js", 3)
  session.addWatch("sum")
  let $runs = 0
  let $stopped = 0
  let $where = "—"
  let $full = true
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3, text: "sm" }}>
      <span>Koşu: {$runs}</span><span>Bitirme: {$stopped}</span><span>Git: {$where}</span>
      <Toggle label="Tam panel" bind:value={$full} />
    </div>
    <Debugger
      session={session}
      onStart={() => { $runs++; session.begin([META]); run() }}
      onStop={() => { $stopped++; session.end() }}
      onReveal={(file, line) => $where = `${file}:${line}`}
      sections={() => $full ? ALL : ["watch", "breakpoints"]}
      layout={[["watch", "scope"], "breakpoints", ["stack", "output"]]}
      outputLines={3}
      open={["watch", "scope", "breakpoints", "output"]}
      timeline={() => $full}
      options={() => $full}
      icons={{ start: sparkles, resume: star, back: false }}
      labels={{ title: "Toplam avı", start: "Koş", restart: "Yeniden koş", resume: "Sürdür", stop: "Bitir", breakpoint: "Durakta durdu", idle: "Beklemede" }}
      depth={1}
      class="lab-dbg"
    />
  </div>
}
