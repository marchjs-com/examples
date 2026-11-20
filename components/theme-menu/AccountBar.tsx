import { ThemeMenu, Toolbar, Avatar, Divider } from "march/ui"

// bir uygulamanın üst çubuğu: sağda ince bir görünüm menüsü (açık / koyu, tema, üç vurgu rengi); seçim bütün sayfaya uygulanır ve hatırlanır
export function AccountBar() {
  return <Toolbar label="Hesap" m:no-select>
    <span sx={{ text: "bold" }}>Panelim</span>
    <div sx={{ flex: "grow" }} />
    <ThemeMenu label="Görünüm" size="sm" accents={["primary", "brand-orange", "brand-blue"]} labels={{ theme: "Tema", accent: "Vurgu" }} />
    <Divider vertical />
    <Avatar name="Ada Yılmaz" size="sm" />
  </Toolbar>
}
