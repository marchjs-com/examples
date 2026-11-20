import { CodeInput, Card, Button } from "march/ui"
import { Icon, minus } from "march/icons"

// CodeInput'un bütün özellikleri: bind:value, onChange, onComplete, uzunluk, karakter türü (pattern) ve büyük harf,
// gruplar (dizi ya da grup başına sayı), ayraç (çizgi, metin, kendi düğümün, hiç), renkler (tek, HADİ, palet, kendi
// listen), yazı tipi, boyut, biçim, hareket (kapalı ya da kendi hareketin), kutu adları (boxLabel), gizli (PIN),
// salt okunur, devre dışı, geçersiz, id / class, labelledby / describedby, odaktan çıkış, açılışta odak (autofocus),
// eski adlar (numeric, masked)
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>
const fade = (box: HTMLElement) => { box.animate([{ opacity: 0 }, { opacity: 1 }], 300) }

export function CodeInputLab() {
  let $otp = ""
  let $edits = 0
  let $last = ""
  let $word = ""
  let $left = 0
  let $hide = true
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Değer, onChange, onComplete, gruplar [3, 3], kutu adları">
      <span id="lab-otp-title" sx={{ text: "bold" }}>Giriş kodu</span>
      <CodeInput bind:value={$otp} length={6} groups={[3, 3]} id="lab-otp" class="lab-otp" labelledby="lab-otp-title" describedby="lab-otp-hint"
        boxLabel={(i: number, n: number) => `Kod ${i}/${n}`} onChange={() => $edits++} onComplete={(c: string) => $last = c} onBlur={() => $left++} />
      <span id="lab-otp-hint" sx={{ text: "sm" }}>Değer: {$otp || "—"} · tamamlanan: {$last || "—"} · değişiklik: {$edits} · çıkış: {$left}</span>
    </Row>
    <Row title="Karakter türü: harf (büyük harfe çevrilir), harf ve rakam (küçük kalır), grup başına 4">
      <CodeInput bind:value={$word} length={5} pattern="alpha" boxLabel={(i: number) => `Harf ${i}`} />
      <span sx={{ text: "sm" }}>Harfler: {$word || "—"}</span>
      <CodeInput length={8} pattern="alphanumeric" uppercase={false} groups={4} class="lab-alnum" boxLabel={(i: number) => `Karakter ${i}`} />
    </Row>
    <Row title="Renkler: tek, HADİ, palet, kendi listen">
      <CodeInput value="1234" length={4} colors="single" m:color="brand-purple" />
      <CodeInput value="1234" length={4} colors="brand" />
      <CodeInput value="1234" length={4} colors="palette" />
      <CodeInput value="1234" length={4} colors={["brand-pink", "brand-gold", "cat-3", "brand-blue"]} />
    </Row>
    <Row title="Yazı tipi, boyut, biçim">
      <CodeInput value="2026" length={4} font="mono" size="sm" variant="filled" />
      <CodeInput value="2026" length={4} font="body" size="md" variant="underline" />
      <CodeInput value="2026" length={4} font="display" size="lg" variant="outline" />
    </Row>
    <Row title="Ayraç: metin, kendi düğümün, hiç; hareket kapalı / kendi hareketin">
      <CodeInput length={6} groups={3} separator="•" class="lab-dot" animate={false} />
      <CodeInput length={6} groups={3} separator={<Icon of={minus} />} animate={fade} />
      <CodeInput length={6} groups={3} separator={false} class="lab-nosep" />
    </Row>
    <Row title="Gizli (PIN), salt okunur, devre dışı, geçersiz">
      <CodeInput value="4321" length={4} mask boxLabel={(i: number) => `PIN ${i}`} />
      <CodeInput value="9876" length={4} readonly boxLabel={(i: number) => `Salt okunur ${i}`} />
      <CodeInput value="5555" length={4} disabled boxLabel={(i: number) => `Kilitli ${i}`} />
      <CodeInput value="12" length={4} invalid boxLabel={(i: number) => `Hatalı ${i}`} />
    </Row>
    <Row title="Eski adlar ve açılış odağı">
      {/* numeric={false}: eski ad, pattern="alphanumeric" ile aynı; autofocus: açılışta ilk kutuya odaklanır (burada
          kapalı: önizleme editörden odağı çalmasın) */}
      <CodeInput value="A1B2" length={4} numeric={false} autofocus={false} boxLabel={(i: number) => `Eski ${i}`} />
      {/* masked: mask'in eski adı; işlev de olur: düğme gizli / açık arasında geçirir */}
      <CodeInput value="2468" length={4} masked={() => $hide} boxLabel={(i: number) => `Gizli ${i}`} />
      <Button size="sm" on:click={() => $hide = !$hide}>{$hide ? "Göster" : "Gizle"}</Button>
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <CodeInput value="777" length={6} groups={[3, 3]} colors="brand" />
      </Row>
    </Card>
  </div>
}
