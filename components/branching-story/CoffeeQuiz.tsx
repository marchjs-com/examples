// CoffeeQuiz: the real-life BranchingStory example.
//
// A "which beans suit you?" quiz on a coffee brand's site: two questions lead to one of three products, and each ending
// carries an action (add to basket). Use this pattern for product finders and onboarding questionnaires: the passages
// are plain data, the endings are the results, and `action` turns a result into a next step.
import { BranchingStory } from "march/landing"
import { Button, toast } from "march/ui"
import { coffee } from "march/icons"

export function CoffeeQuiz() {
  // The props, in order:
  // - start: the first passage id. label: the accessible name of the story. minHeight keeps the stage steady between
  //   passages. transition="slide" changes passages with a slide (reduced motion swaps them without it).
  // - labels: the story's own texts, reworded for a quiz: the start crumb, the restart button, the prefix of an
  //   ending's name, and the endings counter as a function of how many were found and how many exist.
  // - action: shown next to the restart button at an ending; here a Button with an icon that adds the product.
  // - passages: questions have `choices` ({ label, note, to }); a passage with an `ending` is a result, and its `color`
  //   tints that result. Every `to` must be the id of another passage.
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
