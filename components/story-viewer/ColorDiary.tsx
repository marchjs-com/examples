import { StoryViewer, Button } from "march/ui"

// günün renkleri: dört renk, her biri iki saniyelik bir hikâye; sonuncusu bitince görüntüleyici kendiliğinden kapanır
// fotoğraflar: 2×2 piksellik PNG'ler (dört rengi tarayıcı yumuşakça karıştırır)
const PHOTOS = {
  sea: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGOoOfZCv34Hw+ebS17sqAAANsYIGXUpO/0AAAAASUVORK5CYII=",
  dawn: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAF0lEQVR4nGP4f7nrf382w/eVR/qzbwAAPqoIjEiz040AAAAASUVORK5CYII=",
  city: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGOQ1Y7Ktl/AwC9h+mCBFQAYjgQDFgLe2AAAAABJRU5ErkJggg==",
  sunset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGP4vznmf3Y0wyHHKm+tbAAzQwYxpZcJIQAAAABJRU5ErkJggg==",
}
const DAY = [{
  id: "day", name: "Renk günlüğü", items: [
    { id: "dawn", src: PHOTOS.dawn, caption: "06:40 · şafak pembesi" },
    { id: "sea", src: PHOTOS.sea, caption: "12:15 · öğle mavisi" },
    { id: "sunset", src: PHOTOS.sunset, caption: "18:50 · gün batımı" },
    { id: "city", src: PHOTOS.city, caption: "23:30 · şehir gecesi" },
  ],
}]

export function ColorDiary() {
  let $open = false
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <Button variant="primary" m:color="brand-pink" on:click={() => $open = true}>🎨 Günün renklerini aç</Button>
    <StoryViewer open={$open} onClose={() => $open = false} groups={DAY} duration={2000} arrows={false} avatar={false} time={false} />
  </div>
}
