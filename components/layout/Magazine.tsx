import { Layout } from "march/ui"

// dergi sayfası: üst bilgi, yan alanda içindekiler, altta künye; köşe denetimleri kapalı (features={[]})
const Box = (props: { children?: unknown }) => <div sx={{ p: 2, radius: 2 }} class="sc-ld-box">{props.children}</div>

export function Magazine() {
  return <Layout features={[]} header={<Box>HADİ Dergi · Kasım</Box>} aside={<Box>İçindekiler</Box>} footer={<Box>© HADİ</Box>}>
    <article sx={{ p: 2 }}>
      <h3 sx={{ text: ["lg", "bold"] }}>Sinyallerle düşünmek</h3>
      <p sx={{ text: "sm" }}>Bir değer değişince yalnız ona bağlı olan yer yeniden çizilir.</p>
    </article>
  </Layout>
}
