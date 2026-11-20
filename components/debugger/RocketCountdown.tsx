import { Debugger, createDebugSession, type DebugMeta, CodeView } from "march/ui"

// roket geri sayımı: dört satırlık bir program, 3. satırda kesme noktası; Başlat'a bas, Devam ile her turda n azalır
const SOURCE = `let n = 3
while (n > 0) {
  n--
}
console.log("kalkış!")`
const META: DebugMeta = { file: "roket.js", module: ["n"], fns: [], steps: [[1, 1, -1, "", [], []], [3, 3, -1, "", [], []], [5, 1, -1, "", [], []]] }
type Hooks = { s(f: number, s: number, g: () => (() => unknown)[]): void }

// programın hata ayıklayıcı çağrıları yazılmış hâli (derleyicinin instrument.js'i bunu kendisi yazar)
function run() {
  const d = (globalThis as unknown as { __marchDebug: Hooks }).__marchDebug
  d.s(0, 0, () => [() => n]); let n = 3
  while (n > 0) { d.s(0, 1, () => [() => n]); n-- }
  d.s(0, 2, () => [() => n]); console.log("kalkış!")
}

export function RocketCountdown() {
  const session = createDebugSession({ evaluate: async (expr, scope) => scope[expr] })
  session.setBreakpoint("roket.js", 3)
  session.addWatch("n")
  return <div sx={{ flex: "col", gap: 2 }}>
    <CodeView code={SOURCE} lang="ts" lineNumbers toolbar={false} />
    <Debugger session={session} sections={["watch", "output"]} timeline={false} options={false} onStart={() => { session.begin([META]); run() }} />
  </div>
}
