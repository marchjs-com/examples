// HotelHero: the real-life VideoBackground example.
//
// What it shows: the opening section of a boutique hotel's page. A silent sea video plays behind a headline, a short
// line and a booking button. The text stays readable because of a dark tint over the video.
// When to use this pattern: a hero, a call-to-action band or a slide where moving pictures set the mood and text carries
// the message. The video is decorative: everything important must be in the content on top of it.
import { VideoBackground } from "march/landing"
import { Button, toast } from "march/ui"
import { calendar } from "march/icons"

export function HotelHero() {
  // Props of VideoBackground used here:
  // - src: the video file (mp4 / webm); it is muted and loops. poster: the first frame, shown at once and kept as the
  //   fallback when the visitor has save-data on, a slow connection or reduced motion (then the video does not play).
  //   The video plays only while it is visible and is released when it leaves the page.
  // - tint="dark" with tintOpacity={0.5}: a dark layer (half strength) between the video and the content; the text
  //   colour follows the tint, which keeps the text readable on any frame.
  // - position: the object-position of the video, i.e. which part stays in view when it is cropped to the box.
  // - labels: the accessible names of the small play / pause button in the corner (the default texts are English, so
  //   they are replaced here). That button is how a visitor stops the motion: moving content longer than five
  //   seconds needs a way to stop it. controls={false} would remove it, so only do that where something else stops it.
  // The children are the content on top. The video itself is hidden from screen readers and is never focusable.
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
