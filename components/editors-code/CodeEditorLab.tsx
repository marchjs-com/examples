import { CodeEditor, Card, Badge, Button } from "march/ui"
import type { CodeCompleteContext, CodeMark } from "march/ui"

// CodeEditor'ün bütün özellikleri: dil, öneriler (complete, describe, signature, sources, suggest, listOn, listAfter,
// source), işaretler, alt satır (message, onMessage, status, hint, kısayollar, kopyala), goTo, tuşlar, girinti, kaydet,
// tek satır, parlama, satır numaraları ve işaretleri, etkin satır, renkler ve yardımlar, katlama, satır içi ipuçları,
// yazı boyutu, tanım / ad değiştirme / biçimlendirme / düzeltme / başvurular / üzerine gelme, geçmiş, sınıf
const START = `const total = add(1, 2)\nfunction add(a, b) {\n  return a + b\n}\nconsole.log(total)`
const NAMES = [
  { label: "add", hint: "işlev", source: "file", doc: { kind: "function", signature: "add(a, b)", doc: "İki sayıyı toplar" } },
  { label: "total", hint: "sabit", source: "file" },
  { label: "console", hint: "nesne", source: "js" },
]
const complete = (ctx: CodeCompleteContext) => {
  const w = /\w*$/.exec(ctx.before)?.[0] ?? ""
  return { from: ctx.caret - w.length, items: NAMES.filter((n) => n.label.startsWith(w)) }
}
// imleçteki kelime ve metindeki bütün yerleri
const wordRange = (value: string, at: number) => {
  let a = at, b = at
  while (a > 0 && /\w/.test(value[a - 1]!)) a--
  while (b < value.length && /\w/.test(value[b]!)) b++
  return { from: a, to: b, word: value.slice(a, b) }
}
const places = (value: string, word: string) => (word ? [...value.matchAll(new RegExp(`\\b${word}\\b`, "g"))].map((m) => ({ from: m.index!, to: m.index! + word.length })) : [])

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
      <Button size="sm" variant="secondary" on:click={() => $goTo = { from: 33, to: 36 }}>add tanımına git</Button>
      <Button size="sm" variant="secondary" on:click={() => $active = $active === 3 ? 2 : 3}>{`Etkin satır: ${$active}`}</Button>
      <Button size="sm" variant="secondary" on:click={() => $marks = [{ from: 0, to: 5, kind: "flash" }]}>Parlat</Button>
      <Badge tone="neutral">{`${$saves} kayıt · ${$log}`}</Badge>
    </div>
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
    <Card m:theme="night">
      <CodeEditor value="npm run build" lang="sh" label="Tek satır" multiline={false} keys={false} message={false} copy={false}
        shortcuts={false} flash={false} palette="theme" bracketColors={false} matchBrackets={false} guides={false} currentLine={false}
        occurrences={false} autoClose={false} linkedTags={false} multiCursor={false} stickyScroll={false} folding={false}
        pasteIndent={false} colorOf={false} history={false} status={false} readonly />
    </Card>
  </div>
}
