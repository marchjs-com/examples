import { ImageCropper, type CropState } from "march/ui"

// çıkartma yapıcı: gülen yüzü kare kırp, döndür, aynala; altta yuvarlak çıkartma hâlini anlatan satır
// küçük bir satır içi SVG; blob: adresi olarak (data: SVG güvenli sayılmaz, engellenir)
const FACE = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#ffd27a"/><circle cx="50" cy="50" r="34" fill="#f2801f"/><circle cx="38" cy="42" r="5" fill="#13233a"/><circle cx="62" cy="42" r="5" fill="#13233a"/><path d="M34 60q16 14 32 0" stroke="#13233a" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`], { type: "image/svg+xml" }))

export function StickerMaker() {
  let $crop: CropState | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    <ImageCropper src={FACE} alt="Gülen yüz" aspect={1} sliders={["angle"]} hint={false} bind:value={$crop} />
    <span sx={{ text: "sm", color: "muted" }}>
      Çıkartma: {$crop ? `${Math.round($crop.rotate)}° döndü${$crop.flip ? ", aynalandı" : ""}` : "henüz dokunulmadı"}
    </span>
  </div>
}
