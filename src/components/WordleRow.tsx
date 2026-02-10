import WordleCell from "./WordleCell";
import type { CellStatus, RowStatus } from "../types";

interface WordleRowProps {
  status: RowStatus;
  input: string[];
  id: number;
  activeRow: number;
  history: string[][];
  cells: CellStatus[][];
  wrongRow: number | null;
}

export default function WordleRow({
  status,
  input,
  id,
  activeRow,
  history,
  cells,
  wrongRow,
}: WordleRowProps) {
  const dummyCells = [0, 1, 2, 3, 4];

  return (
    <div className={`flex gap-4 ${wrongRow === id ? "animate-wrong" : ""}`}>
      {dummyCells.map((index) => {
        let char = "";
        let cellStatus: CellStatus = "idle";

        if (id === activeRow) {
          char = input[index] || "";
        } else if (status === "submitted") {
          char = history[id][index];
          cellStatus = cells[id][index];
        }

        return (
          <WordleCell
            key={index}
            status={cellStatus}
            value={char}
            id={index} // ПЕРЕДАЕМ ИНДЕКС ДЛЯ ЗАДЕРЖКИ
            isSubmitted={status === "submitted"} // ФЛАГ ДЛЯ ЗАПУСКА АНИМАЦИИ
          />
        );
      })}
    </div>
  );
}