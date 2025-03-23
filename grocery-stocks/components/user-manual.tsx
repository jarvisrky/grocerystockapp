"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

export default function UserManual() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)

    try {
      // User manual content
      const userManualContent = `User Manual 
Grocery Stocks
Prepared By: Dylan B. Jarvis________________________
Date: 03-02-2025  _____________________________    __  

Table of Contents
1.System Overview
2.Safety Prescriptions
3.Technical Specifications
4.Contents, List of Images, Icons, and Attachments
5.Description of the Product
6.Relation to Other Documents

System Overview
The Grocery Stock Market Application is a web-based platform designed to help users 
track grocery item prices and trends over time. With an interface inspired by stock 
market analysis, this tool enables users to monitor price fluctuations, compare store 
prices, set alerts, and make informed purchasing decisions.

Key Features:
- Real-time and historical price tracking
- Searchable database of grocery items
- Graphical price trends for better decision-making
- User-friendly dashboard 

Safety
This application does not solicit or utilize users' personal identifiable information (PII) for 
any contents. To further avoid malicious acts or behavior, users are prohibited to share 
credentials of any manner. Common cyber security safety practices should be utilized 
along with supported and updated web browsers, i.e. Google Chrome, Mozilla Firefox, 
Safari. Secure internet connection is required to utilize to properly run this application.

Technical Specifications
Minimum Requirements:
- Devices - Desktop, Smartphone, Tablet, Laptop
- Hardware –2 gb, 1 GHz w/multicores, no local storage requirements
- Browser Support – Mozilla Firefox, Safari, Google Chrome –updated versions recommended
- Operating System - Windows 10 or later, Android, macOS, iOS, Linux

Description of Product
The Grocery Stock Market Application consists of several components that work together to provide 
users with price tracking and market trend analysis.

User Dashboard: Displays personalized price trends and quick access to search. Furthermore, it will 
display common searched 'tickers' for items recommended to enable users to begin searching.

Search Engine: Allows users to find specific grocery items and compare identify pricing trends based 
on relevant events.

Price Trend Graphs: Visual tool of price fluctuations

Alerts & Notifications: Enables users to set price drop alerts for selected items.

Data Analytics & Reports: Offers insights into grocery pricing trends over time.

API Integration: The application retrieves grocery item details and pricing from various sources 
through APIs, ensuring up-to-date and accurate data for users.

The application is designed to be intuitive for simple user-experience, ensuring that consumers can 
maximize savings and stay informed about market fluctuations and avoid potential hikes.

Document & Further Reference
- Grocery Stock Application Prototype Outline
- Hardware Requirement Outline
- Developer API Documentation (For third party integrations)
- Application Github (Currently Unpublished)

ACRONYMS & ABBRIVIATIONS
Pii – Personal Identifiable Information
Api – Application Programming Interface
MacOS – Macintosh Operating System
Gb – Gigabytes
MPBS – Megabytes Per Second`

      // Create a Blob with the text content
      const blob = new Blob([userManualContent], { type: "text/plain;charset=utf-8" })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", "GroceryStocks_User_Manual.txt")

      // Append to the document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL object
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading user manual:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold">User Manual</h3>
      </div>

      <p className="text-gray-600 mb-4">
        Download our comprehensive user manual to learn all about the GroceryStocks application, including system
        requirements, features, and how to get the most out of the app.
      </p>

      <Button onClick={handleDownload} disabled={isDownloading} className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download User Manual"}
      </Button>
    </div>
  )
}

