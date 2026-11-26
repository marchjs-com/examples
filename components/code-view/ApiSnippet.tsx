// ApiSnippet: the real-life CodeView example.
//
// What it shows: the example of an API page. The same request is given in three forms (cURL, fetch, and the response);
// a Segmented control chooses one and a CodeView shows it with line numbers, syntax colours, a language label and
// copy / wrap buttons.
// When to use this pattern: documentation where the reader copies code. CodeView is read-only; the text is inserted
// as text nodes, never as HTML, so snippets cannot inject markup.
// Accessibility: the code area is named by `label` and can be scrolled from the keyboard; the toolbar texts
// (copyLabel, wrapLabel) are yours to translate.
import { CodeView, Segmented, Card } from "march/ui"

// One entry per format: `lang` picks the syntax colours, `file` is shown in the toolbar (langLabel) and used in the
// accessible name, `code` is the text.
const SNIPPETS: Record<string, { lang: string; file: string; code: string }> = {
  curl: { lang: "sh", file: "terminal", code: `# yeni sipariş
curl -X POST https://api.ornek.dev/v1/siparis \
  -H "Authorization: Bearer $TOKEN" \
  -d '{ "urun": "kahve", "adet": 2 }'` },
  fetch: { lang: "ts", file: "siparis.ts", code: `const yanit = await fetch("https://api.ornek.dev/v1/siparis", {
  method: "POST",
  headers: { Authorization: "Bearer " + token },
  body: JSON.stringify({ urun: "kahve", adet: 2 }),
})
const siparis = await yanit.json()` },
  yanit: { lang: "json", file: "201 Created", code: `{
  "id": "sp_8421",
  "durum": "hazırlanıyor",
  "tahmini": "12 dk"
}` },
}

export function ApiSnippet() {
  let $kind = "curl"
  return <Card title="Sipariş oluştur" subtitle="POST /v1/siparis">
    <div sx={{ flex: "col", gap: 2 }}>
      {/* Segmented picks the format; onChange gives the new value, which we store as text. */}
      <Segmented aria-label="Örnek biçimi" value={$kind} onChange={(v: unknown) => $kind = String(v)}
        options={[{ value: "curl", label: "cURL" }, { value: "fetch", label: "fetch" }, { value: "yanit", label: "Yanıt" }]} />
      {/* A function child re-runs when $kind changes, so the CodeView is redrawn with the chosen snippet.
          langLabel replaces the language name in the toolbar, copyLabel / wrapLabel are the button texts and label
          is the accessible name of the code area. */}
      {() => {
        const s = SNIPPETS[$kind]!
        return <CodeView code={s.code} lang={s.lang} langLabel={s.file} copyLabel="Kopyala" wrapLabel="Kaydır" label={`${s.file} örneği`} />
      }}
    </div>
  </Card>
}
