import { useState, useEffect } from "react";
import "./App.css";
import type { CellStatus, RowStatus } from "./types";
import wordsRaw from "./assets/words.txt?raw";
import WordleRow from "./components/WordleRow";
import EndModal from "./components/EndModal";

const wordsArray: string[] = wordsRaw.split(/\r?\n/);

function App() {
  const [word] = useState(() => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    const randomWord = wordsArray[randomIndex];
    return randomWord;
  });
  const [rows, setRows] = useState<RowStatus[]>([
    "active",
    "inactive",
    "inactive",
    "inactive",
    "inactive",
    "inactive",
  ]);
  const [input, setInput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [cells, setCells] = useState<CellStatus[][]>([]);
  const [firstActiveRow, setFirstActiveRow] = useState(0);
  const [wrongRow, setWrongRow] = useState<number | null>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    const handleEnter = () => {
      if (input.length === 5) {
        const currentWord = input.join("").toLowerCase();
        if (!wordsArray.includes(currentWord)) {
          setWrongRow(firstActiveRow);
          setTimeout(() => setWrongRow(null), 300);
          return;
        }
        setHistory((prev) => [...prev, input]);

        const activeIndex = rows.indexOf("active");
        if (activeIndex !== -1) {
          const activeRowCells: CellStatus[] = Array(5).fill("absent");
          const targetLetters = word.split("");
          const inputLetters = input.map((letter) => letter.toLowerCase());
          for (let i = 0; i < 5; i++) {
            if (inputLetters[i] === targetLetters[i]) {
              activeRowCells[i] = "correct";
              targetLetters[i] = "";
              inputLetters[i] = "";
            }
          }
          for (let i = 0; i < 5; i++) {
            if (activeRowCells[i] === "correct") continue;
            const char = inputLetters[i];
            const targetIndex = targetLetters.indexOf(char);
            if (char !== "" && targetIndex !== -1) {
              activeRowCells[i] = "present";
              targetLetters[targetIndex] = "";
            }
          }
          setCells((prev) => [...prev, activeRowCells]);
          if (activeRowCells.every((status) => status === "correct")) {
            setTimeout(() => {
              window.removeEventListener("keydown", handleKeyDown);
              setHasEnded(true);
              setIsWinner(true);
            }, 1200);
          }
        }

        setRows((prevRows) => {
          const newRows = [...prevRows];
          newRows[activeIndex] = "submitted";
          if (activeIndex < rows.length - 1)
            newRows[activeIndex + 1] = "active";
          return newRows;
        });
        if (firstActiveRow === rows.length - 1) {
          setTimeout(() => {
            window.removeEventListener("keydown", handleKeyDown);
            setHasEnded(true);
          }, 1200);
        }
        setFirstActiveRow((prev) => prev + 1);
        setInput([]);
      } else {
        setWrongRow(firstActiveRow);
        setTimeout(() => setWrongRow(null), 500);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key === "Enter") {
        handleEnter();
        return;
      }
      if (input.length < 5 && e.key.length === 1 && e.key.match(/[a-z]/i)) {
        setInput((prev) => [...prev, e.key.toUpperCase()]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input, history, firstActiveRow, cells, rows, word]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        id="wordleContainer"
        className="grid cols-1 gap-2 max-w-screen place-items-center"
      >
        {/* Все строки. key=index, т.к. количество не будет меняться */}
        {rows.map((rowStatus, index) => (
          <WordleRow
            key={index}
            status={rowStatus}
            input={input}
            id={index}
            activeRow={firstActiveRow}
            history={history}
            cells={cells}
            wrongRow={wrongRow}
          />
        ))}
      </div>
      <EndModal hasEnded={hasEnded} isWinner={isWinner} word={word} />
    </div>
  );
}

export default App;
