// NightReader: the creative-minimal AppShell example.
//
// A night-reading app: a sidebar with the library and a page of text, all on a dark surface. It shows the smallest
// useful AppShell (just `nav` and content) and how m:theme="night" on a wrapper gives everything inside dark colours.
// Use the pattern for a compact app frame with one side column.
import { AppShell, Card } from "march/ui"

export function NightReader() {
  // m:theme="night" is a common prop: it switches the theme for the Card and everything inside it, so the shell
  // needs no dark-mode code of its own. features={[]} keeps AppShell to the bare frame; `nav` is the sidebar and the
  // children are the main area. The text sizes use sx tokens (lg, bold, sm), so they follow the theme's scale.
  return <Card m:theme="night">
    <AppShell features={[]} nav={<div sx={{ flex: "col", gap: 1, p: 2 }}><strong>Kitaplık</strong><span>Okunanlar</span><span>Notlar</span></div>}>
      <article sx={{ p: 3 }}><h3 sx={{ text: ["lg", "bold"] }}>Birinci bölüm</h3><p sx={{ text: "sm" }}>Gece yarısı, şehir sustuğunda…</p></article>
    </AppShell>
  </Card>
}
