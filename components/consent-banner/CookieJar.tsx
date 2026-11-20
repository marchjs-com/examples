import { ConsentBanner } from "march/components/consent-banner"

// kurabiye kavanozu: aynı bant, kendi sesiyle; üç seçenek yine eşit ağırlıkta
export function CookieJar() {
  return <ConsentBanner inline always title="🍪 Kavanozda kurabiye var"
    text="Siteyi çalıştıranlar hep açık. Ölçüm ve öneri kurabiyelerini yalnız sen istersen pişiririz."
    labels={{ reject: "Hiç istemem", customize: "Tek tek seçeyim", accept: "Hepsini al" }} />
}
