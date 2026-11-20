import { Media, Card, Button } from "march/ui"

// Media'nın bütün özellikleri bir arada: src, kind (image / video / audio / auto), alt, poster, controls, autoplay,
// loop, muted, size (sm / md), fallback (metin ya da düğüm), class
const Cell = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function MediaLab() {
  let $src = "/media/dusk.jpg"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Cell title="Video, hazır ayarlarla: denetimli, döngüsüz">
        <Media src="/media/hadi-waves.webm" kind="auto" poster="/media/hadi-waves.jpg" size="md" class="lab-player" />
      </Cell>
      <Cell title="Resim, orta boy"><Media src="/media/dusk.jpg" alt="Gün batımında tepeler" size="md" class="lab-image" /></Cell>
      <Cell title="Küçük resim (sm)"><Media src="/media/dusk.jpg" alt="Tepeler" size="sm" /></Cell>
      <Cell title="Video: afiş, denetimsiz, kendiliğinden, döngü, sessiz">
        <Media src="/media/hadi-waves.webm" kind="video" poster="/media/hadi-waves.jpg" controls={false} autoplay loop muted size="md" class="lab-video" />
      </Cell>
      <Cell title="Ses (audio)"><Media src="/media/sesli-not.mp3" kind="audio" fallback="Ses dosyası bulunamadı" /></Cell>
    </div>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Cell title="Yedek metin"><Media src="/media/yok.jpg" alt="Kayıp" fallback="Medya yüklenemedi" class="lab-broken" /></Cell>
      <Cell title="Yedek düğüm">
        <Media src="/media/yok.jpg" fallback={<Card m:theme="night"><span sx={{ text: "bold" }}>Resim yok</span></Card>} />
      </Cell>
      <Cell title="Boş adres"><Media src={null} /></Cell>
      <Cell title="Tür uzantıdan (auto)">
        <Media src={() => $src} kind="auto" poster="/media/hadi-waves.jpg" muted class="lab-auto" />
        <Button on:click={() => $src = $src.endsWith(".jpg") ? "/media/hadi-waves.webm" : "/media/dusk.jpg"}>Resim / video</Button>
      </Cell>
    </div>
  </div>
}
