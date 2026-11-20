import { Tabs, Tab } from "march/ui"

// haftanın havası: her gün bir <Tab>; hap görünümde, panel yeni günün yanından kayarak gelir (ileri ya da geri)
const DAYS = [
  { id: "mon", label: "Pzt", icon: "☀️", temp: 24, say: "Güneşli, hafif rüzgâr" },
  { id: "tue", label: "Sal", icon: "⛅", temp: 21, say: "Parçalı bulutlu" },
  { id: "wed", label: "Çar", icon: "🌧️", temp: 17, say: "Öğleden sonra yağmur" },
  { id: "thu", label: "Per", icon: "⛈️", temp: 15, say: "Gök gürültülü sağanak" },
  { id: "fri", label: "Cum", icon: "🌈", temp: 19, say: "Yağmur sonrası gökkuşağı" },
]

export function WeekWeather() {
  return <Tabs label="Haftanın havası" variant="pill" motion="slide">
    {DAYS.map((d) => <Tab id={d.id} label={d.label} icon={d.icon}>
      <div sx={{ flex: ["row", "center"], gap: 3, p: 2 }}>
        <span sx={{ text: "2xl" }}>{d.icon}</span>
        <div sx={{ flex: "col" }}>
          <strong sx={{ text: "xl" }}>{d.temp}°</strong>
          <span sx={{ color: "muted" }}>{d.say}</span>
        </div>
      </div>
    </Tab>)}
  </Tabs>
}
