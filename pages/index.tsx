import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import usePaste from "../hooks/usePaste";

const Home: NextPage = () => {
  const [text, setText] = useState<string | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [separatedLines, setSeparatedLines] = useState<string[]>([]);
  const [isTooShort, setIsTooShort] = useState<boolean>(false);

  const handleClipboardText = (text: string | null) => {
    setText(text);
    if (text && text.length < 10000) {
      setIsTooShort(true);
    } else {
      setIsTooShort(false);
    }
    console.table({ text });
  };
  const {} = usePaste(handleClipboardText);

  useEffect(() => {
    if (text && !isTooShort) {
      const splitLines = text.split(/\r?\n/);
      setLines(splitLines);
    }
  }, [text, isTooShort]);

  useEffect(() => {
    if (lines.length > 0 && !isTooShort) {
      const lineCount = lines.length;

      let separatedLines = [];
      let temp = [];
      let charCount = 0;
      for (let i = 0; i < lineCount; i++) {
        if (charCount + lines[i].length >= 10000) {
          separatedLines.push([...temp]);
          temp = [];
          charCount = 0;
        }
        temp.push(lines[i]);
        charCount += lines[i].length;
      }

      for (let i = 0; i < separatedLines.length; i++) {
        separatedLines[i].push(`**PART ${i + 1} ENDS HERE**`);
        separatedLines[i].push("\n\n\n");
      }
      const flattened = separatedLines.flat();
      setSeparatedLines(flattened);
    }
  }, [lines, isTooShort]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-slate-900 px-4 text-white">
      <header className="prose-lg mb-4 text-center text-zinc-200">
        <h1 className="text-4xl font-bold ">Paste any long text</h1>
        <p>
          Make sure that your text is <strong>newline</strong> delimited
        </p>
      </header>
      <div className="flex items-center justify-center">
        <textarea
          className="h-[400px] max-h-screen w-[300px] max-w-full resize rounded-lg border-2 border-gray-600 bg-slate-700 p-4 text-lg transition-colors duration-200 ease-in-out hover:border-slate-300 sm:w-[500px] lg:h-[600px] lg:w-[800px]"
          // rows={25}
          // cols={50}
          value={
            isTooShort
              ? "Your text is too short"
              : separatedLines.join("\n") ?? "There was a problem lol"
          }
          onChange={(e) => e.preventDefault()}
        ></textarea>
      </div>
    </main>
  );
};

export default Home;
