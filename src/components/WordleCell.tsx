import type { CellStatus } from "../types";
interface WorldCellProps {
  status: CellStatus;
}

const statusStyles = {
  correct: "bg-green-500 border-green-600",
  present: "bg-yellow-500 border-yellow-600",
  absent: "bg-gray-500 border-gray-600",
  idle: "bg-transparent border-slate-700",
  unchecked: "bg-transparent border-slate-700",
};

export default function WordleCell({status} : WorldCellProps) {

  return <div className={`w-15 h-15 border ${statusStyles[status]}`}></div>;
}
