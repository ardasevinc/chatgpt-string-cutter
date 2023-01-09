import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import usePaste from "../hooks/usePaste";

const Home: NextPage = () => {
  const [text, setText] = useState<string | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [separatedLines, setSeparatedLines] = useState<string[]>([]);

  const handleClipboardText = (text: string | null) => {
    setText(text);
    // console.table({ text });
  };
  const {} = usePaste(handleClipboardText);

  useEffect(() => {
    if (text) {
      const splitLines = text.split(/\r?\n/);
      setLines(splitLines);
    }
  }, [text]);

  useEffect(() => {
    if (lines.length > 0) {
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
  }, [lines]);

  return (
    <>
      <Head>
        <title>tailwind starter template</title>
      </Head>
      <main className="flex flex-1 flex-col items-center justify-center bg-slate-900 text-white ">
        <div className="">
          <textarea
            readOnly
            className="flex h-[800px] w-[700px] items-center justify-center overflow-scroll rounded-lg border-2 border-gray-600 bg-slate-700 p-4 text-lg transition-all duration-300 ease-in-out hover:border-slate-300"
            cols={50}
            rows={100}
            value={
              separatedLines.join("\n") ??
              "There was a problem lol" ??
              "Paste something here"
            }
          ></textarea>
        </div>
      </main>
    </>
  );
};

export default Home;
