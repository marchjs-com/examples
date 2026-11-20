import { Button } from "march/ui"
import { ConsentBanner, ConsentGate, showConsentBanner } from "march/components/consent-banner"

// ConsentBanner'ın bütün özellikleri: title, text, policyLabel, labels, always, inline, customize, class;
// yanında ConsentGate (category, label, labels, preferences, class, children) ve showConsentBanner()
export function ConsentBannerLab() {
  return <div sx={{ flex: "col", gap: 2 }}>
    <ConsentBanner class="lab-banner" inline always customize title="Lab bandı" text="Lab metni."
      policyLabel="Gizlilik" labels={{ reject: "Reddet (lab)", customize: "Seç (lab)", accept: "Kabul (lab)" }} />
    <ConsentGate class="lab-gate" category="thirdParty" label="Lab yer tutucusu" preferences={false} labels={{ allow: "İzin ver (lab)" }}>
      <p class="lab-content">Lab içeriği</p>
    </ConsentGate>
    <div><Button size="sm" on:click={showConsentBanner}>Bandı yeniden göster</Button></div>
  </div>
}
