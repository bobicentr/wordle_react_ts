import { useState, useEffect } from "react";
import "./App.css";
import type { RowStatus } from "./types";
import wordsRaw from "./assets/words.txt?raw";
import WordleRow from "./components/WordleRow";

const wordsArray: string[] = wordsRaw.split(/\r?\n/);

function App() {
  const [word, setWord] = useState(() => {
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
  const [input, setInputt] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        setInputt((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        setInputt((prev) => {
          if (prev.length >= 5) return prev;
          return [...prev, e.key.toLowerCase()];
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        id="wordleContainer"
        className="grid cols-1 gap-2 max-h-screen max-w-screen place-items-center"
      >
        {/* Все строки. key=index, т.к. количество не будет меняться */}
        {rows.map((rowStatus, index) => (
          <WordleRow key={index} status={rowStatus} />
        ))}
      </div>
    </>
  );
}

export default App;
