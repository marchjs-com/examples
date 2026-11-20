import { Window } from "march/ui"

// eski usul masaüstü: Windows görünümünde iki pencere; kapatılan pencere sayılır
export function RetroDesk() {
  let $closed = 0
  return <div style={{ position: "relative", "block-size": "20rem" }}>
    <Window title="Hesap makinesi" chrome="windows" x={16} y={16} width={220} height={150} onClose={() => $closed++}>
      <p sx={{ p: 2, text: ["lg", "mono"] }}>2 + 2 = 4</p>
    </Window>
    <Window title="Not defteri" chrome="windows" x={180} y={90} width={240} height={150} onClose={() => $closed++}>
      <p sx={{ p: 2 }}>{$closed} pencere kapandı</p>
    </Window>
  </div>
}
