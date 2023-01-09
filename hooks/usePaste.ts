import { useState, useEffect, useCallback } from "react";

function usePaste(onPaste: (text: string | null) => void) {
  const [isPasting, setIsPasting] = useState(false);
  const [pastedText, setPastedText] = useState<string | null>(null);

  useEffect(() => {
    if (isPasting) {
      onPaste(pastedText);
      setIsPasting(false);
      setPastedText("");
    }
  }, [isPasting, pastedText, onPaste]);

  const handlePaste = useCallback(function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    setPastedText(e.clipboardData?.getData("text") ?? "there is no text");
    setIsPasting(true);
  }, []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste as EventListener);
    return () => {
      window.removeEventListener("paste", handlePaste as EventListener);
    };
  }, [handlePaste]);

  return {};
}

export default usePaste;
