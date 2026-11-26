// RocketCountdown: the creative-minimal Debugger example.
//
// What it shows: a rocket countdown. A five-line program with a breakpoint on line 3; press Start and then Continue:
// every time round the loop `n` goes down by one and the watch list shows it.
// When to use this pattern: teaching or demos where a small program should be stepped through next to its code.
// It is trimmed down: two sections, no timeline and no option switches.
import { Debugger, createDebugSession, type DebugMeta, CodeView } from "march/ui"

// The program that is shown. The debugger works on the recording below, which uses the same line numbers.
const SOURCE = `let n = 3
while (n > 0) {
  n--
}
console.log("kalkış!")`
// Stand-in for what the instrumenter returns (see DiscountDebug); written by hand so the example runs without a compiler.
const META: DebugMeta = { file: "roket.js", module: ["n"], fns: [], steps: [[1, 1, -1, "", [], []], [3, 3, -1, "", [], []], [5, 1, -1, "", [], []]] }
// The debugger's recording hook, the global __marchDebug object that instrumented code calls (the session listens once begin() has run).
type Hooks = { s(f: number, s: number, g: () => (() => unknown)[]): void }

// The program with the debugger's calls written in by hand; each d.s(...) call records one step with the names in scope.
function run() {
  const d = (globalThis as unknown as { __marchDebug: Hooks }).__marchDebug
  d.s(0, 0, () => [() => n]); let n = 3
  while (n > 0) { d.s(0, 1, () => [() => n]); n-- }
  d.s(0, 2, () => [() => n]); console.log("kalkış!")
}

// A session with one breakpoint (line 3, inside the loop) and one watch expression, `n`.
export function RocketCountdown() {
  const session = createDebugSession({ evaluate: async (expr, scope) => scope[expr] })
  session.setBreakpoint("roket.js", 3)
  session.addWatch("n")
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* CodeView shows the source (read-only, with line numbers; toolbar={false} hides its buttons). */}
    <CodeView code={SOURCE} lang="ts" lineNumbers toolbar={false} />
    {/* sections={["watch", "output"]} keeps the panel small; timeline={false} and options={false} hide the timeline and
            the switches. onStart begins the session and runs the program. */}
    <Debugger session={session} sections={["watch", "output"]} timeline={false} options={false} onStart={() => { session.begin([META]); run() }} />
  </div>
}
