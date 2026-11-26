// WeekWeather: the creative-minimal Tabs example.
//
// What it shows: the weather of the week. Each day is one <Tab> in a rounded "pill" switch, and the panel slides in from
// the side of the day you picked (from the right when you go forward, from the left when you go back).
// When to use this pattern: a handful of equal views where the order matters, written declaratively: Tabs with <Tab>
// children (id, label, icon and the panel as the child). Here the children are generated from data with map().
//
// Animation: motion="slide" plays on every switch and comes from the side of the new tab. Other choices are "none",
// "fade" and "rise", or your own function (see TabsLab). The visitor's reduced-motion preference switches the panel
// without motion.
// Accessibility: role="tablist" with role="tab" buttons and one role="tabpanel" labelled by the active tab. Only the active
// tab is a Tab stop; the arrow keys, Home and End move between tabs and activate them (mirrored in RTL).
import { Tabs, Tab } from "march/ui"

// The data of the week: tab id, short label, an emoji used as the tab's icon, the temperature and a description.
const DAYS = [
  { id: "mon", label: "Pzt", icon: "☀️", temp: 24, say: "Güneşli, hafif rüzgâr" },
  { id: "tue", label: "Sal", icon: "⛅", temp: 21, say: "Parçalı bulutlu" },
  { id: "wed", label: "Çar", icon: "🌧️", temp: 17, say: "Öğleden sonra yağmur" },
  { id: "thu", label: "Per", icon: "⛈️", temp: 15, say: "Gök gürültülü sağanak" },
  { id: "fri", label: "Cum", icon: "🌈", temp: 19, say: "Yağmur sonrası gökkuşağı" },
]

export function WeekWeather() {
  // label: the accessible name of the tab list. variant="pill": a rounded switch with the active tab raised. motion="slide":
  // the panel comes from the side of the new tab. No `value` is given, so the first tab is active at the start.
  return <Tabs label="Haftanın havası" variant="pill" motion="slide">
    {/* One <Tab> per day: id identifies it, label and icon are drawn in the tab button, and its children are the panel
        (only the active panel exists in the page). */}
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
