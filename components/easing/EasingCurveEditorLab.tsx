// EasingCurveEditorLab: the full-featured EasingCurveEditor example; it uses every prop at least once.
//
// Props shown here: value + onChange, name, presets (your own list, or none), duration, preview (move / scale / fade /
// none), compact, labels, inputs, cssLine, nameNote, grid, handleColors, class, readonly, disabled and aria-label.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// EasingCurveEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { EasingCurveEditor, Card } from "march/ui"

// A cubic-bezier is four numbers: [x1, y1, x2, y2], the two control points (the two handles).
type Bezier = [number, number, number, number]
// Your own presets: { name, label, value }. They replace the engine's named curves in the preset row.
const mine = [{ name: "dalga", label: "Dalga", value: [0.45, 0, 0.55, 1] as Bezier }, { name: "firla", label: "Fırla", value: [0.2, 1.4, 0.4, 1] as Bezier }]

// A layout helper: a caption above each editor.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

// $curve is the CSS value (a cubic-bezier() string); $changes counts onChange calls.
export function EasingCurveEditorLab() {
  let $curve = "cubic-bezier(.45, 0, .55, 1)"
  let $changes = 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <p>Eğri: <code>{() => $curve}</code> · değişiklik: <b>{() => $changes}</b></p>
    {/* The main editor:
              - value + onChange: one-way; the value is a cubic-bezier() string or the name of an engine curve (expo, back...).
              - name: registers the curve in the motion engine under that name, so any animation can use it by name.
              - presets: your own list; preview="fade" shows the curve on an opacity change; duration: preview time in ms.
              - aria-label / class: the accessible name and a class on the root. handleColors: colour tokens of the handles.
              - labels: your own words (any subset): handle names, preset group, curve text, the handle value text, the
                control point name and the "registered" note. */}
    <Box title="Kendi hazır eğrilerim, kendi metinlerim, kayıtlı ad, belirme önizlemesi">
      <EasingCurveEditor value={$curve} onChange={(v: string) => { $curve = v; $changes++ }} name="lab-egri" presets={mine} preview="fade" duration={1200}
        aria-label="Laboratuvar eğrisi" class="lab-main" handleColors={["brand-purple", "brand-green"]}
        labels={{ firstHandle: "Baş tutamak", secondHandle: "Son tutamak", presets: "Benim eğrilerim",
          curve: (css: string) => `Eğri ${css}`, handleValue: (time: string, progress: string) => `zaman ${time}, ilerleme ${progress}`,
          controlPoint: (axis: string) => `Nokta ${axis}`, registered: (name: string) => `"${name}" adıyla kaydedildi` }} />
    </Box>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      {/* compact: a small curve beside the numbers (as in an inspector); value="expo" is an engine curve name;
                preview="scale" shows the curve on a size change. */}
      <Box title="Sıkışık, ölçek önizlemesi">
        <EasingCurveEditor value="expo" compact preview="scale" aria-label="Sıkışık eğri" />
      </Box>
      {/* The bare editor, on a dark card (m:theme="night" draws this subtree in the dark theme): presets={false}, inputs={false},
              cssLine={false} and grid={false} remove those parts; nameNote={false} hides the registered note; readonly shows the
              curve without letting it be changed; preview="none" leaves out the preview. */}
      <Card m:theme="night">
        <Box title="Yalın: hazırsız, sayısız, CSS'siz, ızgarasız, salt okunur">
          <EasingCurveEditor value="back" presets={false} inputs={false} cssLine={false} grid={false} name="gizli" nameNote={false} readonly preview="none" class="lab-bare" aria-label="Yalın eğri" />
        </Box>
      </Card>
      {/* disabled switches the whole editor off. */}
      <Box title="Kapalı (disabled)">
        <EasingCurveEditor value="in-out" disabled preview="move" aria-label="Kapalı eğri" class="lab-off" />
      </Box>
    </div>
  </div>
}
