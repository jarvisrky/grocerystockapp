import { NextResponse } from "next/server"

export async function GET() {
  const now = new Date()
  const data = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now)
    d.setDate(now.getDate() - (30 - i))
    const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    const avg = Number.parseFloat((3 + Math.sin(i / 3) * 0.3 + Math.random() * 0.3).toFixed(2))
    return { date, price: avg }
  })

  return NextResponse.json(data)
}

