import { ClampText, Button } from "march/ui"

// ClampText'in bütün özellikleri bir arada: lines, text ya da children, expandable (true: sığmayınca, "always", false:
// yalnız katlar), collapsible (açılınca "daha az" yok), open + onOpenChange (denetimli), defaultOpen (açık başlar),
// labels (kendi düğme metinlerin), as (p, div, span), class ve m:color
const LONG = "March bileşenleri bir kez çalışır: yeniden çizim yok, kanca kuralları yok, bağımlılık dizisi yok. Değişen her değer bir sinyal; JSX'teki her canlı ifade tam o metin düğümüne ya da özniteliğe bağlanır. Bir dal kaybolunca dinleyiciler, efektler ve zamanlayıcılar kendiliğinden temizlenir."

// bir örneğin üstündeki küçük başlık
const Title = (props: { text: string }) => <span sx={{ text: "xs", color: "muted" }}>{props.text}</span>

export function ClampTextLab() {
  let $open = false
  let $changes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Title text="lines={2}, text: sığmazsa devamı" />
    <ClampText lines={2} text={LONG} class="lab-auto" />

    <Title text="denetimli: open + onOpenChange, ölçmeden düğme (always), kendi metinler" />
    <ClampText lines={1} text={LONG} expandable="always" open={$open} onOpenChange={(v: boolean) => { $open = v; $changes++ }}
      labels={{ more: "aç (denetimli)", less: "kapat (denetimli)" }} m:color="brand-blue" class="lab-controlled" />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Button size="sm" variant="secondary" on:click={() => $open = !$open}>{$open ? "Dışarıdan katla" : "Dışarıdan aç"}</Button>
      <span class="lab-state" sx={{ text: "sm" }}>{`durum: ${$open ? "açık" : "kapalı"} · değişim: ${$changes}`}</span>
    </div>

    <Title text="defaultOpen, collapsible={false}: açık başlar, katlanmaz" />
    <ClampText lines={2} defaultOpen collapsible={false} expandable="always" as="div" class="lab-default">{LONG}</ClampText>

    <Title text={'expandable={false}: yalnız katlar (as="span")'} />
    <ClampText lines={1} expandable={false} as="span" class="lab-fold" text={LONG} />

    <Title text="kendi metinler, m:color" />
    <ClampText lines={1} expandable="always" labels={{ more: "tamamını oku", less: "kısalt" }} m:color="brand-orange" class="lab-labels">{LONG}</ClampText>
  </div>
}
