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
  return (
    <div className="container-input ">
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        type="text"
      />
      <button disabled={!word} onClick={handleAddNewWord}>
        <Plus />
      </button>
    </div>
  );
};
