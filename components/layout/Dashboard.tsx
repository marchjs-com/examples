import { Layout, Button } from "march/ui"

// yönetim paneli: gezinme açılıp kapanır, yan alan isteğe bağlı; çerçeve framed ile her zaman çizilir
export function Dashboard() {
  let $nav = true
  let $aside = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $nav = !$nav}>{$nav ? "Gezinmeyi gizle" : "Gezinmeyi göster"}</Button>
      <Button size="sm" on:click={() => $aside = !$aside}>{$aside ? "Yan alanı kapat" : "Yan alanı aç"}</Button>
    </div>
    {() => <Layout features={[]} framed
      header={<div class="sc-ld-box">Panel</div>}
      nav={$nav ? <div class="sc-ld-box">Özet · Raporlar · Ayarlar</div> : undefined}
      aside={$aside ? <div class="sc-ld-box">Bildirimler</div> : undefined}>
      <div class="sc-ld-box sc-ld-main">Bu ayın satışları: 1.240</div>
    </Layout>}
  </div>
}
