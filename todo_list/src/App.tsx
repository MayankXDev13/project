import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import Box from "./components/Box";


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onToggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");   // enable dark mode
      } else {
        document.documentElement.classList.remove("dark"); // disable dark mode
      }
      return newMode;
    });
  };

  // Optional: load saved theme from localStorage
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <>
      <NavBar onToggleTheme={onToggleTheme} isDarkMode={isDarkMode} />


      <Box/>
    </>
  )
}

export default App
