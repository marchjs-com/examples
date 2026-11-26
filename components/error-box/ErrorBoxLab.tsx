// ErrorBoxLab: the full-featured ErrorBox example; it uses every prop at least once.
//
// Props shown here: error (an Error, a text, or a getter), message (used when there is no error), title, retry,
// retryLabel (text or a node), class; with none of them the box has a default text.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ErrorBoxLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ErrorBox, Card } from "march/ui"
import { Icon, refresh } from "march/icons"

// $count counts retries; $code feeds the getter error below.
export function ErrorBoxLab() {
  let $count = 0
  let $code = 500
  return <div sx={{ flex: "col", gap: 2 }}>
    <p>Yeniden deneme: <b>{() => $count}</b></p>
    {/* error as an Error object: its message is shown. retry adds a "Retry" button (translated) and runs the handler. */}
    <ErrorBox title="Error nesnesi" error={new Error("Bağlantı reddedildi")} retry={() => $count++} />
    {/* error as plain text; no retry, so no button. */}
    <ErrorBox title="Metin hatası" error="Dosya bulunamadı (404)" />
    {/* error as a getter: the text follows $code. retryLabel changes what the button says. */}
    <ErrorBox title="Erişimci" error={() => `Sunucu hatası (${$code})`} retry={() => { $count++; $code++ }} retryLabel="Kodu artır" />
    {/* message is used when there is no `error`. retryLabel can be a node (an icon and a word); class goes on the root.
            The box has role="alert", so a screen reader announces it when it appears. */}
    <ErrorBox message="Yalnız message: error verilmedi." retry={() => $count++}
      retryLabel={<span sx={{ flex: ["row", "center"], gap: 1 }}><Icon of={refresh} /> Yenile</span>} class="lab-error" />
    {/* With no props at all the box says its default text; m:theme="night" draws it in the dark theme. */}
    <Card m:theme="night">
      <ErrorBox />
    </Card>
  </div>
}
