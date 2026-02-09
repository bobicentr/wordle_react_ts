import { useState, useEffect } from "react";
import "./App.css";
import type { RowStatus } from "./types";
import wordsRaw from "./assets/words.txt?raw";
import WordleRow from "./components/WordleRow";

const wordsArray: string[] = wordsRaw.split(/\r?\n/);

function App() {
  const [word] = useState(() => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
  });
  const [rows, setRows] = useState<RowStatus[]>([
    "active",
    "inactive",
    "inactive",
    "inactive",
    "inactive",
  ]);
  const [input, setInput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [firstActiveRow, setFirstActiveRow] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      if (e.key === "Enter") {
        if (input.length === 5) {
          const currentWord = input.join("").toLowerCase();
          if (!wordsArray.includes(currentWord)) {
            alert("Такого слова нет в словаре! " + currentWord);
            return;
          }

          setRows((prevRows) => {
            const activeIndex = prevRows.indexOf("active");
            if (activeIndex === -1) return prevRows;
            const newRows = [...prevRows];
            newRows[activeIndex] = "submitted";
            if (activeIndex < 4) {
              newRows[activeIndex + 1] = "active";
            }
            return newRows;
          });

          setHistory((prev) => [...prev, input]);
          setFirstActiveRow((prev) => prev + 1);
          setInput([]);
        }
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
  }, [input, history, firstActiveRow]);

  return (
    <>
      <div
        id="wordleContainer"
        className="grid cols-1 gap-2 max-h-screen max-w-screen place-items-center"
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
          />
        ))}
      </div>
    </>
  );
}

export default App;
