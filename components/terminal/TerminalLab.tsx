// TerminalLab: the full-featured Terminal example.
//
// What it shows: the Terminal options together: commands (with a sub-command and an option), prompt, welcome, history
// (persist), colour scheme, background, cursor, font, line limit, height, label, blink, built-in commands, a REPL-style
// fallback, your own texts (labels), class and ref. Below it a second, read-only terminal works as a log: every command of
// the first one writes a line there. Two buttons switch the colour scheme and run a command from code.
// Use it as a catalogue: copy the prop you need.
//
// Animation: the cursor blink runs on March's motion engine, so the global speed, "Stop all" and the visitor's
// reduced-motion preference apply; `blink={false}` keeps the cursor lit. Output has no other motion here.
// Accessibility: the output is a role="log" live region named by `label`, the command input is named by labels.command, and
// everything works from the keyboard: ↑ ↓ history, Ctrl+R history search, Tab completion, Ctrl+C aborts a running command,
// Ctrl+L clears. The terminal is always left-to-right (dir="ltr"), as command lines are, also in an RTL page.
import { Terminal, Button, ansi, type TerminalApi } from "march/ui"

// The colour schemes to cycle through: "auto" (a dark charcoal tinted by the theme), "surface" (the page's surfaces), "dark"
// and "light".
const SCHEMES = ["auto", "surface", "dark", "light"] as const

export function TerminalLab() {
  // Reactive state: the index of the current scheme. `log` and `term` are the APIs of the two terminals, received through
  // `ref` (they are not reactive, just handles to call methods on).
  let $scheme = 0
  let log: TerminalApi | undefined
  let term: TerminalApi | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The first button changes the scheme (a live prop). The second runs a command from code with the API's exec(). */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $scheme = ($scheme + 1) % SCHEMES.length}>Takım: {SCHEMES[$scheme]}</Button>
      <Button size="sm" on:click={() => term?.exec("say merhaba")}>say merhaba</Button>
    </div>
    {/* The first Terminal. commands: a name maps to a function or a spec. "say" has a rest argument (everything after the
        name), an option (--loud or -l) and writes a copy of its text to the log terminal; "math" has a sub-command with two
        typed arguments. prompt: the text before the cursor (a function, so it is live). welcome: lines printed first.
        persist: keep the command history in localStorage under this name. scheme: the colour scheme (live). background: any
        CSS colour, left undefined here so the scheme decides. cursor: "bar", "block" or "underline". font: the font family.
        maxLines: the oldest lines are dropped past this. height: the box height. label: the accessible name of the output
        log. blink: the cursor blinks. builtins: the built-in help, clear and history commands stay available. fallback: a
        line that names no command comes here instead of "command not found" (here it evaluates a tiny sum). labels: our own
        texts: the input's accessible name, the Ctrl+R prompt and the "command not found" line. class goes on the root. ref
        receives the API (exec, print, clear, register, history, focus, cancel). */}
    <Terminal
      commands={{
        say: { desc: "Yazdığını söyler", args: [{ name: "text", rest: true }], options: { loud: { alias: "l", desc: "büyük harf" } },
          run: (a, io) => { const t = String(a.args["text"] ?? ""); io.print(a.options["loud"] ? ansi.bold(t.toUpperCase()) : t); log?.print(`say ${t}`) } },
        math: { desc: "Hesap", sub: { add: { args: [{ name: "a", type: "number" }, { name: "b", type: "number" }], run: (a, io) => io.success(String(Number(a.args["a"]) + Number(a.args["b"]))) } } },
      }}
      prompt={() => `${SCHEMES[$scheme]}$ `}
      welcome={["[info] say, math add 2 3; komut olmayan satır hesaplanır: 6*7"]}
      persist="lab"
      scheme={() => SCHEMES[$scheme]}
      background={undefined}
      cursor="block"
      font="ui-monospace, monospace"
      maxLines={200}
      height="12rem"
      label="Laboratuvar çıktısı"
      blink
      builtins
      fallback={(line, io) => { const m = /^(\d+)\s*([+*-])\s*(\d+)$/.exec(line); if (!m) { io.error(`anlaşılmadı: ${line}`); return } const [a, b] = [Number(m[1]), Number(m[3])]; io.info(`= ${m[2] === "+" ? a + b : m[2] === "*" ? a * b : a - b}`) }}
      labels={{ command: "Komut satırı", historySearch: "geçmişte ara", notFound: (n) => `${n}? yok` }}
      class="lab-term"
      ref={(api) => term = api}
    />
    {/* A read-only terminal: no prompt and no input, a log that the app writes to with print(). scheme="dark" and
        background set its look; its API is kept in `log` so the first terminal's commands can write here. */}
    <Terminal readonly label="Olay kaydı" height="5rem" scheme="dark" background="#1f1330" welcome="kayıt başladı" ref={(api) => log = api} />
  </div>
}
