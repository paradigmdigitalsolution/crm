'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { useGetProjectsQuery } from '@/state/api'
import {
  AlertCircle, AlertOctagon, AlertTriangle, Bookmark, Briefcase,
  ChevronDown, ChevronUp, Home, Layers3, LockIcon, Projector,
  Regex, Search, Settings, ShieldAlert, User, Users, X, LucideIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true)
  const [showPriority, setShowPriority] = useState(true)

  const { data: projects } = useGetProjectsQuery()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.global.user);
  console.log("User from Redux:", user);
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)

  const sidebarClassName = `fixed flex flex-col h-full justify-between shadow-xl
    transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? 'w-0 hidden' : 'w-64'}`

  return (
    <div className={sidebarClassName}>
      <div className="flex flex-col h-full justify-start">
        {/* Header */}
        <div className="z-50 flex h-16 items-center bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white uppercase">
            Paradigm
          </div>
          {!isSidebarCollapsed && (
            <button
              className="ml-auto py-3"
              onClick={() => dispatch(setIsSidebarCollapsed(true))}
            >
              <X className="h-6 w-6 cursor-pointer hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* Team Info */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-700 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" width={40} height={40} alt="logo" />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              {user?.teamName || 'SALES TEAM'}
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-gray-300">Private</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/newleads" icon={Regex} label="New Leads" />
          <SidebarLink href="/assignedleads" icon={Bookmark} label="Assigned Leads" />
          <SidebarLink href="/projects" icon={Projector} label="Projects" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/users" icon={User} label="Users" />
          <SidebarLink href="/teams" icon={Users} label="Teams" />
        </nav>

        {/* Priority Toggle */}
        <button
          onClick={() => setShowPriority(prev => !prev)}
          className="flex w-full items-center justify-between px-8 py-2 text-gray-500 dark:text-gray-300"
        >
          <span>Priorities</span>
          {showPriority ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showPriority && (
          <>
            <SidebarLink href="/priority/urgent" icon={AlertCircle} label="Urgent" />
            <SidebarLink href="/priority/high" icon={ShieldAlert} label="High" />
            <SidebarLink href="/priority/medium" icon={AlertTriangle} label="Medium" />
            <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
            <SidebarLink href="/priority/backlog" icon={Layers3} label="Backlog" />
          </>
        )}
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  icon: LucideIcon
  label: string
}

export const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || (pathname === '/' && href === '/dashboard')

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex items-center gap-3 justify-start px-8 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isActive ? 'bg-gray-100 text-white dark:bg-gray-600' : ''
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">{label}</span>
      </div>
    </Link>
  )
}

export default Sidebar
