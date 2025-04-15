"use client"
import { useGetProjectsQuery } from '@/state/api'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { PlusSquare } from 'lucide-react'
import ModalNewProject from "./ModalNewProject";

type Props = {}

const Projects = (props: Props) => {
    const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Number of projects per page
    const { data: projects, isLoading, error } = useGetProjectsQuery()
    const router = useRouter()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading projects</div>

    // Pagination logic
    const totalPages = Math.ceil((projects?.length || 0) / itemsPerPage)
    const paginatedProjects = projects?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <div className='flex w-full flex-col p-8'>
            <ModalNewProject
                    isOpen={isModalNewProjectOpen}
                    onClose={() => setIsModalNewProjectOpen(false)}
                  />
            <Header name="Projects" 
            buttonComponent={
              <button
                className="flex items-center rounded-md bg-[#0275ff] px-3 py-2 text-white hover:bg-blue-600"
                onClick={() => setIsModalNewProjectOpen(true)}
              >
                <PlusSquare className="mr-2 h-5 w-5" /> New Project
              </button>
            }/>
            {/* Projects List */}
            {paginatedProjects?.map((project) => (
                <div
                    key={project.id}
                    className="p-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-[#3b3d40]"
                    onClick={() => router.push(`/projects/${project.id}`)}
                >
                    <h2 className="text-lg font-semibold dark:text-gray-200">{project.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-200">{project.description || "No description available"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-200">
                        Start Date: {project.startDate || "N/A"} | End Date: {project.endDate || "N/A"}
                    </p>
                </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
                >
                    Previous
                </button>
                <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Projects