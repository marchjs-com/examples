import { Testimonials } from "march/landing"

// bir lokantanın yorum duvarı: altı yorumdan fazlası "Hepsini göster" ile açılır
export function RestaurantWall() {
  return <Testimonials variant="wall" ratingColor="brand-orange" labels={{ more: "Hepsini göster", less: "Daralt" }} items={[
    { quote: "Hünkâr beğendi annemin yaptığından iyi; bunu ona söylemeyin.", name: "Selim Öz", role: "Beşiktaş", rating: 5 },
    { quote: "Öğle arasında 15 dakikada çıktım, hem de doyarak.", name: "Gizem Ay", role: "Mecidiyeköy", rating: 5 },
    { quote: "Mercimek çorbası tam kıvamında, limonu bol.", name: "Hakan Er", rating: 4 },
    { quote: "Garsonlar ismimizi hatırlıyor, ayrı bir keyif.", name: "Nur Kaya", role: "Her cuma buradayız", rating: 5 },
    { quote: "İzmir köfte ve pilav: başka söze gerek yok.", name: "Ozan Tek", rating: 5 },
    { quote: "Tatlılar ev yapımı, kazandibi efsane.", name: "Ela Sarı", role: "Tatlı avcısı", rating: 5 },
    { quote: "Fiyatlar semtin en makulü.", name: "Kerem Bal", rating: 4 },
    { quote: "Paket servis bile sıcak geldi.", name: "Defne Uz", role: "Levent", rating: 5 },
  ]} />
}
