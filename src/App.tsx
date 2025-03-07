import "./App.css";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/header";
import { InputWord } from "./components/inputWord";
import { useWord } from "./hooks/useWord";
import { ListWord } from "./components/listWord";

function App() {
  const {
    listWord,
    handleRemoveWord,
    handleAddNewWord,
    setWord,
    word,
    handleCopyList,
  } = useWord();

  return (
    <>
      <Header handleCopyList={handleCopyList} />
      <InputWord
        handleAddNewWord={handleAddNewWord}
        word={word}
        setWord={setWord}
      />
      <ListWord handleRemoveWord={handleRemoveWord} listWord={listWord} />
      <ToastContainer />
    </>
  );
}

export default App;
