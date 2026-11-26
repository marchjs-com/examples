// IconPickerLab: the full-featured IconPicker example; it uses every prop at least once.
//
// Props shown here: the button with a panel (label, placeholder, size sm / md), value and onChange; the inline panel with
// your own icons (icons, setLabel), paging (pageSize), no filter chips (groups={false}), no "no icon" choice (none={false});
// your own filter chips (groups); extra icon sets (packs, loaded when chosen, with values like "id:name"); class and a dark
// surface.
// Use it as a reference when you need one option: find the prop below and copy the line.
// IconPickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { IconPicker, Card } from "march/ui"
import { star, sun, moon, coffee, music, gift, zap, smile, arrowUp, arrowDown, arrowLeft, arrowRight, user, users, userCheck, crown, trophy, diamond, sparkles } from "march/icons"

// Two small sets of icons (name -> icon) used for the inline pickers.
const picks = { star, sun, moon, coffee, music, gift, zap, smile }
const mixed = { arrowUp, arrowDown, arrowLeft, arrowRight, user, users, userCheck }
// Your own filter chips: { id, label, match }. match is a RegExp tested against the icon name, or a function of the name.
// Here one chip for names starting with "arrow" and one for names starting with "user".
const myGroups = [
  { id: "arrows", label: "Oklar", match: /^arrow/ },
  { id: "people", label: "Kişiler", match: (name: string) => name.startsWith("user") },
]
// An extra icon set (a pack): { id, label, count, load }. load returns a promise of name -> icon and runs only when the set is
// first chosen (or when the value names it). A real one would import a module or fetch; here it waits 300 ms and gives four icons.
const hadiPack = { id: "hadi", label: "HADİ", count: 4, load: () => new Promise<Record<string, typeof crown>>((done) => setTimeout(() => done({ crown, trophy, diamond, sparkles }), 300)) }

// A small layout helper: a muted caption above the content. It only organises the lab.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function IconPickerLab() {
  // State: one value per picker (the name of the chosen icon, or null).
  let $menu: string | null = "plus"
  let $pick: string | null = null
  let $person: string | null = "user"
  let $badge: string | null = "hadi:crown"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* 1. The default: a button that opens a panel. label is the accessible name (the button's name also says the chosen icon),
        placeholder the hint of the search, size "md" or "sm" the button size. The first picker searches every built-in icon. */}
    <Section title="Düğme arkasında (md ve sm)">
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <IconPicker value={$menu} onChange={(n: string | null) => $menu = n} label="Menü ikonu" placeholder="Bütün ikonlarda ara" size="md" />
        <IconPicker value={$menu} onChange={(n: string | null) => $menu = n} label="Küçük menü ikonu" size="sm" />
        <span>Menü: {$menu ?? "yok"}</span>
      </div>
    </Section>
    {/* 2. Inline: the panel sits right in the page, without the button. icons: our own set; setLabel: its name in the set list.
        pageSize={6}: six icons are drawn at once (more as you scroll to the end). groups={false}: no filter chips. none={false}:
        no "no icon" choice. class: a hook on the panel for tests and CSS. */}
    <Section title="Satır içi seçki: sayfa 6, süzgeçsiz, simge yok seçeneği yok">
      <IconPicker inline icons={picks} setLabel="Seçki" pageSize={6} groups={false} none={false} class="lab-picks"
        value={$pick} onChange={(n: string | null) => $pick = n} label="Seçki ikonu" placeholder="Seçkide ara" />
      <span>Seçki: {$pick ?? "yok"}</span>
    </Section>
    {/* 3. Your own filter chips: groups takes our list (see myGroups). The chips filter the grid. */}
    <Section title="Kendi süzgeç çipleri">
      <IconPicker inline icons={mixed} groups={myGroups} class="lab-people" value={$person} onChange={(n: string | null) => $person = n} label="Kişi ikonu" placeholder="Kişilerde ara" />
      <span>Kişi: {$person ?? "yok"}</span>
    </Section>
    {/* A dark surface (m:theme="night"). */}
    <Card m:theme="night">
      {/* 4. An extra set: packs adds a chip for the set; it loads only when chosen or when the value names it (here the value
          "hadi:crown" does, so it loads at once). A value from a set is "id:name". */}
      <Section title="Ek set (packs), koyu zemin">
        <IconPicker inline icons={picks} setLabel="Seçki" packs={[hadiPack]} groups={false} class="lab-packs" value={$badge} onChange={(n: string | null) => $badge = n} label="Rozet ikonu" placeholder="Rozetlerde ara" />
        <span>Rozet: {$badge ?? "yok"}</span>
      </Section>
    </Card>
  </div>
}
