import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface NavBarProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

function NavBar({ onToggleTheme, isDarkMode }: NavBarProps) {
  return (
    <>
      <nav className="">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">Todo</h1>
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <FontAwesomeIcon icon={faSun} className=" text-2xl" />
            ) : (
              <FontAwesomeIcon icon={faMoon} className=" text-2xl" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
