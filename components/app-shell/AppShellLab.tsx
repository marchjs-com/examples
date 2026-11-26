// AppShellLab: the full-featured AppShell example; it uses every region and prop at least once.
//
// AppShell is Layout's framed form. Props shown here: top, header, nav, aside, footer, mainId, labels, features, class
// and the children (the main content). Use it as a reference when you need one specific option: find the prop below.
// AppShellLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { AppShell } from "march/ui"

// A small labelled box so each region is easy to see; "sc-ld-box" is the example site's own styling class.
const Box = (props: { children?: unknown }) => <div class="sc-ld-box">{props.children}</div>

export function AppShellLab() {
  // Each region is a prop: top (announcement strip above all), header, nav, aside (side area), footer; the children
  // are the main content. Regions you leave out are not drawn.
  // - mainId: the id of the main region; the built-in skip link targets it.
  // - labels={{ skip: … }}: the skip link's text, so you can translate or reword it.
  // - features={[]}: switches off the optional built-in extras (an empty list = just the frame).
  // - class="lab-shell": added to the root so your CSS or a test can find this instance.
  return <AppShell class="lab-shell" features={[]} mainId="lab-shell-main" labels={{ skip: "İçeriğe geç" }}
    top={<Box>Duyuru</Box>} header={<Box>Üst bilgi</Box>} nav={<Box>Gezinme</Box>} aside={<Box>Yan alan</Box>} footer={<Box>Alt bilgi</Box>}>
    <Box>Sayfa</Box>
  </AppShell>
}
