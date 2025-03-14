import { Plus } from "lucide-react";

export const InputWord = ({
  word,
  setWord,
  handleAddNewWord,
}: {
  word: string;
  setWord: (word: string) => void;
  handleAddNewWord: () => void;
}) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && word) {
      handleAddNewWord();
    }
  };

  
  return (
    <div className="container-input ">
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <button disabled={!word} onClick={handleAddNewWord}>
        <Plus />
      </button>
    </div>
  );
};
