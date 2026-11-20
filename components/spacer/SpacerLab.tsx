import { Spacer, Button } from "march/ui"

// Spacer prop almaz: kendinden sonrakileri satırın mantıksal sonuna iter; iki Spacer kalan yeri eşit böler
export function SpacerLab() {
  return <div sx={{ flex: "col", gap: 3 }}>
    <div class="lab-one" sx={{ flex: ["row", "center"], gap: 2 }}><Button>Baş</Button><Spacer /><Button>Son</Button></div>
    <div class="lab-two" sx={{ flex: ["row", "center"], gap: 2 }}><Button>Sol</Button><Spacer /><Button>Orta</Button><Spacer /><Button>Sağ</Button></div>
  </div>
}
