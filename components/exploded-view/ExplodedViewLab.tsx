// ExplodedViewLab: the full-featured ExplodedView example; it uses every prop at least once.
//
// Props shown here: open / setOpen, parts, target, layers, tags, gap, tilt, fit, motion, onPick, active, label and class.
// There are two modes: with `parts`, every element of the content that matches a selector rises as its own plate; without
// `parts`, one element (the first, or the one `target` picks) opens into its layers (shadow, surface, content, focus ring).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ExplodedViewLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ExplodedView, Button, Badge, Card, Avatar } from "march/ui"

// Each part is { selector, label?, id?, level? }: selector finds elements inside the content; label is the name tag; id goes
// to onPick and is compared with `active` (without id the label is used); level is how many steps the plate rises (default 1).
const parts = [{ selector: ".m-avatar", label: "Avatar", id: "avatar" }, { selector: ".m-badge", label: "Rozet", level: 2 }]

// startOpen: the preview starts apart, so open and the tags are visible at once; the tests start together.
export function ExplodedViewLab(props: { startOpen?: boolean }) {
  // $open is the apart / together state, $picked the id of the plate last pressed.
  let $open = props.startOpen ?? true
  let $picked = ""
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button size="sm" class="lab-flip" on:click={() => $open = !$open}>{$open ? "Kapat" : "Ayır"}</Button>
    {/* Layer mode (no `parts`): target picks the element to take apart, here the Save button.
            - open + setOpen: the state; setOpen is the setter that makes `open` two-way (bind:open uses the same pair); we write it back to $open.
            - label: the accessible name of the group while apart; class: a class on the root.
            - tags={false}: no name tags; gap: px between two plates; tilt: degrees of the tilt ({ x, z }).
            - fit={false}: do not scale the content down to fit; motion="none": no movement (the choices are smooth, spring
              and none; the movement is CSS transitions, so reduced motion makes it instant anyway).
            - layers: a name per layer, or false to leave one out (here the focus ring is left out and the surface is renamed).
            - onPick(id): a plate was pressed while apart; active: the plate shown as chosen. */}
    <ExplodedView class="lab-ev" open={$open} setOpen={(v: boolean) => $open = v} target=".lab-save" label="Düğmenin katmanları" tags={false} gap={20}
      tilt={{ x: 46, z: -24 }} fit={false} motion="none" layers={{ ring: false, surface: "Zemin" }} onPick={(id: string) => $picked = id} active={$picked}>
      <div sx={{ flex: "row", gap: 2 }}>
        <Button size="sm">Vazgeç</Button>
        <Button class="lab-save" icon={undefined}>Kaydet <Badge>2</Badge></Button>
      </div>
    </ExplodedView>
    {/* Parts mode: the avatar and the badge rise as separate plates, the badge two steps (level: 2). The content does not
            take presses while apart; a press picks the plate under it. */}
    <ExplodedView class="lab-parts" open={$open} parts={parts} label="Profil kartının parçaları" onPick={(id: string) => $picked = id} active={$picked}>
      <Card>
        <div sx={{ flex: ["row", "center"], gap: 2 }}><Avatar name="Elif Arslan" /><strong>Elif Arslan</strong><Badge tone="success">Etkin</Badge></div>
      </Card>
    </ExplodedView>
    <span class="lab-state">{$open ? "ayrık" : "birleşik"} · seçilen: {$picked || "—"}</span>
  </div>
}
