import { AvatarGroup } from "march/ui"

// belgeyi görüntüleyenler: küçük, yan yana, sabit renk; +N balonu kendi metniyle
export function DocViewers() {
  return <div sx={{ flex: ["row", "center"], gap: 2 }}>
    <span sx={{ text: "sm", color: "muted" }}>Şu an bakıyor:</span>
    <AvatarGroup names={["Elif Arslan", "Can Demir", "Deniz Kaya", "Ada Yıldız", "Mert Öz", "Selin Ak"]} max={3} size="xs" spacing="gap"
      color="brand-blue" more={(rest: number) => <b>{`+${rest} kişi`}</b>} label={(n: number) => `${n} kişi bakıyor`} />
  </div>
}
