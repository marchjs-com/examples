// DiscountDebug: the real-life Debugger example.
//
// What it shows: why did the discount code not work? Click a line number to set a breakpoint, press Start and step
// through the code watching `rate`. The code is "hadi10" in lower case, so the comparison fails and `rate` stays 0.
// When to use this pattern: an editor next to a Debugger, linked by the session: the editor's gutter toggles
// breakpoints, and the line where the program stopped is highlighted.
// Keyboard: the panel's buttons carry their keys (Continue F8, Step over F10, Step into F11, Stop Shift+F5, Start F5).
import { Debugger, CodeEditor, createDebugSession, type DebugMeta } from "march/ui"

// The source shown in the editor. Line numbers matter: breakpoints and steps refer to them.
const FILE = "sepet.js"
const SOURCE = `function discount(price, code) {
  let rate = 0
  if (code === "HADI10") rate = 0.1
  return price * (1 - rate)
}
const final = discount(200, "hadi10")
console.log("ödenecek", final)`
// Stand-in for what the instrumenter returns (session.begin takes it): the file name, its module names, its
// functions and the recorded steps. Written by hand here so the example runs without a compiler.
const META: DebugMeta = { file: FILE, module: ["discount", "final"], fns: [["discount", 1]], steps: [
  [6, 1, -1, "", [], []], [2, 3, 0, "", ["rate", "price", "code"], []], [3, 3, 0, "", ["rate", "price", "code"], []],
  [4, 3, 0, "", ["rate", "price", "code"], []], [7, 1, -1, "", [], []],
] }
// The debugger's recording hooks, the global __marchDebug object that instrumented code calls (the session listens once begin() has run).
type Hooks = { s(f: number, s: number, g: () => (() => unknown)[]): void; e(f: number, n: number): number; x(at: number): void; t(e: unknown, at: number): unknown }

// The program with the debugger's calls written in by hand (the instrumenter of the IDE does this itself and keeps the
// line numbers). Each d.s(...) call records a step with the names in scope; d.e / d.x mark entering and leaving a
// function.
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

// The session ties editor and panel together. A breakpoint on line 4 and two watch expressions (`rate`, `code`) are
// set up front; `evaluate` computes a watch expression from the scope of the step shown.
export function DiscountDebug() {
  const session = createDebugSession({ evaluate: async (expr, scope) => scope[expr] })
  session.setBreakpoint(FILE, 4)
  session.addWatch("rate")
  session.addWatch("code")
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* A read-only CodeEditor: lineMarks draws the session's breakpoints in the gutter, activeLine highlights the line
            where the program is paused, and onGutter (a click on a line number) toggles a breakpoint in the session. */}
    <CodeEditor lineNumbers readonly value={SOURCE} label={FILE} copy={false}
      lineMarks={() => session.breakpoints().map((b) => ({ line: b.line, kind: b.enabled ? "breakpoint" : "off" }))}
      activeLine={() => session.litLine(FILE)} onGutter={(line: number) => session.toggleBreakpoint(FILE, line)} />
    {/* onStart begins a session with the recording data and runs the program. depth={1} opens values one level at first. */}
    <Debugger session={session} depth={1} onStart={() => { session.begin([META]); run() }} />
  </div>
}
