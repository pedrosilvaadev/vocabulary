import { ClipboardList } from "lucide-react";

export const Header = ({ handleCopyList }: { handleCopyList: () => void }) => {
  return (
    <div className="container-header">
      <h1>Vocabulary</h1>
      <button onClick={handleCopyList}>
        <ClipboardList />
      </button>
    </div>
  );
};
