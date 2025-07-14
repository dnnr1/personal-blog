import ThemeSwitch from "../ThemeSwitch";

function Navbar() {
  return (
    <div className="flex justify-around items-center p-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-b from-orange-600 via-orange-600 to-purple-900 flex items-center justify-center">
          <span className="text-4xl font-bold text-black dark:text-white bg-background dark:bg-dark-background rounded-full w-9 h-9 flex items-center justify-center">
            G
          </span>
        </div>
        <h1 className="text-2xl font-bold text-smoth-orange">BLOG</h1>
      </div>
      <ThemeSwitch />
    </div>
  );
}

export default Navbar;
