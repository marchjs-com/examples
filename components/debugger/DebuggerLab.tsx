// DebuggerLab: the full-featured Debugger example; it uses every prop at least once.
//
// Props shown here: session, onStart / onStop, onReveal (go to a line), sections, layout, outputLines, open, timeline,
// options, icons, labels, depth and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DebuggerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Debugger, Toggle, createDebugSession, type DebugMeta, type DebuggerSection } from "march/ui"
import { sparkles, star } from "march/icons"

// Stand-in for what the instrumenter returns: `session.begin([meta])` takes one entry per instrumented file (its name,
// its module-level names and the recorded steps). Here it is written by hand so the example needs no compiler.
const META: DebugMeta = { file: "toplam.js", module: ["sum", "list"], fns: [], steps: [[1, 1, -1, "", [], []], [3, 3, -1, "", [], []], [5, 1, -1, "", [], []]] }
// The debugger's recording hook, the global __marchDebug object that instrumented code calls (the session listens once begin() has run).
type Hooks = { s(f: number, s: number, g: () => (() => unknown)[]): void }
// The program with the debugger's calls written in. In a real IDE the instrumenter adds these one-line calls and keeps
// the line numbers; each d.s(...) call records one step with the names in scope.
function run() {
  const d = (globalThis as unknown as { __marchDebug: Hooks }).__marchDebug
  d.s(0, 0, () => [() => sum, () => list]); let sum = 0; const list = [{ n: 2 }, { n: 5 }]
  for (const it of list) { d.s(0, 1, () => [() => sum, () => list]); sum += it.n }
  d.s(0, 2, () => [() => sum, () => list]); console.log("toplam", sum)
}
// Every section the panel knows.
const ALL: DebuggerSection[] = ["watch", "scope", "stack", "breakpoints", "output"]

// createDebugSession holds the recording, the breakpoints and the watch list. `evaluate` computes a watch expression in
// the scope of the step shown (here a plain lookup); maxSteps limits how many steps are kept.
// The session is created once; breakpoints and watches are set up front here, in a real IDE the user sets them.
export function DebuggerLab() {
  const session = createDebugSession({ evaluate: async (expr, scope) => scope[expr], maxSteps: 500 })
  session.setBreakpoint("toplam.js", 3)
  session.addWatch("sum")
  // Counters and a text for the callbacks: how often Start / Stop were pressed, where onReveal pointed, the toggle.
  let $runs = 0
  let $stopped = 0
  let $where = "—"
  let $full = true
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3, text: "sm" }}>
      <span>Koşu: {$runs}</span><span>Bitirme: {$stopped}</span><span>Git: {$where}</span>
      <Toggle label="Tam panel" bind:value={$full} />
    </div>
    {/* The Debugger:
            - session: the DebugSession it shows and controls.
            - onStart: the Start / Restart button (F5), there is no button without it; the host starts the session and
              runs the program. onStop: Stop (Shift+F5). onReveal(file, line): called when a frame, a breakpoint or an
              output line is pressed, so the host can open the editor there.
            - sections as a getter: which sections show (reactive; the toggle switches between all and two).
            - layout: the rows; two names in an array sit side by side with a divider to drag.
            - outputLines: the height of the output box in lines; open: the sections that start open.
            - timeline / options: the recording's timeline and the switches (pause on exceptions, stop on entry…), here
              shown only in the full panel.
            - icons: your own icon per button; false leaves the text only (the tooltip stays).
            - labels: every text, so the panel can speak your language; depth: how deep a value opens at first. */}
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
