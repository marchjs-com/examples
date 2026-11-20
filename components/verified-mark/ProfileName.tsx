import { VerifiedMark, Card } from "march/ui"

// profil adı: koyu kartta büyük ad ve altın rozet
export function ProfileName() {
  return <Card m:theme="night">
    <span sx={{ text: ["xl", "bold"] }}>HADİ Koşu Kulübü <VerifiedMark size="lg" m:color="brand-gold" label="Onaylı kulüp" /></span>
  </Card>
}
