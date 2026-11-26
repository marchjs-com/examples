// PageDotsLab: the full-featured PageDots example; it uses every prop at least once.
//
// PageDots shows one dot per page; the current one is longer and takes the accent colour. With onChange (or bind:value)
// the dots are buttons; without it they only show where you are. Props shown here: count, value, bind:value (setValue),
// onChange, labels (group, page, status), size, variant, orientation, dot (your own content, it knows which dot is
// active), decorative, disabled, class and the common colour prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PageDotsLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { PageDots, Toggle, Card } from "march/ui"

// One row of the Lab: the title on top, the dots below. Plain composition, no PageDots feature.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function PageDotsLab() {
  // Reactive state: the current photo and chapter (0-based) and whether the gallery is locked.
  let $photo = 0
  let $chapter = 0
  let $locked = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Tıklanır (bind:value), büyük, mavi">
      {/* Interactive dots: bind:value makes them buttons and keeps $photo in step. Accessibility: a group of buttons
          named by labels (group = the group's name, page = a function giving each dot's name), the current dot has
          aria-current, one Tab stop and the arrow keys, Home and End move and select. size="lg": bigger dots.
          m:color: the colour token. class: for CSS or tests. disabled: turns every dot button off (the toggle below). */}
      <PageDots count={5} bind:value={$photo} size="lg" m:color="brand-blue" class="lab-gallery" disabled={$locked}
        labels={{ group: "Galeri sayfaları", page: (n: number) => `Fotoğraf ${n}` }} />
    </Row>
    <Toggle bind:value={$locked} label="Galeriyi kilitle (disabled)" />
    <Row title="Salt okunur (value), eşit noktalar, küçük">
      {/* Read-only: only `value`, so the dots show the position and are one image named by labels.status.
          variant="dot": every dot has the same size (the default "pill" makes the current one longer). size="sm". */}
      <PageDots count={5} value={$photo} variant="dot" size="sm" labels={{ status: (n: number, c: number) => `Konum: ${n} / ${c}` }} />
    </Row>
    <span sx={{ text: "sm" }}>{`Seçili: ${$photo + 1} / 5`}</span>
    <Row title="Kendi içerik (dot), dikey, onChange">
      {/* onChange(index) instead of bind:value: the same as binding, written out. orientation="vertical": a column; the
          arrow keys are then Up / Down. variant="pill" and size="md" are the defaults, written out to show them.
          dot(index, active): draws the content of each dot yourself (a number, a thumbnail...); `active` is a function
          that says whether this dot is the current one, here a star replaces the number. */}
      <PageDots count={4} value={$chapter} onChange={(i: number) => $chapter = i} orientation="vertical" variant="pill" size="md"
        dot={(i: number, active: () => boolean) => () => (active() ? "★" : String(i + 1))} labels={{ page: (n: number) => `Bölüm ${n}` }} />
    </Row>
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. */}
    <Card m:theme="night">
      <Row title="Süs (decorative) ve kilitli (disabled)">
        {/* decorative: read-only dots are hidden from screen readers (aria-hidden), for when the position is already
            said elsewhere. The second one has an onChange so it has buttons, and `disabled` turns them off. */}
        <PageDots count={3} value={1} decorative class="lab-decor" m:color="brand-gold" />
        <PageDots count={3} value={0} onChange={() => {}} disabled labels={{ group: "Kilitli noktalar", page: (n: number) => `Kilitli ${n}` }} />
      </Row>
    </Card>
  </div>
}
