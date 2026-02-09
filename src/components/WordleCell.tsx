import type { CellStatus } from "../types";
interface WorldCellProps {
  status: CellStatus;
}

export default function WordleCell({status} : WorldCellProps) {
  
  return <div className="w-15 h-15  border border-gray-700"></div>;
}
