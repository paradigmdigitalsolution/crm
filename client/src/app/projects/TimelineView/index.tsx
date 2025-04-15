'use client';

import { useAppSelector } from "@/app/redux";
import { useGetTaskQuery } from "@/state/api";
import React, { useMemo, useState } from "react";
import FrappeGanttChart from "@/components/Gantt"; // adjust path if needed

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type ViewMode = "Day" | "Week" | "Month";

const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: tasks, error, isLoading } = useGetTaskQuery({ projectId: Number(id) });

  const [viewMode, setViewMode] = useState<ViewMode>("Month");

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        id: `Task-${task.id}`,
        name: task.title,
        start: task.startDate || "",
        end: task.dueDate || "",
        progress: task.points ? (task.points / 10) * 100 : 0,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMode(event.target.value as ViewMode);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-[#1d1f21] dark:bg-[#1d1f21] dark:text-white"
            value={viewMode}
            onChange={handleViewModeChange}
          >
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-[#1d1f21] dark:text-white">
        <div className="timeline">
          <FrappeGanttChart tasks={ganttTasks} viewMode={viewMode} />
        </div>
        <div className="px-4 pb-5 pt-1">
          <button
            className="flex items-center rounded bg-[#0275ff] px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
