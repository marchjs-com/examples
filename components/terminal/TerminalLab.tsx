import { Terminal, Button, ansi, type TerminalApi } from "march/ui"

// Terminal'in bütün özellikleri: komutlar (alt komut, seçenek), istem, karşılama, geçmiş (persist), renk takımı,
// arka plan, imleç, yazı tipi, satır sınırı, yükseklik, ad, yanıp sönme, hazır komutlar, REPL (fallback),
// kendi metinlerin, sınıf, ref; altta yalnız okunur bir kayıt (readonly), üstteki her komutu oraya yazar
const SCHEMES = ["auto", "surface", "dark", "light"] as const

export function TerminalLab() {
  let $scheme = 0
  let log: TerminalApi | undefined
  let term: TerminalApi | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button size="sm" on:click={() => $scheme = ($scheme + 1) % SCHEMES.length}>Takım: {SCHEMES[$scheme]}</Button>
      <Button size="sm" on:click={() => term?.exec("say merhaba")}>say merhaba</Button>
    </div>
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
    <Terminal readonly label="Olay kaydı" height="5rem" scheme="dark" background="#1f1330" welcome="kayıt başladı" ref={(api) => log = api} />
  </div>
}
