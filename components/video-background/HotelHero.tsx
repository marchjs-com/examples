import { VideoBackground } from "march/landing"
import { Button, toast } from "march/ui"
import { calendar } from "march/icons"

// bir butik otelin açılış bölümü: arkada sessiz deniz videosu, önde başlık ve rezervasyon düğmesi;
// veri tasarrufunda yalnız afiş görünür, köşedeki düğme videoyu durdurur
export function HotelHero() {
  return <VideoBackground src="/media/hadi-waves.webm" poster="/media/hadi-waves.jpg" tint="dark" tintOpacity={0.5} position="50% 40%"
    labels={{ play: "Videoyu oynat", pause: "Videoyu durdur" }}>
    <div sx={{ flex: "col", gap: 3, p: 8 }} style={{ color: "#fff" }}>
      <span sx={{ text: "sm" }}>BOZCAADA · 12 ODA</span>
      <strong sx={{ text: "2xl" }}>Denize sıfır, kalabalıktan uzak</strong>
      <span>Kahvaltı bağdan, akşam yemeği iskelede.</span>
      <Button icon={calendar} on:click={() => toast("Uygun tarihler gösteriliyor")}>Tarih seç</Button>
    </div>
  </VideoBackground>
}
