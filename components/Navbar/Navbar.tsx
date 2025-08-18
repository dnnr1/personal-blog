import ThemeSwitch from "../ThemeSwitch";

function Navbar() {
  return (
    <div className="flex justify-between items-center py-4">
      <a href="/" className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-orange-600 via-orange-600 to-purple-900 flex items-center justify-center">
          <span className="text-4xl font-bold text-black dark:text-white bg-background dark:bg-dark-background rounded-full w-9 h-9 flex items-center justify-center">
            D
          </span>
        </div>
        <h1 className="text-2xl font-bold text-smoth-orange pl-1">ann</h1>
      </a>
      <ThemeSwitch />
    </div>
  );
}

export default Navbar;
