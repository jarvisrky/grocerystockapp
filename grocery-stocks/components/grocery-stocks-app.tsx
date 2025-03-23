"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import DownloadButton from "./download-button"

const Home = ({ searchTerm, setSearchTerm, setPage }) => {
  const [avgData, setAvgData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAverageData = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/average-prices")
        if (response.ok) {
          const data = await response.json()
          setAvgData(data)
        }
      } catch (error) {
        console.error("Error fetching average prices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAverageData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPage("trends")
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Search for Grocery Items</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="e.g., Eggs, Milk, Bread"
            className="flex-1 border border-gray-300 p-2 rounded-md focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">View Price Trends</Button>
        </div>
      </form>

      <p className="mt-4 text-gray-500">
        Showing results for: <strong>{searchTerm || "None"}</strong>
      </p>

      <div className="mt-6 text-sm text-gray-600 bg-yellow-50 border border-yellow-300 p-4 rounded-md">
        <strong>Searchable Grocery Tickers (for demo purposes):</strong>
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>eggs</strong> → AAPL
          </li>
          <li>
            <strong>milk</strong> → MSFT
          </li>
          <li>
            <strong>bread</strong> → GOOG
          </li>
        </ul>
        <p className="mt-2">* Replace these with actual grocery commodity tickers or datasets when available.</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Average Grocery Price per Consumer (Daily)</h3>
        <div className="h-80 bg-white rounded-lg p-4 border border-gray-200">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-center text-gray-500">Loading average price data...</p>
            </div>
          ) : avgData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-center text-gray-500">No average price data available.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={avgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" />
                <YAxis domain={[2, 5]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  name="Avg Price"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <DownloadButton data={avgData} filename="average-grocery-prices.csv" label="Download Average Prices" />
        </div>
      </div>
    </div>
  )
}

const Trends = ({ searchTerm }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [interval, setInterval] = useState("1m")

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)

      const fetchData = async () => {
        try {
          const response = await fetch(`/api/stock-data?item=${searchTerm}&interval=${interval}`)
          if (response.ok) {
            const data = await response.json()
            setData(data)
          }
        } catch (error) {
          console.error("Error fetching price trends:", error)
          setData([])
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [searchTerm, interval])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Price Trend: {searchTerm || "(No Item Selected)"}</h2>

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        {["1m", "3m", "6m", "1y"].map((opt) => (
          <Button key={opt} variant={interval === opt ? "default" : "outline"} onClick={() => setInterval(opt)}>
            {opt === "1m" ? "1 Month" : opt === "3m" ? "3 Months" : opt === "6m" ? "6 Months" : "1 Year"}
          </Button>
        ))}
      </div>

      <div className="h-96 bg-white rounded-lg p-4 border border-gray-200">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-center text-gray-500">Loading price data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-center text-gray-500">No price data found for "{searchTerm}".</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {data.length > 0 && (
        <div className="mt-4 flex justify-end">
          <DownloadButton data={data} filename={`${searchTerm}-price-data.csv`} label="Download Price Data" />
        </div>
      )}
    </div>
  )
}

export default function GroceryStocksApp() {
  const [page, setPage] = useState("home")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {page === "home" && <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} />}
        {page === "trends" && <Trends searchTerm={searchTerm} />}

        {page === "trends" && (
          <div className="mt-4">
            <Button variant="outline" onClick={() => setPage("home")}>
              ← Back to Search
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

