import { Layout, Badge, useLayout } from "march/ui"

// Layout'un bölgeleri ve seçenekleri: top, header, nav, aside, footer, corners, features, titleTemplate, framed, mainId,
// labels, skipLink, asideToggle, class ve içerik
const Box = (props: { children?: unknown }) => <div class="sc-ld-box">{props.children}</div>
// içerideki bileşenler useLayout() ile düzene ulaşır: burada başlık kalıbını yazar
const Template = () => <span class="lab-template">Başlık kalıbı: {useLayout()?.titleTemplate}</span>

export function LayoutLab() {
  // corners: sayfanın köşelerine içerik (top-start, top-end, bottom-start, bottom-end; bir düğüm ya da liste)
  // titleTemplate: içindeki sayfaların (Page title) belge başlığı kalıbı, %s sayfanın adı
  // skipLink: klavye için "İçeriğe atla" bağlantısı (false: çizilmez)
  // asideToggle={false}: dar ekranda yan alanı açan köşe düğmesi çizilmez; aside'a data-open vererek kendin açarsın
  return <Layout class="lab-layout" features={[]} framed mainId="lab-main" labels={{ skip: "İçeriğe atla" }}
    corners={{ "bottom-start": <Badge class="lab-corner">Taslak</Badge> }} titleTemplate="%s · Laboratuvar" skipLink asideToggle={false}
    top={<Box>Duyuru</Box>} header={<Box>Üst bilgi</Box>} nav={<Box>Gezinme</Box>} aside={<Box>Yan alan</Box>} footer={<Box>Alt bilgi</Box>}>
    <Box>Ana içerik <Template /></Box>
  </Layout>
}
