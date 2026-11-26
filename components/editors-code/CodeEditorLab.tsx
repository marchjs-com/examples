// CodeEditorLab: the full-featured CodeEditor example; it uses (nearly) every prop at least once.
//
// Props shown here: lang, suggestions (complete, describe, signature, sources, suggest, listOn, listAfter, source),
// marks, the foot line (message, onMessage, status, hint, shortcuts, copy), goTo, keys, tabSize, onSave, multiline, flash,
// line numbers and marks, activeLine, palette and the editor helpers (bracket colours, matching, guides, current line,
// occurrences, auto close, linked tags, multi cursor, sticky scroll, folding, paste indent), inlays, colorOf,
// fontSize, definition / rename / format / fixes / references / hover, history and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CodeEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
// Note: CodeEditor does not run or compile anything; the owner reads `value` and decides what it means.
import { CodeEditor, Card, Badge, Button } from "march/ui"
import type { CodeCompleteContext, CodeMark } from "march/ui"

// The starting code (a small function and a call), written as one string with \n line breaks.
const START = `const total = add(1, 2)\nfunction add(a, b) {\n  return a + b\n}\nconsole.log(total)`
// The names offered as suggestions. A row is { label, hint?, source?, doc? }: `hint` is the small text beside the row,
// `source` is what the source chips filter by, `doc` is the definition shown under the picked row.
const NAMES = [
  { label: "add", hint: "işlev", source: "file", doc: { kind: "function", signature: "add(a, b)", doc: "İki sayıyı toplar" } },
  { label: "total", hint: "sabit", source: "file" },
  { label: "console", hint: "nesne", source: "js" },
]
// `complete(ctx)` is asked for suggestions at the caret. ctx has the value, the caret position and `before` (the text
// before the caret). It returns { from, items }: the rows, and where the text a picked row replaces starts. Here the
// word before the caret is matched against NAMES.
const complete = (ctx: CodeCompleteContext) => {
  const w = /\w*$/.exec(ctx.before)?.[0] ?? ""
  return { from: ctx.caret - w.length, items: NAMES.filter((n) => n.label.startsWith(w)) }
}
// Finds the word at a position: where it starts and ends, and the word itself (used by definition, rename, hover).
const wordRange = (value: string, at: number) => {
  let a = at, b = at
  while (a > 0 && /\w/.test(value[a - 1]!)) a--
  while (b < value.length && /\w/.test(value[b]!)) b++
  return { from: a, to: b, word: value.slice(a, b) }
}
// All places a word is written in the text, as { from, to } ranges (used by rename and references).
const places = (value: string, word: string) => (word ? [...value.matchAll(new RegExp(`\\b${word}\\b`, "g"))].map((m) => ({ from: m.index!, to: m.index! + word.length })) : [])

// The signals the CodeEditor reads through getters: marks, goTo, the active line, the chosen source chip and the font
// size, plus a log and a save counter for the callbacks.
export function CodeEditorLab() {
  let $code = START
  let $marks: CodeMark[] = [{ from: 6, to: 11, kind: "warning", title: "total yalnız bir kez kullanılıyor" }]
  let $goTo: { from: number; to?: number } | null = null
  let $active = 3
  let $chip = "file"
  let $size: number | undefined = undefined
  let $log = "hazır"
  let $saves = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* Buttons that drive the editor from outside: goTo puts the caret on a range, activeLine lights a line, marks flashes a range. */}
      <Button size="sm" variant="secondary" on:click={() => $goTo = { from: 33, to: 36 }}>add tanımına git</Button>
      <Button size="sm" variant="secondary" on:click={() => $active = $active === 3 ? 2 : 3}>{`Etkin satır: ${$active}`}</Button>
      <Button size="sm" variant="secondary" on:click={() => $marks = [{ from: 0, to: 5, kind: "flash" }]}>Parlat</Button>
      <Badge tone="neutral">{`${$saves} kayıt · ${$log}`}</Badge>
    </div>
    {/* The big CodeEditor. Props by group:
            - value + onChange: the code (a plain getter, one-way here); lang: colours for the language (js / ts / jsx / tsx,
              css, html, json, sh); label: the accessible name of the text field; class: a class on the root.
            - Suggestions: complete (the rows at the caret); describe(row): the definition shown under the picked row (a row's
              own `doc` comes first); suggest="ghost": the likeliest row is written faintly after the caret and Tab takes it;
              listOn="." opens the list on a dot even in ghost mode; listAfter={2}: or once the word is two letters long;
              sources + source + onSourceChange: chips under the list that filter rows by their `source` (the owner keeps
              the choice); suggestionsLabel: accessible name of the list.
            - signature: inside the parentheses of a call, shows the parameters and lights the one being written.
            - marks: ranges to mark (a flash glows once; error and warning kinds underline), flash="glow" is how a flash shows.
            - goTo: puts the caret (or a selection) on a range, focused and in view; pass a new object each time.
            - The foot line: message (text or a getter; false: no foot bar), onMessage (makes the message a button), status
              (the dot before it), hint (your own node at its end), shortcuts + moreShortcuts + shortcutsLabel (a menu listing
              every key, plus your app's keys), copy + copyLabel (the copy button).
            - keys: turn single IDE keys on or off (comment, move lines up / down...); tabSize: spaces per indent; onSave:
              Ctrl+S (the browser's "save page" does not open); multiline: false would stop Enter from adding a line.
            - onBlur: focus left the field; inputRef: gives you the textarea itself.
            - Gutter: lineNumbers; lineMarks: marks beside the numbers (a breakpoint dot here); activeLine: a lit line (a
              debugger's paused line); onGutter: a press on the gutter or F9 at the caret's line.
            - palette: "ide" colours from the theme's category colours (or "theme" for the CodeView colours); the helpers
              bracketColors, matchBrackets, guides, currentLine, occurrences, autoClose, pasteIndent are on by default and
              are listed so you can switch each off. linkedTags, multiCursor, stickyScroll and folding are the same kind of
              switch (see the editor's props for their keys).
            - inlays: faint hints at the end of a line; colorOf: which colour a text names (a line of that colour under it).
            - fontSize + onFontSizeChange: Ctrl + = / Ctrl + - / Ctrl + 0 change it, the owner keeps the value; lineHeight.
            - definition (F12 or Ctrl + click), rename (F2), format (Shift + Alt + F), fixes (Ctrl + .), references and
              hover: you answer with ranges or documentation; the editor does not analyse the code itself.
            - history: the editor's own undo; key keeps it in the browser session, limit is the number of steps. */}
    <CodeEditor value={$code} onChange={(v) => $code = v} lang="js" class="lab-code" label="Örnek kod"
      complete={complete} describe={(item) => item.doc ?? { kind: item.hint }} suggest="ghost" listOn="." listAfter={2}
      signature={({ value, caret }) => (/add\([^)]*$/.test(value.slice(0, caret))
        ? { items: [{ prefix: "add(", params: [{ label: "a" }, { label: "b" }], separator: ", ", suffix: ")" }], active: 0, arg: 0, start: value.lastIndexOf("add(", caret) + 4 }
        : null)}
      sources={[{ value: "file", label: "Dosya" }, { value: "all", label: "Tümü" }]} source={() => $chip} onSourceChange={(v) => $chip = v}
      suggestionsLabel="Öneriler" marks={() => $marks} goTo={() => $goTo}
      message={() => `Satır sayısı: ${$code.split("\n").length}`} onMessage={() => $log = "mesaja basıldı"} status="ok"
      hint={<span class="lab-hint">F12 · F2</span>} keys={{ comment: true, moveUp: true, moveDown: true }} tabSize={4}
      onSave={() => $saves++} shortcuts moreShortcuts={[{ keys: "F5", label: "Çalıştır", group: "Lab" }]} shortcutsLabel="Tuşlar"
      copy copyLabel="Kopyala" multiline flash="glow" onBlur={() => $log = "odak çıktı"} inputRef={(el) => el.setAttribute("data-lab", "input")}
      lineNumbers lineMarks={[{ line: 2, kind: "breakpoint", title: "Dur" }]} activeLine={() => ({ line: $active, kind: "current" })}
      onGutter={(line) => $log = `oluk: ${line}`}
      palette="ide" bracketColors matchBrackets guides currentLine occurrences autoClose linkedTags multiCursor stickyScroll folding pasteIndent
      inlays={[{ at: 23, text: " // 3" }]} colorOf={(text) => (text === "red" ? "#e5484d" : null)}
      fontSize={() => $size} onFontSizeChange={(px) => $size = px} lineHeight={1.6}
      definition={({ value, at }) => { const w = wordRange(value, at).word; const i = value.indexOf(`function ${w}`); return w && i >= 0 ? { from: i + 9, to: i + 9 + w.length } : null }}
      rename={({ value, at }) => { const r = wordRange(value, at); return r.word ? { from: r.from, to: r.to, locations: places(value, r.word) } : { error: "Burada ad yok" } }}
      format={(value) => (value.includes("\t") ? [{ from: 0, to: value.length, text: value.replaceAll("\t", "  ") }] : [])}
      fixes={() => [{ title: "Uyarıyı kaldır", edits: [] }]}
      references={({ value, at }) => places(value, wordRange(value, at).word)}
      history={{ key: "lab-code", limit: 50 }}
      hover={({ value, at }) => (wordRange(value, at).word === "add" ? { kind: "function", signature: "add(a, b)" } : null)} />
    {/* A one-line read-only copy on a dark card (m:theme="night" draws this subtree in the dark theme). Every helper is
            switched off (false), multiline={false} keeps Enter from adding lines, and message={false} leaves out the foot bar. */}
    <Card m:theme="night">
      <CodeEditor value="npm run build" lang="sh" label="Tek satır" multiline={false} keys={false} message={false} copy={false}
        shortcuts={false} flash={false} palette="theme" bracketColors={false} matchBrackets={false} guides={false} currentLine={false}
        occurrences={false} autoClose={false} linkedTags={false} multiCursor={false} stickyScroll={false} folding={false}
        pasteIndent={false} colorOf={false} history={false} status={false} readonly />
    </Card>
  </div>
}
