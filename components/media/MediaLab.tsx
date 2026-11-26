// MediaLab: the full-featured Media example; it uses every prop at least once.
//
// Props shown here: src (a string, a function, or null), kind (image, video, audio or auto), alt, poster, controls, autoplay,
// loop, muted, size (sm or md), fallback (text or a node) and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// MediaLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Accessibility: an image takes `alt` (empty means decorative); video and audio keep native controls; a failed load is
// announced as a status message. Images load lazily.
import { Media, Card, Button } from "march/ui"

// A small layout helper: a muted caption above whatever is passed as children. It only keeps the demo cases below
// labelled; it is not part of Media.
const Cell = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function MediaLab() {
  // The current file of the last case, a signal that the button switches between a picture and a video.
  let $src = "/media/dusk.jpg"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      {/* A video with the defaults: kind="auto" works out "video" from the .webm extension, controls are on, and it
          neither loops nor autoplays. poster is the picture shown before it plays. size="md" is the medium size. */}
      <Cell title="Video, hazır ayarlarla: denetimli, döngüsüz">
        <Media src="/media/hadi-waves.webm" kind="auto" poster="/media/hadi-waves.jpg" size="md" class="lab-player" />
      </Cell>
      {/* An image: alt is its text alternative (what a screen reader reads). class is for tests and your CSS. */}
      <Cell title="Resim, orta boy"><Media src="/media/dusk.jpg" alt="Gün batımında tepeler" size="md" class="lab-image" /></Cell>
      {/* size="sm": a square thumbnail. */}
      <Cell title="Küçük resim (sm)"><Media src="/media/dusk.jpg" alt="Tepeler" size="sm" /></Cell>
      {/* A video with every switch set by hand: controls={false} removes the native controls; autoplay starts it by
          itself, loop repeats it and muted silences it (browsers allow autoplay only for muted video). */}
      <Cell title="Video: afiş, denetimsiz, kendiliğinden, döngü, sessiz">
        <Media src="/media/hadi-waves.webm" kind="video" poster="/media/hadi-waves.jpg" controls={false} autoplay loop muted size="md" class="lab-video" />
      </Cell>
      {/* kind="audio": an audio player. fallback is shown when the file cannot be loaded (this file does not exist). */}
      <Cell title="Ses (audio)"><Media src="/media/sesli-not.mp3" kind="audio" fallback="Ses dosyası bulunamadı" /></Cell>
    </div>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      {/* A missing file: when the load fails, the fallback text replaces the broken image. The test makes it fail by
          sending an error event to this element. */}
      <Cell title="Yedek metin"><Media src="/media/yok.jpg" alt="Kayıp" fallback="Medya yüklenemedi" class="lab-broken" /></Cell>
      {/* fallback can also be a node: here a small dark card. */}
      <Cell title="Yedek düğüm">
        <Media src="/media/yok.jpg" fallback={<Card m:theme="night"><span sx={{ text: "bold" }}>Resim yok</span></Card>} />
      </Cell>
      {/* src={null}: nothing to show, so the "no media" fallback is drawn. */}
      <Cell title="Boş adres"><Media src={null} /></Cell>
      {/* src as a function: it reads $src, so the button swaps the file. With kind="auto" the element type follows the
          extension: an image for .jpg, a video for .webm. */}
      <Cell title="Tür uzantıdan (auto)">
        <Media src={() => $src} kind="auto" poster="/media/hadi-waves.jpg" muted class="lab-auto" />
        <Button on:click={() => $src = $src.endsWith(".jpg") ? "/media/hadi-waves.webm" : "/media/dusk.jpg"}>Resim / video</Button>
      </Cell>
    </div>
  </div>
}
