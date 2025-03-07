import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useWord } from "../src/hooks/useWord";
import { act } from "react";
import { toast } from "react-toastify";

describe("useWord", () => {
  test("listWord should be an array", () => {
    const { result } = renderHook(() => useWord());

    expect(Array.isArray(result.current.listWord)).toBeTruthy();
  });

  test("listWord should be empty", () => {
    const { result } = renderHook(() => useWord());

    expect(result.current.listWord).toEqual([]);
  });

  test("word should be empty", () => {
    const { result } = renderHook(() => useWord());

    expect(result.current.word).toEqual("");
  });

  test("word should change value", async () => {
    const { result } = renderHook(() => useWord());

    act(() => {
      result.current.setWord("hello");
    });

    await waitFor(() => {
      expect(result.current.word).toEqual("hello");
    });
  });

  test("handleAddNewWord should add a new word to listWord", async () => {
    const { result } = renderHook(() => useWord());

    act(() => {
      result.current.setWord("hello");
    });
    act(() => {
      result.current.handleAddNewWord();
    });

    await waitFor(() => {
      expect(result.current.listWord).toEqual(["hello"]);
    });
  });

  test("handleAddNewWord should not add empty words", async () => {
    const { result } = renderHook(() => useWord());

    act(() => {
      result.current.handleRemoveWord("hello");
    });

    act(() => {
      result.current.handleAddNewWord();
    });

    await waitFor(() => {
      expect(result.current.listWord).toEqual([]);
    });
  });

  test("handleAddNewWord should not add duplicate words", async () => {
    const { result } = renderHook(() => useWord());

    act(() => {
      result.current.setWord("hello");
    });
    act(() => {
      result.current.handleAddNewWord();
    });
    act(() => {
      result.current.setWord("hello");
    });
    act(() => {
      result.current.handleAddNewWord();
    });

    await waitFor(() => {
      expect(result.current.listWord).toEqual(["hello"]);
    });
  });

  test("handleAddNewWord should show error toast for duplicate word", async () => {
    const { result } = renderHook(() => useWord());
    const toastSpy = vi.spyOn(toast, "error");

    act(() => {
      result.current.setWord("hello");
    });
    act(() => {
      result.current.handleAddNewWord();
    });
    act(() => {
      result.current.setWord("hello");
    });
    act(() => {
      result.current.handleAddNewWord();
    });

    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith("Word already exists", {
        autoClose: 5000,
        position: "top-right",
      });
    });
  });

  test("handleRemoveWord should remove a word from listWord", async () => {
    const { result } = renderHook(() => useWord());

    act(() => {
      result.current.setWord("hello");
    });
    act(() => {
      result.current.handleAddNewWord();
    });
    act(() => {
      result.current.handleRemoveWord("hello");
    });

    await waitFor(() => {
      expect(result.current.listWord).toEqual([]);
    });
  });

  test("handleCopyList should copy listWord to clipboard", async () => {
    const { result } = renderHook(() => useWord());

    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    act(() => {
      result.current.setWord("hello");
    });
    act(() => {
      result.current.handleAddNewWord();
    });
    act(() => {
      result.current.handleCopyList();
    });

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "Vocabulary List:\n\nhello"
      );
    });
  });
});
