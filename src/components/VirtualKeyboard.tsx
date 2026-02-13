import type { CellStatus } from "../types";

interface VirtualKeyboardProps {
  keyboardStatuses: Partial<Record<string, CellStatus>>;
}


export default function VirtualKeyboard({
  keyboardStatuses,
}: VirtualKeyboardProps) {
  const alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");

  const colors: Record<string, string> = {
    correct: "bg-green-500 border-green-600",
    present: "bg-yellow-500 border-yellow-600",
    absent: "bg-gray-500 border-gray-600",
    unchecked: "bg-transparent border-slate-700",
  };

  return (
    <div className="grid grid-cols-10 gap-1">
      {alphabet.map((char) => {
        const status = keyboardStatuses[char] ?? "unchecked";

        return (
          <p
            key={char}
            className={`text-center h-12 px-3 py-3 border rounded ${colors[status]}`}
          >
            {char.toUpperCase()}
          </p>
        );
      })}
    </div>
  );
}

