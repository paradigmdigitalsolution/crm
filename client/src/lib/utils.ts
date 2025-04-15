export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-[#2d3135] dark:bg-[#1d1f21] dark:text-gray-200";

export const dataGridSxStyles = () => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: "text-gray-900 dark:text-gray-200",
      '& [role="row"] > *': {
        backgroundColor: "bg-white dark:bg-[#1d1f21]",
        borderColor: "border-gray-200 dark:border-[#2d3135]",
      },
    },
    "& .MuiIconbutton-root": {
      color: "text-gray-500 dark:text-gray-200",
    },
    "& .MuiTablePagination-root": {
      color: "text-gray-500 dark:text-gray-200",
    },
    "& .MuiTablePagination-selectIcon": {
      color: "text-gray-500 dark:text-gray-200",
    },
    "& .MuiDataGrid-cell": {
      border: "border-none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: "border-b border-gray-200 dark:border-[#2d3135]",
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: "border-gray-200 dark:border-[#2d3135]",
    },
  };
};