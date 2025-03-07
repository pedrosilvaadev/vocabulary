import { useEffect, useState } from "react";
import { toast, ToastOptions } from "react-toastify";

export const useWord = () => {
  const defaultConfigToast: ToastOptions<unknown> = {
    position: "top-right",
    autoClose: 5000,
  };
  const [word, setWord] = useState<string>("");
  const [listWord, setListWord] = useState<string[]>(() => {
    const storedWords = localStorage.getItem("words");
    return storedWords ? JSON.parse(storedWords) : [];
  });

  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(listWord));
  }, [listWord]);

  const handleAddNewWord = () => {
    if (!word) return;
    if (listWord.includes(word))
      return toast.error("Word already exists", defaultConfigToast);

    setListWord([...listWord, word]);
    setWord("");
  };

  const handleRemoveWord = (word: string) => {
    const newListWord = listWord.filter((item) => item !== word);
    setListWord(newListWord);
  };

  const handleCopyList = () => {
    if (listWord.length === 0)
      return toast.error("List is empty", defaultConfigToast);

    navigator.clipboard.writeText(`Vocabulary List:\n\n${listWord.join("\n")}`);
    toast.success("List copied to clipboard", defaultConfigToast);
  };

  return {
    listWord,
    word,
    setWord,
    handleAddNewWord,
    handleRemoveWord,
    handleCopyList,
  };
};
