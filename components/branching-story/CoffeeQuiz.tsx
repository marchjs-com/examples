import { BranchingStory } from "march/landing"
import { Button, toast } from "march/ui"
import { coffee } from "march/icons"

// bir kahve markasının sitesinde "hangi çekirdek sana göre?" testi: her son bir ürüne çıkar
export function CoffeeQuiz() {
  return <BranchingStory start="sabah" label="Kahve testi" transition="slide" minHeight="16rem"
    labels={{ start: "Başla", restart: "Testi yeniden çöz", endingPrefix: "Sana göre: ", endings: (n: number, total: number) => `${total} çekirdekten ${n} tanesini keşfettin` }}
    action={<Button icon={coffee} on:click={() => toast("Sepete eklendi")}>Sepete ekle</Button>}
    passages={{
      sabah: { title: "Kahveni nasıl içersin?", body: "Önce alışkanlığını öğrenelim.", choices: [
        { label: "Sade, filtre", note: "bol bardak", to: "filtre" }, { label: "Sütlü", note: "latte, flat white", to: "sutlu" }] },
      filtre: { title: "Hangi tat?", body: "Filtre kahvede tat notaları belirgin olur.", choices: [
        { label: "Meyvemsi, asidik", to: "etiyopya" }, { label: "Çikolatalı, yumuşak", to: "brezilya" }] },
      sutlu: { title: "Ne kadar sert?", body: "Süt bazı çekirdeklerin tadını örter.", choices: [
        { label: "Sert olsun", to: "sumatra" }, { label: "Dengeli", to: "brezilya" }] },
      etiyopya: { title: "Etiyopya Yirgacheffe", ending: "Etiyopya", color: "brand-orange", body: "Yasemin ve limon notaları. 250 g · 340 ₺" },
      brezilya: { title: "Brezilya Santos", ending: "Brezilya", color: "brand-gold", body: "Kakao ve fındık. 250 g · 290 ₺" },
      sumatra: { title: "Sumatra Mandheling", ending: "Sumatra", color: "brand-purple", body: "Toprak ve baharat, gövdeli. 250 g · 320 ₺" },
    }} />
}
