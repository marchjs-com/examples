import { Button } from "march/ui"
import { ConsentGate, openConsentPreferences } from "march/components/consent-banner"

// blog yazısında gömülü video: üçüncü taraf izni gelene dek yer tutucu; altta "çerez ayarları" bağlantısı
export function VideoEmbed() {
  return <article sx={{ flex: "col", gap: 2 }}>
    <h3 sx={{ text: "lg" }}>Kapadokya'da gün doğumu</h3>
    <p sx={{ color: "muted" }}>Balonların havalandığı o on dakika, tek çekimde.</p>
    <ConsentGate category="thirdParty" label="Bu video YouTube'dan gelir; izin verene dek yüklenmez."
      labels={{ allow: "Videoyu göster", preferences: "Çerez ayarları" }}>
      <div sx={{ p: 4, radius: 3, text: "center" }} style={{ background: "var(--m-surface-2)" }}>▶ Video oynatılıyor</div>
    </ConsentGate>
    <div><Button variant="link" size="sm" on:click={() => { void openConsentPreferences() }}>Çerez tercihlerim</Button></div>
  </article>
}
