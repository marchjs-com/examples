import { Carousel, Card } from "march/ui"

// emoji makarası: slaytlar düz metin (her metin kendi slayt kutusunu alır), noktalar numaralı
const faces = ["😀 Neşeli", "😎 Havalı", "🤔 Düşünceli", "😴 Uykulu", "🥳 Kutlamada"]

export function EmojiReel() {
  return <Card title="Bugün nasılsın?">
    <Carousel label="Ruh hâli" perView={2} m:color="brand-orange" dots={(i: number) => String(i + 1)}>
      {faces}
    </Carousel>
  </Card>
}
