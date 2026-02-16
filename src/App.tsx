import { useState, useEffect } from "react";
import "./App.css";
import type { CellStatus, RowStatus } from "./types";
import wordsRaw from "./assets/words.txt?raw";
import WordleRow from "./components/WordleRow";
import EndModal from "./components/EndModal";
import VirtualKeyboard from "./components/VirtualKeyboard";

const wordsArray: string[] = wordsRaw.split(/\r?\n/);

function App() {
  const [word] = useState(() => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
  });

  const [keyboardStatuses, setKeyboardStatuses] = useState<
    Partial<Record<string, CellStatus>>
  >({});

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
  const [suggestionsAreOn, setSuggestionsAreOn] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const toggleSuggestions = (e: any) => {
    e.target.blur();
    setSuggestionsAreOn(!suggestionsAreOn);
  };

  const updateSuggestions = (input: string[]) => {
    if (input.length === 0) {
      setSuggestions([])
      return
    }
    const suggetionsList = []
    for (const word of wordsArray) {
      if (word.startsWith(input.join("").toLowerCase())) {
        suggetionsList.push(word);
      }
      if (suggetionsList.length === 3) break;
    }
    setSuggestions(suggetionsList);
  };

  const updateKeyboard = (char: string, status: CellStatus) => {
    setKeyboardStatuses((prev) => {
      const current = prev[char];
      if (current === "correct") return prev;
      if (current === "present" && status === "absent") return prev;
      return { ...prev, [char]: status };
    });
  };

  const handleEnter = () => {
    if (input.length !== 5) {
      setWrongRow(firstActiveRow);
      setTimeout(() => setWrongRow(null), 500);
      return;
    }

    const currentWord = input.join("").toLowerCase();

    if (!wordsArray.includes(currentWord)) {
      setWrongRow(firstActiveRow);
      setTimeout(() => setWrongRow(null), 300);
      return;
    }

    setHistory((prev) => [...prev, input]);

    const activeIndex = rows.indexOf("active");
    if (activeIndex === -1) return;

    const activeRowCells: CellStatus[] = Array(5).fill("absent");

    const targetLetters = word.split("");
    const inputLetters = input.map((l) => l.toLowerCase());

    for (let i = 0; i < 5; i++) {
      if (inputLetters[i] === targetLetters[i]) {
        activeRowCells[i] = "correct";

        updateKeyboard(inputLetters[i], "correct");

        targetLetters[i] = "";
        inputLetters[i] = "";
      }
    }

    for (let i = 0; i < 5; i++) {
      if (activeRowCells[i] === "correct") continue;

      const char = inputLetters[i];
      if (!char) continue;

      const targetIndex = targetLetters.indexOf(char);

      if (targetIndex !== -1) {
        activeRowCells[i] = "present";

        updateKeyboard(char, "present");

        targetLetters[targetIndex] = "";
      } else {
        updateKeyboard(char, "absent");
      }
    }

    setCells((prev) => [...prev, activeRowCells]);

    if (activeRowCells.every((s) => s === "correct")) {
      setTimeout(() => {
        setHasEnded(true);
        setIsWinner(true);
      }, 1200);
    }

    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[activeIndex] = "submitted";
      if (activeIndex < prevRows.length - 1) {
        newRows[activeIndex + 1] = "active";
      }
      return newRows;
    });

    if (firstActiveRow === rows.length - 1) {
      setTimeout(() => {
        setHasEnded(true);
      }, 1200);
    }

    setFirstActiveRow((prev) => prev + 1);
    setInput([]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = (e: KeyboardEvent) => {
    if (hasEnded) return;

    if (e.key === "Backspace") {
      setInput((prev) => {
        const newInput = prev.slice(0, -1);
        updateSuggestions(newInput);
        return newInput;
      });
      return;
    }

    if (e.key === "Enter") {
      handleEnter();
      setSuggestions([]);
      return;
    }

    if (input.length < 5 && /^[a-z]$/i.test(e.key)) {
      setInput((prev) => {
        const newInput = [...prev, e.key.toUpperCase()];
        updateSuggestions(newInput);
        return newInput;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, input.length, hasEnded]);

  return (
    <div className="min-h-screen grid grid-cols-[1fr_auto_1fr] items-start pt-20 p-4">
      <div />

      <div className="flex flex-col gap-10 items-center">
        <div className="grid cols-1 gap-2 max-w-screen place-items-center">
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
        <VirtualKeyboard keyboardStatuses={keyboardStatuses} />
      </div>

      <div className="flex flex-col gap-5 self-start justify-self-start">
        <button
          className={`border p-2 rounded cursor-pointer whitespace-nowrap
          ${suggestionsAreOn ? "bg-green-400 border-green-700" : "bg-red-500 border-red-800 text-white"}`}
          onClick={(e) => toggleSuggestions(e)}
        >
          {suggestionsAreOn ? "Отключить подсказки" : "Включить подсказки"}
        </button>
        {suggestionsAreOn && (
          <h2 className="max-w-[200px] text-lg">
            Возможные варианты:
            {suggestions.length > 0 &&
              suggestions.map((suggestion, index) => (
                <p key={index} className="text-xl">
                  <span className="text-slate-400">{input.join("")}</span>
                  {suggestion.slice(input.length).toUpperCase()}
                </p>
              ))}
          </h2>
        )}
      </div>

      <EndModal hasEnded={hasEnded} isWinner={isWinner} word={word} />
    </div>
  );
}

export default App;
