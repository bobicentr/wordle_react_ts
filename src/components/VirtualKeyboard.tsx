import { CornerDownLeft, Delete } from "lucide-react";
import type { CellStatus } from "../types";

interface VirtualKeyboardProps {
  keyboardStatuses: Partial<Record<string, CellStatus>>;
  handleVirtualKeyboardClick: (char: string) => void;
}

export default function VirtualKeyboard({
  keyboardStatuses, handleVirtualKeyboardClick
}: VirtualKeyboardProps) {
  const row1 = "qwertyuiop".split("");
  const row2 = "asdfghjkl".split("");
  const row3 = "zxcvbnm".split("");

  const colors: Record<string, string> = {
    correct: "bg-green-500 border-green-600 text-white",
    present: "bg-yellow-500 border-yellow-600 text-white",
    absent: "bg-gray-500 border-gray-600 text-white",
    unchecked: "bg-transparent border-slate-500",
  };

  const keyClass =
    "text-center h-12 px-3 py-3 border rounded cursor-pointer flex items-center justify-center min-w-[35px]";

  return (
    <div className="flex flex-col gap-1 items-center">
      {" "}
      {/* Ряд 1 */}
      <div className="flex gap-1">
        {row1.map((char) => (
          <p
            key={char}
            className={`${keyClass} ${colors[keyboardStatuses[char] ?? "unchecked"]}`}
            onClick={() => handleVirtualKeyboardClick(char)}
          >
            {char.toUpperCase()}
          </p>
        ))}
      </div>
      {/* Ряд 2 */}
      <div className="flex gap-1">
        {row2.map((char) => (
          <p
            key={char}
            className={`${keyClass} ${colors[keyboardStatuses[char] ?? "unchecked"]}`}
            onClick={() => handleVirtualKeyboardClick(char)}
          >
            {char.toUpperCase()}
          </p>
        ))}
      </div>
      {/* Ряд 3 */}
      <div className="flex gap-1">
        <p
          className={`${keyClass} px-4 border-slate-500`}
          onClick={() => handleVirtualKeyboardClick("Enter")}
        >
          <CornerDownLeft size={18} />
        </p>

        {row3.map((char) => (
          <p
            key={char}
            className={`${keyClass} ${colors[keyboardStatuses[char] ?? "unchecked"]}`}
            onClick={() => handleVirtualKeyboardClick(char)}
          >
            {char.toUpperCase()}
          </p>
        ))}

        <p
          className={`${keyClass} px-4 border-slate-500`}
          onClick={() => handleVirtualKeyboardClick("Backspace")}
        >
          <Delete size={18} />
        </p>
      </div>
    </div>
  );
}