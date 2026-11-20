import { ExplodedView, Card, Avatar, Badge, Button } from "march/ui"

// profil kartının anatomisi: avatar, rozet ve düğme ayrı plakalar; bir plakaya tıklayınca adı yazılır
const parts = [{ selector: ".m-avatar", label: "Avatar" }, { selector: ".m-badge", label: "Badge" }, { selector: ".m-btn", label: "Button" }]

export function ProfileAnatomy() {
  let $picked = ""
  return <div sx={{ flex: "col", gap: 2 }}>
    <ExplodedView open parts={parts} onPick={(id: string) => $picked = id} active={$picked}>
      <Card>
        <div sx={{ flex: ["row", "center"], gap: 2 }}><Avatar name="Elif Arslan" /><strong>Elif Arslan</strong><Badge tone="success">Etkin</Badge></div>
        <Button size="sm">Takip et</Button>
      </Card>
    </ExplodedView>
    <span sx={{ text: "sm", color: "muted" }}>{$picked ? `Seçilen: ${$picked}` : "Bir plakaya tıkla"}</span>
  </div>
}
