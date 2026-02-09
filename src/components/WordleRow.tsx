import { useState } from "react";
import WordleCell from "./WordleCell";
import type { RowStatus, CellStatus } from "../types";

interface WordleRowProps {
  status: RowStatus;
  input: string[];
  id: number;
  activeRow: number;
  history: string[][];
}

export default function WordleRow({
  status,
  input,
  id,
  activeRow,
  history,
}: WordleRowProps) {
  const cells = [0, 1, 2, 3, 4];

  return (
    <div className="flex gap-4">
      {cells.map((index) => {
        let char = "";
        if (id === activeRow) {
          char = input[index] || "";
        } else if (status === "submitted") {
          char = history[id] ? history[id][index] : "";
        }

        return <WordleCell key={index} status="idle" value={char} />;
      })}
    </div>
  );
}
