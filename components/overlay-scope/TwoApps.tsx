// TwoApps: the real-life OverlayScope example.
//
// Two small apps side by side on one page (think of two widgets in a dashboard). Each app is its own OverlayScope, so a
// dialog or a toast opened by one stays inside that app's box instead of covering both. Use this pattern when several
// independent panels share a page and each must keep its own layers.
import { OverlayScope, Button, openDialog, toast } from "march/ui"

// One app: a scope box with a title and two buttons. Both buttons open their layer from inside the scope, so the layer is
// placed in this box (found from the component that opened it).
const App = (props: { name: string }) => <OverlayScope class="m-card" sx={{ p: 3 }}>
  <strong>{props.name}</strong>
  <div sx={{ flex: "row", gap: 2 }}>
    <Button size="sm" on:click={() => openDialog(() => <p>{props.name} penceresi</p>, { title: props.name })}>Pencere</Button>
    <Button size="sm" on:click={() => toast(`${props.name}: kaydedildi`)}>Bildirim</Button>
  </div>
</OverlayScope>

export function TwoApps() {
  // The same App component twice: because every instance is its own scope, nothing needs to be told which box to use.
  return <div sx={{ flex: "row", gap: 3 }}><App name="Notlar" /><App name="Takvim" /></div>
}
