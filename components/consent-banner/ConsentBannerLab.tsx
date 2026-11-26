// ConsentBannerLab: the full-featured ConsentBanner example; it uses every prop at least once.
//
// Props shown here: title, text, policyLabel, labels, always, inline, customize and class of ConsentBanner; next to it a
// ConsentGate (category, label, labels, preferences, class, children) and the showConsentBanner() function.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ConsentBannerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Button } from "march/ui"
import { ConsentBanner, ConsentGate, showConsentBanner } from "march/components/consent-banner"

export function ConsentBannerLab() {
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The banner:
        - always: show it even when a decision is already stored (demos and tests); a choice still closes it.
        - inline: draw it in the page flow instead of the bottom layer of the page.
        - customize: the "Customize" button that opens the preferences panel. Reject and Accept always stay side by
          side with the same weight, so refusing is as easy as accepting.
        - title / text: the heading and the wording of your own app. policyLabel: the label of the policy link (it is
          shown when a policy address is configured for the consent manager).
        - labels: every button text; replace only the ones you need.
        - class: added to the banner so a test or your CSS can find it. */}
    <ConsentBanner class="lab-banner" inline always customize title="Lab bandı" text="Lab metni."
      policyLabel="Gizlilik" labels={{ reject: "Reddet (lab)", customize: "Seç (lab)", accept: "Kabul (lab)" }} />
    {/* ConsentGate keeps third-party content behind a placeholder until the category is allowed. category names the
        consent category; label is the placeholder text; labels.allow is the "allow here" button; preferences={false}
        hides the link to the preferences panel; the children are drawn only after consent. */}
    <ConsentGate class="lab-gate" category="thirdParty" label="Lab yer tutucusu" preferences={false} labels={{ allow: "İzin ver (lab)" }}>
      <p class="lab-content">Lab içeriği</p>
    </ConsentGate>
    {/* showConsentBanner() reopens the banner, e.g. from a "cookie settings" link in a footer. */}
    <div><Button size="sm" on:click={showConsentBanner}>Bandı yeniden göster</Button></div>
  </div>
}
