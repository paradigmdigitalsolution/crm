"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetProjectsQuery } from "@/state/api";
import FrappeGanttChart from "@/components/Gantt";
import '@/styles/frappe-gantt.css';
import React, { useMemo, useState } from "react";

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<{
    viewMode: "Day" | "Week" | "Month";
    locale: string;
  }>({
    viewMode: "Month", // Default view mode
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects
        ?.filter((project) => project.startDate && project.endDate)
        .map((project) => ({
          start: project.startDate || "",
          end: project.endDate || "",
          name: project.name,
          id: `Project-${project.id}`,
          progress: 50,
        })) || []
    );
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as "Day" | "Week" | "Month",
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-[#1d1f21] dark:bg-[#1d1f21] dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-[#1d1f21] dark:text-white">
        <div className="timeline">
          <FrappeGanttChart
            tasks={ganttTasks}
            viewMode={displayOptions.viewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;