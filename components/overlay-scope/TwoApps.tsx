import { OverlayScope, Button, openDialog, toast } from "march/ui"

// yan yana iki uygulama: her birinin penceresi ve bildirimi kendi kutusunda kalır
const App = (props: { name: string }) => <OverlayScope class="m-card" sx={{ p: 3 }}>
  <strong>{props.name}</strong>
  <div sx={{ flex: "row", gap: 2 }}>
    <Button size="sm" on:click={() => openDialog(() => <p>{props.name} penceresi</p>, { title: props.name })}>Pencere</Button>
    <Button size="sm" on:click={() => toast(`${props.name}: kaydedildi`)}>Bildirim</Button>
  </div>
</OverlayScope>

export function TwoApps() {
  return <div sx={{ flex: "row", gap: 3 }}><App name="Notlar" /><App name="Takvim" /></div>
}
