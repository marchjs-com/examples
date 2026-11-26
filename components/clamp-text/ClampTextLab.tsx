// ClampTextLab: the full-featured ClampText example; it uses every prop at least once.
//
// Props shown here: lines, text or children, expandable (true: a switch only when the text does not fit, "always":
// a switch without measuring, false: the fold only), collapsible (no "less" after opening), open + onOpenChange
// (controlled), defaultOpen (starts open), labels (your own switch texts), as (p, div, span), class and m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ClampTextLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ClampText, Button } from "march/ui"

const LONG = "March bileşenleri bir kez çalışır: yeniden çizim yok, kanca kuralları yok, bağımlılık dizisi yok. Değişen her değer bir sinyal; JSX'teki her canlı ifade tam o metin düğümüne ya da özniteliğe bağlanır. Bir dal kaybolunca dinleyiciler, efektler ve zamanlayıcılar kendiliğinden temizlenir."

// A small caption above each example. Only the Lab uses it.
const Title = (props: { text: string }) => <span sx={{ text: "xs", color: "muted" }}>{props.text}</span>

export function ClampTextLab() {
  // The controlled example's open state and how often it changed.
  let $open = false
  let $changes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Uncontrolled and simplest: lines={2} folds to two lines; the "more" switch appears only if the text is really cut
        (the fold is measured after layout and when the box resizes), so a text that fits shows no switch. */}
    <Title text="lines={2}, text: sığmazsa devamı" />
    <ClampText lines={2} text={LONG} class="lab-auto" />

    {/* Controlled: open + onOpenChange make you the owner of the state, so another control (the button below) can
        open and fold the text too. expandable="always" shows the switch without measuring. labels replaces the
        switch texts (a text or a node). m:color is the common prop that sets the colour token. */}
    <Title text="denetimli: open + onOpenChange, ölçmeden düğme (always), kendi metinler" />
    <ClampText lines={1} text={LONG} expandable="always" open={$open} onOpenChange={(v: boolean) => { $open = v; $changes++ }}
      labels={{ more: "aç (denetimli)", less: "kapat (denetimli)" }} m:color="brand-blue" class="lab-controlled" />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" variant="secondary" on:click={() => $open = !$open}>{$open ? "Dışarıdan katla" : "Dışarıdan aç"}</Button>
      <span class="lab-state" sx={{ text: "sm" }}>{`durum: ${$open ? "açık" : "kapalı"} · değişim: ${$changes}`}</span>
    </div>

    {/* defaultOpen: the first state when uncontrolled. collapsible={false}: no "less" after opening, so with the text
        already open there is no button at all. as="div" renders the text in a div instead of a p; children carry
        the text here instead of the `text` prop. */}
    <Title text="defaultOpen, collapsible={false}: açık başlar, katlanmaz" />
    <ClampText lines={2} defaultOpen collapsible={false} expandable="always" as="div" class="lab-default">{LONG}</ClampText>

    {/* expandable={false}: only the fold, no switch (for titles you never want to expand); as="span" for inline use. */}
    <Title text={'expandable={false}: yalnız katlar (as="span")'} />
    <ClampText lines={1} expandable={false} as="span" class="lab-fold" text={LONG} />

    <Title text="kendi metinler, m:color" />
    <ClampText lines={1} expandable="always" labels={{ more: "tamamını oku", less: "kısalt" }} m:color="brand-orange" class="lab-labels">{LONG}</ClampText>
  </div>
}
