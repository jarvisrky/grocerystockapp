"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  data: any[]
  filename?: string
  label?: string
}

export default function DownloadButton({
  data,
  filename = "grocery-price-data.csv",
  label = "Download Data",
}: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCSV = (data: any[]) => {
    if (!data || data.length === 0) return ""

    // Get headers from the first object
    const headers = Object.keys(data[0])

    // Create CSV header row
    const csvRows = [headers.join(",")]

    // Add data rows
    for (const row of data) {
      const values = headers.map((header) => {
        const value = row[header]
        // Handle strings with commas by wrapping in quotes
        return typeof value === "string" && value.includes(",") ? `"${value}"` : value
      })
      csvRows.push(values.join(","))
    }

    return csvRows.join("\n")
  }

  const handleDownload = () => {
    if (!data || data.length === 0) return

    setIsGenerating(true)

    try {
      // Generate CSV content
      const csvContent = generateCSV(data)

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", filename)

      // Append to the document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL object
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating CSV:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating || !data || data.length === 0}
      className="flex items-center gap-2"
    >
      <Download size={16} />
      {isGenerating ? "Generating..." : label}
    </Button>
  )
}

