import { MadeWithMarch, Card } from "march/ui"

// MadeWithMarch'ın bütün özellikleri: variant (text, badge, small), heart (true, false, kendi işaretin), heartLabel,
// link (bağlantının kendi metni), href (kendi adresin), text ((link, heart) => kendi cümlen), class ve ortak m:color, m:theme
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function MadeWithMarchLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Görünüm: text, badge, small">
      <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
        <MadeWithMarch class="lab-text" />
        <MadeWithMarch variant="badge" class="lab-badge" />
        <MadeWithMarch variant="small" />
      </div>
    </Row>
    <Row title="Kalp: kendi işaretin ve adı, ya da hiç">
      <MadeWithMarch heart="☕" heartLabel="Kahve" class="lab-coffee" />
      <MadeWithMarch heart={false} class="lab-noheart" />
    </Row>
    <Row title="Kendi bağlantın ve cümlen">
      <MadeWithMarch link="March çatısı" href="https://marchjs.com" class="lab-link" m:color="brand-purple" />
      <MadeWithMarch text={(link: unknown, heart: unknown) => <span>Bu sayfa {link} üzerine kuruldu {heart}</span>} heart="🚀" heartLabel="Roket" class="lab-own" />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <MadeWithMarch variant="badge" m:color="brand-orange" />
      </Row>
    </Card>
  </div>
}
