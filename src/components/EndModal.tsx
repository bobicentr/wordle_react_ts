interface EndModalProps {
    hasEnded : boolean;
    isWinner : boolean;
    word : string
}

export default function EndModal( { hasEnded, isWinner, word } : EndModalProps ) {
    const handleRestart = () => {
        window.location.reload();
    }
    return (
        <div className={hasEnded ? "fixed inset-0 bg-black/70 flex items-center justify-center z-50" : "hidden"}>
            <div className="bg-white p-8 rounded-lg flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">{isWinner ? "Поздравляем!" : "Игра окончена!"}</h2>
                <p className="text-lg">{isWinner ? "Вы угадали слово!" : `Загаданное слово было: ${word.toUpperCase()}`}</p>
                <button className={`mt-4 px-4 py-2 text-white rounded 
                ${isWinner ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                onClick={handleRestart}>Начать снова</button>
            </div>
        </div>
    )
}