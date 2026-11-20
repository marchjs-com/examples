import { TimeRuler, Button } from "march/ui"

// bir yumurta zamanlayıcısı: cetveli sürükleyerek pişme süresini seç (dakikaya yapışır), etiketler dakika yazar
const MIN = 60_000

export function EggTimer() {
  let $at = 6 * MIN
  const egg = () => $at <= 4 * MIN ? "rafadan 🥚" : $at <= 7 * MIN ? "kayısı 🍳" : "katı 🥚"
  return <div sx={{ flex: "col", gap: 2 }}>
    <TimeRuler duration={12 * MIN} value={() => $at} onSeek={(ms: number) => $at = ms} major={2 * MIN} step={MIN}
      format={(ms: number) => `${ms / MIN} dk`} valueText={(ms: number) => `${Math.round(ms / MIN)} dakika`}
      snap={(ms: number) => Math.round(ms / MIN) * MIN} m:color="brand-orange" labels={{ ruler: "Pişme süresi", playhead: "Süre" }} />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <span sx={{ text: "bold" }}>{() => `${$at / MIN} dakika: ${egg()}`}</span>
      <Button size="sm" on:click={() => $at = 6 * MIN}>Sıfırla</Button>
    </div>
  </div>
}
