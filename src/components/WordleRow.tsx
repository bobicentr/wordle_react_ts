import { useState } from "react";
import WordleCell from "./WordleCell";
import type { RowStatus, CellStatus } from "../types"; 

interface WordleRowProps {
  status: RowStatus;
}

export default function WordleRow({ status }: WordleRowProps) {
  const [cells, setCells] = useState<CellStatus[]>([
    "idle",
    "idle",
    "idle",
    "idle",
    "idle",
  ]);

  return (
    <div className="flex gap-4">
      {cells.map((cellStatus, index) => (
        <WordleCell key={index} status={cellStatus} />
      ))}
    </div>
  );
}
