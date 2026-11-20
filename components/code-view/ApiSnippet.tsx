import { CodeView, Segmented, Card } from "march/ui"

// bir API belgesindeki örnek: aynı istek üç biçimde; geliştirici birini seçer, kopyalar, yapıştırır
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
      <Segmented aria-label="Örnek biçimi" value={$kind} onChange={(v: unknown) => $kind = String(v)}
        options={[{ value: "curl", label: "cURL" }, { value: "fetch", label: "fetch" }, { value: "yanit", label: "Yanıt" }]} />
      {() => {
        const s = SNIPPETS[$kind]!
        return <CodeView code={s.code} lang={s.lang} langLabel={s.file} copyLabel="Kopyala" wrapLabel="Kaydır" label={`${s.file} örneği`} />
      }}
    </div>
  </Card>
}
