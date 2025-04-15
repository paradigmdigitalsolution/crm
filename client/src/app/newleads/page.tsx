"use client"
import { Mails, Phone, Globe, MessageCircle, Calendar } from 'lucide-react'
import React, { useState, useEffect } from 'react'

type Lead = {
    id: number
    name: string
    email: string
    phone: string
    message?: string
    websiteName?: string
    submittedAt?: string
}

const Newleads = () => {
    const [leads, setLeads] = useState<Lead[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Number of leads per page

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_LEADS_API_URL || '')
                if (!response.ok) {
                    throw new Error('Failed to fetch leads')
                }
                const data = await response.json()
                setLeads(data)
                setIsLoading(false)
            } catch (err: any) {
                setError(err.message)
                setIsLoading(false)
            }
        }

        fetchLeads()
    }, [])

    if (isLoading) return <div className="text-center text-lg font-semibold">Loading...</div>
    if (error) return <div className="text-center text-red-500 font-semibold">Error: {error}</div>

    // Pagination logic
    const totalPages = Math.ceil(leads.length / itemsPerPage)
    const paginatedLeads = leads.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div className="flex w-full flex-col p-8 bg-gray-50 min-h-screen dark:bg-[#101214]">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">New Leads</h1>
            {/* Leads List */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {paginatedLeads.map((lead, index) => {
                    const formattedDate = lead.submittedAt
                        ? new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                          }).format(new Date(lead.submittedAt))
                        : "N/A"

                    return (
                        <div
                            key={lead.id || `lead-${index}`}
                            className="p-6 border-b last:border-none hover:bg-[#3b3d40] transition cursor-pointer dark:bg-[#1d1f21]"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{lead.name}</h2>
                            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-200">
                                <Mails className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                                <p className="text-sm">{lead.email}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-200">
                                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                                <p className="text-sm">{lead.phone}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-200">
                                <Globe className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                                <p className="text-sm">{lead.websiteName || "N/A"}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-200">
                                <MessageCircle className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                                <p className="text-sm">{lead.message || "No message provided"}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-200">
                                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-200" />
                                <p className="text-sm text-blue-600">{formattedDate}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-md ${
                        currentPage === 1
                            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                            : "text-blue-500 bg-white hover:bg-blue-50"
                    }`}
                >
                    Previous
                </button>
                <span className="text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-md ${
                        currentPage === totalPages
                            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                            : "text-blue-500 bg-white hover:bg-blue-50"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Newleads