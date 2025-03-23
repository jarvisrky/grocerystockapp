"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { jsPDF } from "jspdf"

export default function PDFUserManual() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = () => {
    setIsGenerating(true)

    try {
      // Create a new PDF document
      const doc = new jsPDF()

      // Set font size and styles
      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")

      // Add title
      doc.setFontSize(18)
      doc.setFont("helvetica", "bold")
      doc.text("User Manual - Grocery Stocks", 105, 20, { align: "center" })

      // Add prepared by
      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text("Prepared By: Dylan B. Jarvis", 20, 30)
      doc.text("Date: 03-02-2025", 20, 40)

      // Add table of contents
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Table of Contents", 20, 55)

      // Add content sections
      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text("1. System Overview", 25, 65)
      doc.text("2. Safety Prescriptions", 25, 75)
      doc.text("3. Technical Specifications", 25, 85)
      doc.text("4. Contents, List of Images, Icons, and Attachments", 25, 95)
      doc.text("5. Description of the Product", 25, 105)
      doc.text("6. Relation to Other Documents", 25, 115)

      // System Overview
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("System Overview", 20, 130)

      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text("The Grocery Stock Market Application is a web-based platform designed to help users", 20, 140)
      doc.text("track grocery item prices and trends over time. With an interface inspired by stock", 20, 150)
      doc.text("market analysis, this tool enables users to monitor price fluctuations, compare store", 20, 160)
      doc.text("prices, set alerts, and make informed purchasing decisions.", 20, 170)

      // Add more content sections...

      // Save the PDF
      doc.save("GroceryStocks_User_Manual.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold">User Manual (PDF)</h3>
      </div>

      <p className="text-gray-600 mb-4">
        Download our comprehensive user manual as a PDF document to learn all about the GroceryStocks application,
        including system requirements, features, and how to get the most out of the app.
      </p>

      <Button onClick={generatePDF} disabled={isGenerating} className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        {isGenerating ? "Generating PDF..." : "Download PDF Manual"}
      </Button>
    </div>
  )
}

