import { Trash2 } from "lucide-react";

export const ListWord = ({
  listWord,
  handleRemoveWord,
}: {
  listWord: string[];
  handleRemoveWord: (word: string) => void;
}) => {
  return (
    <div className="container-list">
      <ul>
        {listWord.map((item, index) => (
          <div key={index} className="list">
            <li>
              <span>{index + 1}.</span>
              {item}
            </li>
            <button onClick={() => handleRemoveWord(item)}>
              <Trash2 />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};
