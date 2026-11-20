import { OptionList, Card, Badge, Kbd, TextInput } from "march/ui"
import { signal } from "march"
import { sun, moon, monitor, star, copy, pin, trash, heart } from "march/icons"

// OptionList'in bütün özellikleri: options (icon, hint, trailing, group, disabled), bind:value / setValue, onPick,
// multiple, mode (radio / listbox / menu), keysFrom ve active, keys={false}, overflow, label, id, check (tik, yok,
// kendi ikonun, fonksiyon), columns, size, inline, empty, renderOption ve class
const themes = [
  { value: "light", label: "Açık", icon: sun, hint: "Gündüz için", group: "Hazır" },
  { value: "dark", label: "Koyu", icon: moon, hint: "Gözü yormaz", group: "Hazır" },
  { value: "system", label: "Sistem", icon: monitor, hint: "Cihazı izler", group: "Hazır", trailing: <Badge tone="info">yeni</Badge> },
  { value: "contrast", label: "Yüksek karşıtlık, çok uzun bir etiketle", icon: star, hint: "Yakında", group: "Kendi", disabled: true },
]
const actions = [
  { value: "copy", label: "Kopyala", icon: copy, trailing: <Kbd>Ctrl C</Kbd> },
  { value: "pin", label: "Sabitle", icon: pin },
  { value: "delete", label: "Sil", icon: trash, hint: "Geri alınamaz" },
]
const tags = ["tasarım", "ürün", "yayın", "destek"].map((t) => ({ value: t, label: t }))

// bir bölüm: başlık ve altında içerik
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function OptionListLab() {
  let $theme = "dark"
  let $tags = ["ürün"]
  let $did = "—"
  let $q = ""
  let input: HTMLInputElement | undefined
  const hi = signal(0)
  const driven = signal(1)
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Tek seçim (radio), gruplar, ikon, açıklama, sondaki parça, devre dışı, uzun etiket, id">
      <OptionList bind:value={$theme} options={themes} label="Tema" id="lab-theme" class="lab-theme" overflow="wrap" />
      <span>{`Tema: ${$theme}`}</span>
    </Section>
    <Section title="Çoklu seçim (listbox), iki sütun, küçük boy, kendi işaretin">
      <OptionList multiple options={tags} value={$tags} setValue={(v: string[]) => { $tags = v }} columns={2} size="sm" check={heart} label="Etiketler" />
      <span>{`Etiketler: ${$tags.join(", ") || "—"}`}</span>
    </Section>
    <Section title="Komut menüsü (menu), açıklama yanda, onPick">
      <OptionList mode="menu" options={actions} inline onPick={(v: string) => { $did = v }} label="İşlemler" />
      <span>{`Son işlem: ${$did}`}</span>
    </Section>
    <Section title="Alanın tuşlarıyla (keysFrom + active), boş liste metni, işaretsiz">
      <TextInput bind:value={$q} aria-label="Tema ara" placeholder="Tema ara" ref={(el: HTMLInputElement) => { input = el }} />
      <OptionList keysFrom={() => input} active={hi} options={() => themes.filter((t) => t.label.toLowerCase().includes($q.toLowerCase()))}
        bind:value={$theme} check={false} empty="Eşleşen tema yok" label="Arama sonuçları" />
      <span>{`Vurgulanan: ${hi()}`}</span>
    </Section>
    <Card m:theme="night">
      <Section title="Sahibi yönetir (keys={false}), kendi satır çizimi (renderOption), fonksiyon işaret">
        <OptionList keys={false} active={driven} options={themes.slice(0, 3)} value={$theme} label="Koyu tema listesi" id="lab-driven"
          check={() => <span>✓</span>}
          renderOption={(o: { label: unknown }, st: { active: () => boolean; selected: () => boolean }) => <span sx={{ flex: "row", gap: 2 }}>{o.label as string}{st.active() ? " ←" : ""}{st.selected() ? " (seçili)" : ""}</span>} />
      </Section>
    </Card>
  </div>
}
