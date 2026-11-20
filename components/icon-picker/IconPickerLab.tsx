import { IconPicker, Card } from "march/ui"
import { star, sun, moon, coffee, music, gift, zap, smile, arrowUp, arrowDown, arrowLeft, arrowRight, user, users, userCheck, crown, trophy, diamond, sparkles } from "march/icons"

// IconPicker'ın bütün özellikleri bir arada: düğme arkasında panel (label, placeholder, size sm / md), value ve
// onChange; satır içi panel (inline) kendi ikon seçkisiyle (icons, setLabel), sayfa sayfa çizim (pageSize),
// süzgeçsiz (groups={false}) ve "simge yok"suz (none={false}); kendi süzgeç çipleri (groups); ek ikon seti (packs:
// seçilince yüklenir, değeri "id:ad"); class, koyu zemin
const picks = { star, sun, moon, coffee, music, gift, zap, smile }
const mixed = { arrowUp, arrowDown, arrowLeft, arrowRight, user, users, userCheck }
const myGroups = [
  { id: "arrows", label: "Oklar", match: /^arrow/ },
  { id: "people", label: "Kişiler", match: (name: string) => name.startsWith("user") },
]
// bir ek set: gerçekte bir ağ isteği, burada 300 ms bekleyip dört ikon verir
const hadiPack = { id: "hadi", label: "HADİ", count: 4, load: () => new Promise<Record<string, typeof crown>>((done) => setTimeout(() => done({ crown, trophy, diamond, sparkles }), 300)) }

// bir bölüm: başlığı ve altında içeriği
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function IconPickerLab() {
  let $menu: string | null = "plus"
  let $pick: string | null = null
  let $person: string | null = "user"
  let $badge: string | null = "hadi:crown"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Düğme arkasında (md ve sm)">
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <IconPicker value={$menu} onChange={(n: string | null) => $menu = n} label="Menü ikonu" placeholder="Bütün ikonlarda ara" size="md" />
        <IconPicker value={$menu} onChange={(n: string | null) => $menu = n} label="Küçük menü ikonu" size="sm" />
        <span>Menü: {$menu ?? "yok"}</span>
      </div>
    </Section>
    <Section title="Satır içi seçki: sayfa 6, süzgeçsiz, simge yok seçeneği yok">
      <IconPicker inline icons={picks} setLabel="Seçki" pageSize={6} groups={false} none={false} class="lab-picks"
        value={$pick} onChange={(n: string | null) => $pick = n} label="Seçki ikonu" placeholder="Seçkide ara" />
      <span>Seçki: {$pick ?? "yok"}</span>
    </Section>
    <Section title="Kendi süzgeç çipleri">
      <IconPicker inline icons={mixed} groups={myGroups} class="lab-people" value={$person} onChange={(n: string | null) => $person = n} label="Kişi ikonu" placeholder="Kişilerde ara" />
      <span>Kişi: {$person ?? "yok"}</span>
    </Section>
    <Card m:theme="night">
      <Section title="Ek set (packs), koyu zemin">
        <IconPicker inline icons={picks} setLabel="Seçki" packs={[hadiPack]} groups={false} class="lab-packs" value={$badge} onChange={(n: string | null) => $badge = n} label="Rozet ikonu" placeholder="Rozetlerde ara" />
        <span>Rozet: {$badge ?? "yok"}</span>
      </Section>
    </Card>
  </div>
}
