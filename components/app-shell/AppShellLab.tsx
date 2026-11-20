import { AppShell } from "march/ui"

// AppShell, Layout'un çerçeveli (framed) hâli: top, header, nav, aside, footer, mainId, labels, features, class ve içerik
const Box = (props: { children?: unknown }) => <div class="sc-ld-box">{props.children}</div>

export function AppShellLab() {
  return <AppShell class="lab-shell" features={[]} mainId="lab-shell-main" labels={{ skip: "İçeriğe geç" }}
    top={<Box>Duyuru</Box>} header={<Box>Üst bilgi</Box>} nav={<Box>Gezinme</Box>} aside={<Box>Yan alan</Box>} footer={<Box>Alt bilgi</Box>}>
    <Box>Sayfa</Box>
  </AppShell>
}
