import { AvatarGroup, Button } from "march/ui"

// parti davetlileri: "Katıl" her basışta gruba bir kişi ekler; dört kişiden sonrası +N
const names = ["Elif", "Can", "Deniz", "Ada", "Mert", "Zeynep", "Kerem", "Selin"]

export function PartyGuests() {
  let $n = 3
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <AvatarGroup names={names.slice(0, $n)} max={4} size="md" />
    <Button size="sm" disabled={$n >= names.length} on:click={() => $n++}>Katıl</Button>
  </div>
}
