// CodeInputLab: the full-featured CodeInput example; it uses every prop at least once.
//
// Props shown here: bind:value, onChange, onComplete, length, pattern, uppercase, groups, separator (dash, text, your own
// node, none), colors, font, size, variant, animate (off or your own motion), boxLabel, mask, readonly, disabled, invalid,
// id / class, labelledby / describedby, onBlur, autofocus, the older names numeric and masked, and a dark surface.
// Use it as a reference when you need one option: find the prop below and copy the line.
// CodeInputLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CodeInput, Card, Button } from "march/ui"
import { Icon, minus } from "march/icons"

// A small layout helper: a muted caption above a column of controls. It only organises the lab.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>
// Your own motion for `animate`: it receives the box element and plays a Web Animation (a 300 ms fade). The default is the
// built-in pop, which already follows reduced motion and the global speed; a function of your own replaces it.
const fade = (box: HTMLElement) => { box.animate([{ opacity: 0 }, { opacity: 1 }], 300) }

export function CodeInputLab() {
  // State: the typed code, how many edits, the last completed code, a letters-only value, how many times focus left, and the mask toggle.
  let $otp = ""
  let $edits = 0
  let $last = ""
  let $word = ""
  let $left = 0
  let $hide = true
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* 1. The main example. bind:value keeps $otp in sync; length={6} with groups={[3, 3]} puts a separator between two groups of
        three. labelledby / describedby link the group to the title and the hint (the test checks both). boxLabel(i, n) names each
        box. onChange fires on every edit, onComplete once when every box is filled, onBlur when focus leaves a box. */}
    <Row title="Değer, onChange, onComplete, gruplar [3, 3], kutu adları">
      <span id="lab-otp-title" sx={{ text: "bold" }}>Giriş kodu</span>
      <CodeInput bind:value={$otp} length={6} groups={[3, 3]} id="lab-otp" class="lab-otp" labelledby="lab-otp-title" describedby="lab-otp-hint"
        boxLabel={(i: number, n: number) => `Kod ${i}/${n}`} onChange={() => $edits++} onComplete={(c: string) => $last = c} onBlur={() => $left++} />
      <span id="lab-otp-hint" sx={{ text: "sm" }}>Değer: {$otp || "—"} · tamamlanan: {$last || "—"} · değişiklik: {$edits} · çıkış: {$left}</span>
    </Row>
    {/* 2. Character types. pattern="alpha" accepts letters only and turns them to capitals (uppercase defaults to true for
        letters). pattern="alphanumeric" with uppercase={false} keeps what is typed; groups={4} (a number) means four boxes per
        group, so eight boxes make two groups. */}
    <Row title="Karakter türü: harf (büyük harfe çevrilir), harf ve rakam (küçük kalır), grup başına 4">
      <CodeInput bind:value={$word} length={5} pattern="alpha" boxLabel={(i: number) => `Harf ${i}`} />
      <span sx={{ text: "sm" }}>Harfler: {$word || "—"}</span>
      <CodeInput length={8} pattern="alphanumeric" uppercase={false} groups={4} class="lab-alnum" boxLabel={(i: number) => `Karakter ${i}`} />
    </Row>
    {/* 3. Colours. "single" uses one colour (set with m:color), "brand" the HADI colours in turn, "palette" the palette in turn,
        and an array lets you list tokens yourself (one per box, repeating). */}
    <Row title="Renkler: tek, HADİ, palet, kendi listen">
      <CodeInput value="1234" length={4} colors="single" m:color="brand-purple" />
      <CodeInput value="1234" length={4} colors="brand" />
      <CodeInput value="1234" length={4} colors="palette" />
      <CodeInput value="1234" length={4} colors={["brand-pink", "brand-gold", "cat-3", "brand-blue"]} />
    </Row>
    {/* 4. Look. font: "mono", "body" or "display"; size: "sm", "md" or "lg"; variant: "filled", "underline" or "outline". */}
    <Row title="Yazı tipi, boyut, biçim">
      <CodeInput value="2026" length={4} font="mono" size="sm" variant="filled" />
      <CodeInput value="2026" length={4} font="body" size="md" variant="underline" />
      <CodeInput value="2026" length={4} font="display" size="lg" variant="outline" />
    </Row>
    {/* 5. The mark between groups. A text separator, your own node (here an icon) or false (just a gap).
        animate={false} removes the pop when a character lands; animate={fade} replaces it with our own function. */}
    <Row title="Ayraç: metin, kendi düğümün, hiç; hareket kapalı / kendi hareketin">
      <CodeInput length={6} groups={3} separator="•" class="lab-dot" animate={false} />
      <CodeInput length={6} groups={3} separator={<Icon of={minus} />} animate={fade} />
      <CodeInput length={6} groups={3} separator={false} class="lab-nosep" />
    </Row>
    {/* 6. States. mask shows dots (a PIN). readonly keeps the value but blocks typing. disabled blocks the boxes.
        invalid sets aria-invalid for an error state. */}
    <Row title="Gizli (PIN), salt okunur, devre dışı, geçersiz">
      <CodeInput value="4321" length={4} mask boxLabel={(i: number) => `PIN ${i}`} />
      <CodeInput value="9876" length={4} readonly boxLabel={(i: number) => `Salt okunur ${i}`} />
      <CodeInput value="5555" length={4} disabled boxLabel={(i: number) => `Kilitli ${i}`} />
      <CodeInput value="12" length={4} invalid boxLabel={(i: number) => `Hatalı ${i}`} />
    </Row>
    <Row title="Eski adlar ve açılış odağı">
      {/* 7. Older names. numeric={false} is the older name for pattern="alphanumeric". autofocus focuses the first box on
          load (turned off here so the preview does not steal focus from the editor). */}
      <CodeInput value="A1B2" length={4} numeric={false} autofocus={false} boxLabel={(i: number) => `Eski ${i}`} />
      {/* masked is the older name for mask. It can also be a function: the button below switches it on and off. */}
      <CodeInput value="2468" length={4} masked={() => $hide} boxLabel={(i: number) => `Gizli ${i}`} />
      <Button size="sm" on:click={() => $hide = !$hide}>{$hide ? "Göster" : "Gizle"}</Button>
    </Row>
    {/* Dark surface: m:theme="night" draws the card and everything in it in the dark theme. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <CodeInput value="777" length={6} groups={[3, 3]} colors="brand" />
      </Row>
    </Card>
  </div>
}
