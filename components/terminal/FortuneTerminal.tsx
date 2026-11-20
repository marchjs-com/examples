import { Terminal, ansi } from "march/ui"

// kahve falı terminali: "fal" bir fal açar, "zar 3" üç zar atar; renkler ANSI ile, bekleme çarkı io.spinner ile
const FORTUNES = ["Yakında bir derleme yeşile dönecek", "Bir sinyal seni düşünüyor", "Üç vakte kadar bir PR birleşecek", "Kahvende bir ok işareti: ileri!"]
const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)]!
const wait = (ms: number) => new Promise((ok) => setTimeout(ok, ms))

export function FortuneTerminal() {
  return <Terminal prompt="falcı ☕ " height="14rem" welcome={["[info] fal yaz, fincan kapansın", "zar 3: üç zar at"]} commands={{
    fal: async (_a, io) => {
      const s = io.spinner("fincan soğuyor")
      await wait(500)
      s.done("fincan hazır")
      io.print(ansi.magenta(pick(FORTUNES)), { bold: true })
    },
    zar: { desc: "Zar atar", args: [{ name: "kac", type: "number", default: 1 }], run: (a, io) => {
      const dice = Array.from({ length: Number(a.args["kac"]) }, () => pick(["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]))
      io.print(ansi.yellow(dice.join(" ")))
    } },
  }} />
}
