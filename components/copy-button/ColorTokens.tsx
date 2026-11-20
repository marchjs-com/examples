import { CopyButton, Card } from "march/ui"

// renk paleti: her satırda tokenin rengi, adı ve tek dokunuşla kopyala; kopyalanınca düğme o tokenin rengine bürünür
const tokens = ["brand-orange", "brand-blue", "brand-green", "brand-purple", "brand-pink"] as const

const TokenRow = (props: { token: (typeof tokens)[number] }) => <div sx={{ flex: ["row", "center"], gap: 2 }}>
  <span sx={{ color: props.token, text: "2xl" }} aria-hidden="true">●</span>
  <code sx={{ text: "sm" }}>{`--m-${props.token}`}</code>
  <CopyButton text={`var(--m-${props.token})`} iconOnly label={`${props.token} kopyala`} copiedLabel={`${props.token} panoda`} copiedColor={props.token} />
</div>

export function ColorTokens() {
  return <Card title="HADİ renkleri" m:theme="night">
    <div sx={{ flex: "col", gap: 1 }}>{tokens.map((t) => <TokenRow token={t} />)}</div>
  </Card>
}
