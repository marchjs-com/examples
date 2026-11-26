// CookieJar: the creative-minimal ConsentBanner example.
//
// What it shows: the same consent banner with a voice of its own: a playful title and text, and your own words on the
// three buttons. The three choices (reject, choose one by one, accept) still have equal weight.
// When to use this pattern: when the banner should sound like your brand. Only wording changes through `title`, `text`
// and `labels`; the behaviour (a real choice, easy refusal) stays the same. `inline` draws it in the page flow and
// `always` shows it even if a decision is stored, which suits a demo; in a real page leave both out so the banner
// appears at the bottom only until the visitor has decided.
import { ConsentBanner } from "march/components/consent-banner"

export function CookieJar() {
  return <ConsentBanner inline always title="🍪 Kavanozda kurabiye var"
    text="Siteyi çalıştıranlar hep açık. Ölçüm ve öneri kurabiyelerini yalnız sen istersen pişiririz."
    labels={{ reject: "Hiç istemem", customize: "Tek tek seçeyim", accept: "Hepsini al" }} />
}
