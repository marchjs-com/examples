// ProfileAnatomy: the real-life ExplodedView example.
//
// What it shows: the anatomy of a profile card. The avatar, the badge and the button rise as separate plates with name tags;
// pressing a plate writes its name below.
// When to use this pattern: documentation and design reviews: showing which components a screen is built from. The plates are the
// real elements, so their state and listeners stay as they were.
// Accessibility: while apart the view is a group with a name; the content keeps keyboard focus, and the ghost plates and tags are
// hidden from assistive technology.
import { ExplodedView, Card, Avatar, Badge, Button } from "march/ui"

// The selectors of the components to lift: the CSS classes of Avatar, Badge and Button; each label is its name tag.
const parts = [{ selector: ".m-avatar", label: "Avatar" }, { selector: ".m-badge", label: "Badge" }, { selector: ".m-btn", label: "Button" }]

// $picked is the label of the last plate pressed.
export function ProfileAnatomy() {
  let $picked = ""
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* open (no value) keeps it apart; parts lists the plates; onPick(id) is called when a plate is pressed (the id is
            the label here); active marks the chosen plate. */}
    <ExplodedView open parts={parts} onPick={(id: string) => $picked = id} active={$picked}>
      <Card>
        <div sx={{ flex: ["row", "center"], gap: 2 }}><Avatar name="Elif Arslan" /><strong>Elif Arslan</strong><Badge tone="success">Etkin</Badge></div>
        <Button size="sm">Takip et</Button>
      </Card>
    </ExplodedView>
    <span sx={{ text: "sm", color: "muted" }}>{$picked ? `Seçilen: ${$picked}` : "Bir plakaya tıkla"}</span>
  </div>
}
