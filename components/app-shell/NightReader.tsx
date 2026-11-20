import { AppShell, Card } from "march/ui"

// gece okuma uygulaması: koyu temada kenar çubuğu ve kayan sayfa
export function NightReader() {
  return <Card m:theme="night">
    <AppShell features={[]} nav={<div sx={{ flex: "col", gap: 1, p: 2 }}><strong>Kitaplık</strong><span>Okunanlar</span><span>Notlar</span></div>}>
      <article sx={{ p: 3 }}><h3 sx={{ text: ["lg", "bold"] }}>Birinci bölüm</h3><p sx={{ text: "sm" }}>Gece yarısı, şehir sustuğunda…</p></article>
    </AppShell>
  </Card>
}
