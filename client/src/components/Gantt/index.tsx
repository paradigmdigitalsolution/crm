'use client';

import { useEffect, useRef } from 'react';
import Gantt from 'frappe-gantt';
import '@/styles/frappe-gantt.css';

type Task = {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
};

type Props = {
  tasks: Task[];
  viewMode: "Day" | "Week" | "Month";
};

const FrappeGanttChart = ({ tasks, viewMode }: Props) => {
  const ganttRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ganttRef.current && tasks.length > 0) {
      // Clear previous content to avoid duplicates
      ganttRef.current.innerHTML = '';
      new Gantt(ganttRef.current, tasks, {
        view_mode: viewMode,
        date_format: 'YYYY-MM-DD',
        language: 'en',
      });
    }
  }, [tasks, viewMode]);

  if (tasks.length === 0) {
    return <div>No tasks available to display</div>;
  }

  return <div ref={ganttRef} />;
};

export default FrappeGanttChart;