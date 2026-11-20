import { ImageCropper, Button, Toggle, type CropState, type ImageCropperApi } from "march/ui"

// ImageCropper'ın bütün özellikleri: görsel ve açıklaması, değer (bind:value) ve onChange, kendi oran seçeneklerin,
// en çok yakınlaştırma, önizleme ve boyut yazısı, API (sıfırla), ızgara, ipucu, seçili düğmeler ve kaydırıcılar,
// kendi metinlerin, sınıf, salt okunur, devre dışı ve erişilebilir ad; "Kare" düğmesi sabit oranı (aspect) açar
// küçük bir satır içi SVG; blob: adresi olarak (data: SVG güvenli sayılmaz, engellenir)
const PIC = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"><rect width="120" height="80" fill="#13233a"/><circle cx="30" cy="24" r="8" fill="#ffd27a"/><path d="M0 80l40-40 30 26 20-14 30 28z" fill="#78be3a"/></svg>`], { type: "image/svg+xml" }))
const LABELS = { cropper: "Kırpma tezgâhı", area: "Kırpılacak alan", hint: "Sürükle, + − ile yaklaş", free: "Serbest", aspect: "Oran", rotateLeft: "Sola çevir", rotateRight: "Sağa çevir", mirror: "Aynala", reset: "Baştan", zoom: "Yakınlık", angle: "Eğim", result: "Sonuç" }

export function ImageCropperLab() {
  let $crop: CropState = { zoom: 1.5, rotate: 0, flip: false, x: 0, y: 0, aspect: null, w: 0.8, h: 0.8 }
  let $changes = 0
  let $square = false
  let $locked = false
  let api: ImageCropperApi | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" on:click={() => $square = !$square}>{$square ? "Serbest oran" : "Kare"}</Button>
      <Button size="sm" variant="ghost" on:click={() => api?.reset()}>API ile sıfırla</Button>
      <Toggle label="Kilitle" bind:value={$locked} />
      <span sx={{ text: "sm" }}>dönüş: {$crop.rotate}° · ayna: {$crop.flip ? "evet" : "hayır"} · değişiklik: {$changes}</span>
    </div>
    <ImageCropper
      src={PIC}
      alt="Dağ ve ay"
      bind:value={$crop}
      onChange={() => $changes++}
      aspect={$square ? 1 : undefined}
      aspects={[{ label: "Serbest", value: null }, { label: "2:1", value: 2 }]}
      maxZoom={3}
      preview
      size
      api={(a) => api = a}
      grid
      hint
      tools={["rotateLeft", "rotateRight", "mirror", "reset"]}
      sliders={["zoom", "angle"]}
      labels={LABELS}
      class="lab-crop"
      readonly={$locked}
      disabled={false}
      aria-label="Kapak kırpıcı"
    />
  </div>
}
