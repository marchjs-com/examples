// ImageCropperLab: the full-featured ImageCropper example; it uses every prop at least once.
//
// Props shown here: src and alt, value (bind:value) and onChange, aspect (a fixed ratio), aspects (your own choices), maxZoom,
// preview and size, api (reset), grid, hint, tools, sliders, labels, class, readonly, disabled and aria-label.
// The controls above the cropper switch a fixed square ratio on and off, reset it through the api and lock it (readonly).
// Use it as a reference when you need one option: find the prop below and copy the line.
// ImageCropperLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ImageCropper, Button, Toggle, type CropState, type ImageCropperApi } from "march/ui"

// A tiny inline SVG, turned into a blob: URL (an SVG given as a data: URL is not treated as safe and is blocked, and the
// cropper needs a source its canvas can read).
const PIC = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80"><rect width="120" height="80" fill="#13233a"/><circle cx="30" cy="24" r="8" fill="#ffd27a"/><path d="M0 80l40-40 30 26 20-14 30 28z" fill="#78be3a"/></svg>`], { type: "image/svg+xml" }))
// labels replaces the built-in texts (any subset works; missing ones fall back to the built-in text).
const LABELS = { cropper: "Kırpma tezgâhı", area: "Kırpılacak alan", hint: "Sürükle, + − ile yaklaş", free: "Serbest", aspect: "Oran", rotateLeft: "Sola çevir", rotateRight: "Sağa çevir", mirror: "Aynala", reset: "Baştan", zoom: "Yakınlık", angle: "Eğim", result: "Sonuç" }

export function ImageCropperLab() {
  // State: the crop (zoom, rotate, flip, position, ratio, frame size), a change counter, the square switch and the lock.
  let $crop: CropState = { zoom: 1.5, rotate: 0, flip: false, x: 0, y: 0, aspect: null, w: 0.8, h: 0.8 }
  let $changes = 0
  let $square = false
  let $locked = false
  // The cropper's methods (toCanvas, toBlob, reset), received through the api prop.
  let api: ImageCropperApi | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Controls: a fixed square ratio on and off, a reset through the api, the lock, and a line that reads the state. */}
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" on:click={() => $square = !$square}>{$square ? "Serbest oran" : "Kare"}</Button>
      <Button size="sm" variant="ghost" on:click={() => api?.reset()}>API ile sıfırla</Button>
      <Toggle label="Kilitle" bind:value={$locked} />
      <span sx={{ text: "sm" }}>dönüş: {$crop.rotate}° · ayna: {$crop.flip ? "evet" : "hayır"} · değişiklik: {$changes}</span>
    </div>
    {/* - src / alt: the image and its description. bind:value: the crop state, two-way. onChange: called on every change.
        - aspect: a fixed ratio (here 1 while the square switch is on); a fixed ratio hides the ratio choices. undefined: free.
        - aspects: our own ratio choices: { label, value }, value null = free.
        - maxZoom: the largest zoom (the default is 4). preview: the live result. size: its "width x height px" caption.
        - api: receives the cropper's methods. grid: the rule-of-thirds grid. hint: the key hint under the area.
        - tools: which buttons to show (a list; true shows all, false none). sliders: which sliders (zoom, angle).
        - labels: our texts. class: a hook for tests and CSS.
        - readonly: shows but cannot change (driven by the lock switch); disabled: everything off. aria-label: the accessible name. */}
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
