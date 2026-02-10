import type { CellStatus } from "../types";
interface WordleCellProps {
  status: CellStatus;
  value: string;
  id: number;
  isSubmitted: boolean;
}

const statusStyles = {
  correct: "bg-green-500 border-green-600",
  present: "bg-yellow-500 border-yellow-600",
  absent: "bg-gray-500 border-gray-600",
  idle: "bg-transparent border-slate-700",
  unchecked: "bg-transparent border-slate-700",
};

export default function WordleCell({ status, value, id, isSubmitted }: WordleCellProps) {
  const totalDelay = id * 150;
  const colorDelay = totalDelay + 300;

  return (
    <div
      style={{
        animationDelay: `${totalDelay}ms`,
        transitionDelay: isSubmitted ? `${colorDelay}ms` : "0ms",
      }}
      className={`
        flex items-center justify-center w-15 h-15 border text-2xl font-bold uppercase
        transition-colors duration-0
        ${isSubmitted ? "animate-cell" : "border-slate-700"}
        ${isSubmitted ? statusStyles[status] : "bg-transparent"}
      `}
    >
      {value}
    </div>
  );
}
