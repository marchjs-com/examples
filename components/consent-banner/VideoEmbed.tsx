// VideoEmbed: the real-life ConsentBanner example (the ConsentGate part).
//
// What it shows: a blog post with an embedded video. Until the visitor allows third-party content, a placeholder is shown
// instead of the video, so nothing is loaded from the third party; the visitor can allow it right there, or open the
// cookie preferences. A link under the article opens the preferences panel at any time.
// When to use this pattern: any content that sets third-party cookies or loads a third-party script (videos, maps,
// social widgets). Put it inside a ConsentGate with the matching category: its children are drawn only after consent.
import { Button } from "march/ui"
import { ConsentGate, openConsentPreferences } from "march/components/consent-banner"

export function VideoEmbed() {
  return <article sx={{ flex: "col", gap: 2 }}>
    <h3 sx={{ text: "lg" }}>Kapadokya'da gün doğumu</h3>
    <p sx={{ color: "muted" }}>Balonların havalandığı o on dakika, tek çekimde.</p>
    {/* category="thirdParty": the consent category that must be allowed. label is the placeholder text; labels
        gives the texts of its two buttons (allow here, open preferences). Here the child is a stand-in for the
        real embed; in a real page put the iframe or player there. */}
    <ConsentGate category="thirdParty" label="Bu video YouTube'dan gelir; izin verene dek yüklenmez."
      labels={{ allow: "Videoyu göster", preferences: "Çerez ayarları" }}>
      <div sx={{ p: 4, radius: 3, text: "center" }} style={{ background: "var(--m-surface-2)" }}>▶ Video oynatılıyor</div>
    </ConsentGate>
    {/* openConsentPreferences() opens the preferences panel (it returns a promise, hence `void`). A visitor must be able
        to change or withdraw the decision later, so keep such a link on the page. */}
    <div><Button variant="link" size="sm" on:click={() => { void openConsentPreferences() }}>Çerez tercihlerim</Button></div>
  </article>
}
