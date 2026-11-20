import { EasingCurveEditor, Card } from "march/ui"

// EasingCurveEditor'ın bütün özellikleri bir arada: value + onChange, name, presets (kendi listen ya da hiç),
// duration, preview (move / scale / fade / none), compact, labels, inputs, cssLine, nameNote, grid, handleColors,
// class, readonly, disabled ve aria-label
type Bezier = [number, number, number, number]
const mine = [{ name: "dalga", label: "Dalga", value: [0.45, 0, 0.55, 1] as Bezier }, { name: "firla", label: "Fırla", value: [0.2, 1.4, 0.4, 1] as Bezier }]

// bir editör ve üstünde adı
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function EasingCurveEditorLab() {
  let $curve = "cubic-bezier(.45, 0, .55, 1)"
  let $changes = 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <p>Eğri: <code>{() => $curve}</code> · değişiklik: <b>{() => $changes}</b></p>
    <Box title="Kendi hazır eğrilerim, kendi metinlerim, kayıtlı ad, belirme önizlemesi">
      <EasingCurveEditor value={$curve} onChange={(v: string) => { $curve = v; $changes++ }} name="lab-egri" presets={mine} preview="fade" duration={1200}
        aria-label="Laboratuvar eğrisi" class="lab-main" handleColors={["brand-purple", "brand-green"]}
        labels={{ firstHandle: "Baş tutamak", secondHandle: "Son tutamak", presets: "Benim eğrilerim",
          curve: (css: string) => `Eğri ${css}`, handleValue: (time: string, progress: string) => `zaman ${time}, ilerleme ${progress}`,
          controlPoint: (axis: string) => `Nokta ${axis}`, registered: (name: string) => `"${name}" adıyla kaydedildi` }} />
    </Box>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Box title="Sıkışık, ölçek önizlemesi">
        <EasingCurveEditor value="expo" compact preview="scale" aria-label="Sıkışık eğri" />
      </Box>
      <Card m:theme="night">
        <Box title="Yalın: hazırsız, sayısız, CSS'siz, ızgarasız, salt okunur">
          <EasingCurveEditor value="back" presets={false} inputs={false} cssLine={false} grid={false} name="gizli" nameNote={false} readonly preview="none" class="lab-bare" aria-label="Yalın eğri" />
        </Box>
      </Card>
      <Box title="Kapalı (disabled)">
        <EasingCurveEditor value="in-out" disabled preview="move" aria-label="Kapalı eğri" class="lab-off" />
      </Box>
    </div>
  </div>
}
