import { useState } from "react";
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
  const [rows, setRows] = useState<RowStatus[]>(["active", "inactive", "inactive", "inactive", "inactive"])

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
