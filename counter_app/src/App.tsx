import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState<number>(() => {
    const storedCounter = localStorage.getItem("counter");
    return storedCounter ? parseInt(storedCounter, 10) : 0;
  });


  useEffect(() => {
    localStorage.setItem("counter", counter.toString());
  }, [counter]);

  const increment = () => setCounter(prev => prev + 1);
  const decrement = () => setCounter(prev => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCounter(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-teal-400 p-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-white/30 p-6 shadow-lg backdrop-blur-md">
        <h1 className="mb-4 text-center font-mono text-3xl font-bold text-purple-600">
          Counter App
        </h1>

        <h2 className="mb-6 text-center font-mono text-2xl">
          Counter Value: <span className="font-bold">{counter}</span>
        </h2>

        <div className="flex w-full justify-center gap-4">
          <button
            onClick={increment}
            className="flex-1 rounded-lg bg-green-500 px-4 py-2 font-mono text-lg text-white transition-transform hover:scale-105 active:scale-95"
          >
            Add Value
          </button>
          <button
            onClick={decrement}
            className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-mono text-lg text-white transition-transform hover:scale-105 active:scale-95"
          >
            Remove Value
          </button>
          <button
            onClick={reset}
            className="flex-1 rounded-lg bg-yellow-500 px-4 py-2 font-mono text-lg text-white transition-transform hover:scale-105 active:scale-95"
          >
            Reset Counter
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
