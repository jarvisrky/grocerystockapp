import { type NextRequest, NextResponse } from "next/server"

// Mock API (Fallback)
const mockApiFetchPriceTrends = async (item: string, interval: string) => {
  const now = new Date()
  const generateDate = (offsetDays: number) => {
    const d = new Date(now)
    d.setDate(now.getDate() - offsetDays)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const ranges: Record<string, number> = { "1m": 30, "3m": 90, "6m": 180, "1y": 365 }
  const itemBasePrice: Record<string, number> = { eggs: 4, milk: 3, bread: 2.5 }
  const basePrice = itemBasePrice[item.toLowerCase()] || 3
  const days = ranges[interval] || 30

  return Array.from({ length: days }, (_, i) => {
    const offset = days - i
    return {
      date: generateDate(offset),
      price: Number.parseFloat((basePrice + Math.sin(i / 3) * 0.5 + Math.random() * 0.2).toFixed(2)),
    }
  })
}

// Symbol Mapper (replace with real grocery commodity tickers when available)
const symbolMap: Record<string, string> = {
  eggs: "AAPL",
  milk: "MSFT",
  bread: "GOOG",
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const item = searchParams.get("item") || ""
  const interval = searchParams.get("interval") || "1m"

  try {
    const symbol = symbolMap[item.toLowerCase()]

    if (!symbol) {
      return NextResponse.json(await mockApiFetchPriceTrends(item, interval))
    }

    const API_KEY = process.env.NEXT_PUBLIC_FMP_API_KEY

    if (!API_KEY) {
      console.error("API key is missing")
      return NextResponse.json(await mockApiFetchPriceTrends(item, interval))
    }

    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      console.error("API response not ok:", response.status)
      return NextResponse.json(await mockApiFetchPriceTrends(item, interval))
    }

    const json = await response.json()
    const history = json?.historical || []

    const rangeLimit: Record<string, number> = {
      "1m": 22,
      "3m": 66,
      "6m": 132,
      "1y": 252,
    }

    const data = history
      .slice(0, rangeLimit[interval] || 22)
      .reverse()
      .map((item: any) => ({
        date: item.date,
        price: item.close,
      }))

    return NextResponse.json(data)
  } catch (err) {
    console.error("API error:", err)
    // Fallback to mock data if the API fails
    return NextResponse.json(await mockApiFetchPriceTrends(item, interval))
  }
}

