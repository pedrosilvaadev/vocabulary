import { ClipboardList } from "lucide-react";

export const Header = ({
  handleCopyList,
  emptyList,
}: {
  handleCopyList: () => void;
  emptyList: boolean;
}) => {
  return (
    <div className="container-header">
      <h1>Vocabulary</h1>
      <button onClick={handleCopyList} disabled={emptyList}>
        <ClipboardList />
      </button>
    </div>
  );
};
