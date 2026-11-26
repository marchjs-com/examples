// FortuneTerminal: the creative-minimal Terminal example.
//
// What it shows: a coffee-cup fortune teller in a terminal. "fal" shows a spinner while the cup "cools", then prints a
// random fortune in magenta; "zar 3" rolls three dice and prints them in yellow.
// When to use this pattern: a tiny interactive command line for a demo or a playground. `commands` maps a name to a
// function (the shortest form) or to a spec ({ desc, args, run }) when you want a description, typed arguments and
// defaults. Colours come from `ansi`, and `io.spinner` shows that something is running.
//
// Animation: the spinner (and the cursor blink) run on March's motion engine, so the global speed, "Stop all" and the
// visitor's reduced-motion preference apply; the cursor blink can be turned off with `blink={false}`.
// Accessibility: the output is a role="log" live region (new lines are read politely), the command input is labelled
// (labels.command) and everything works from the keyboard: ↑ ↓ history, Tab completion, Ctrl+C aborts a running command.
// The terminal is always left-to-right (dir="ltr"), as command lines are, also in an RTL page.
import { Terminal, ansi } from "march/ui"

// The fortunes, a helper that picks a random item, and a helper that waits (to fake some work for the spinner).
const FORTUNES = ["Yakında bir derleme yeşile dönecek", "Bir sinyal seni düşünüyor", "Üç vakte kadar bir PR birleşecek", "Kahvende bir ok işareti: ileri!"]
const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)]!
const wait = (ms: number) => new Promise((ok) => setTimeout(ok, ms))

export function FortuneTerminal() {
  // prompt: the text before the cursor. height: the box height (any CSS length). welcome: lines printed first; a
  // "[info]" tag colours a line as information. commands: the command table, explained below.
  return <Terminal prompt="falcı ☕ " height="14rem" welcome={["[info] fal yaz, fincan kapansın", "zar 3: üç zar at"]} commands={{
    // A command as a plain function: it gets the parsed arguments and `io`, the output helpers. Handlers may be async.
    // io.spinner shows a spinner line until `done` is called; io.print writes a line, here in magenta and bold.
    fal: async (_a, io) => {
      const s = io.spinner("fincan soğuyor")
      await wait(500)
      s.done("fincan hazır")
      io.print(ansi.magenta(pick(FORTUNES)), { bold: true })
    },
    // A command as a spec: desc is its description (shown by the built-in help), args declares a typed argument (here a
    // number that defaults to 1), and run does the work. a.args holds the parsed values by name.
    zar: { desc: "Zar atar", args: [{ name: "kac", type: "number", default: 1 }], run: (a, io) => {
      const dice = Array.from({ length: Number(a.args["kac"]) }, () => pick(["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]))
      io.print(ansi.yellow(dice.join(" ")))
    } },
  }} />
}
