import { Stepper } from "march/ui"

// pizza dört adımda: her adımın paneli bir öncekine bulanarak geçer, vurgu adımdan adıma akar; son düğme fırına verir
const STEPS = [{ title: "Hamur" }, { title: "Sos" }, { title: "Peynir" }, { title: "Fırın" }]
const PANELS = ["🍞 İnce hamur açıldı.", "🍅 Domates sosu sürüldü.", "🧀 Bol mozzarella serpildi.", "🔥 250°C, 8 dakika."]

export function PizzaStepper() {
  let $step = 0
  let $baked = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <Stepper steps={STEPS} current={$step} onSelect={(i: number) => { $step = i; $baked = false }} m:color="brand-orange"
      panels={PANELS.map((t) => <p sx={{ text: "lg" }}>{t}</p>)} labels={{ back: "Geri", next: "Sonraki" }} finishLabel="Fırına ver" onFinish={() => $baked = true} />
    <span sx={{ text: "bold", color: "success" }}>{$baked ? "Pizza fırında, afiyet olsun! 🍕" : ""}</span>
  </div>
}
