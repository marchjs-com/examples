import { Debugger, CodeEditor, createDebugSession, type DebugMeta } from "march/ui"

// indirim kodu neden işlemedi? Satır numarasına tıkla (kesme noktası), Başlat'a bas, adım adım rate'i izle
const FILE = "sepet.js"
const SOURCE = `function discount(price, code) {
  let rate = 0
  if (code === "HADI10") rate = 0.1
  return price * (1 - rate)
}
const final = discount(200, "hadi10")
console.log("ödenecek", final)`
const META: DebugMeta = { file: FILE, module: ["discount", "final"], fns: [["discount", 1]], steps: [
  [6, 1, -1, "", [], []], [2, 3, 0, "", ["rate", "price", "code"], []], [3, 3, 0, "", ["rate", "price", "code"], []],
  [4, 3, 0, "", ["rate", "price", "code"], []], [7, 1, -1, "", [], []],
] }
type Hooks = { s(f: number, s: number, g: () => (() => unknown)[]): void; e(f: number, n: number): number; x(at: number): void; t(e: unknown, at: number): unknown }

// programın hata ayıklayıcı çağrıları yazılmış hâli (derleyicinin instrument.js'i bunu kendisi yazar)
function run() {
  const d = (globalThis as unknown as { __marchDebug: Hooks }).__marchDebug
  function discount(price: number, code: string) {
    const f = d.e(0, 0)
    try {
      d.s(0, 1, () => [() => rate, () => price, () => code, () => discount, () => final]); let rate = 0
      d.s(0, 2, () => [() => rate, () => price, () => code, () => discount, () => final]); if (code === "HADI10") rate = 0.1
      d.s(0, 3, () => [() => rate, () => price, () => code, () => discount, () => final]); return price * (1 - rate)
    } catch (e) { throw d.t(e, f) } finally { d.x(f) }
  }
  d.s(0, 0, () => [() => discount, () => final]); const final = discount(200, "hadi10")
  d.s(0, 4, () => [() => discount, () => final]); console.log("ödenecek", final)
}

export function DiscountDebug() {
  const session = createDebugSession({ evaluate: async (expr, scope) => scope[expr] })
  session.setBreakpoint(FILE, 4)
  session.addWatch("rate")
  session.addWatch("code")
  return <div sx={{ flex: "col", gap: 2 }}>
    <CodeEditor lineNumbers readonly value={SOURCE} label={FILE} copy={false}
      lineMarks={() => session.breakpoints().map((b) => ({ line: b.line, kind: b.enabled ? "breakpoint" : "off" }))}
      activeLine={() => session.litLine(FILE)} onGutter={(line: number) => session.toggleBreakpoint(FILE, line)} />
    <Debugger session={session} depth={1} onStart={() => { session.begin([META]); run() }} />
  </div>
}
