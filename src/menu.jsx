import { useState, useEffect } from "react";
function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Tomato");

  const themes = [
    { name: "Tomato", start: "#fa795f", end: "#db2323" },
    { name: "Ocean", start: "#667eea", end: "#764ba2" },
    { name: "Forest", start: "#56ab2f", end: "#a8e063" },
    { name: "Sunset", start: "#ff512f", end: "#dd2476" },
    { name: "Night", start: "#232526", end: "#414345" }
  ];

   useEffect(() => {
    document.body.style.transition = 'background 1s ease-in-out';
    const initial = themes.find(t => t.name === selectedTheme) || themes[0];
    document.body.style.background = `linear-gradient(to right, ${initial.start}, ${initial.end})`;
  }, []);

  const changeTheme = (theme) => {
    document.body.style.transition = 'background 1s ease-in-out';
    document.body.style.background = 
      `linear-gradient(to right, ${theme.start}, ${theme.end})`;

    setSelectedTheme(theme.name);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-4 z-30 p-2 hover:bg-white/10 rounded-lg transition-colors"
        onClick={() => setShowMenu(prev => !prev)}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined text-4xl">
          {showMenu ? "close" : "menu"}
        </span>
      </button>

      {/* Side Menu */}
<div
  id="menu"
  className={`fixed top-0 right-0 z-20 w-72 h-screen bg-white/10 backdrop-blur-md border-l-2 border-white/20 p-6
    transition-transform duration-500 ease-out transform 
    ${showMenu ? "translate-x-0" : "translate-x-full"}`}
>
        <h2 className="text-2xl font-semibold mb-6 mt-16">Themes</h2>

        <div className="space-y-3">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className="w-full p-4 rounded-lg hover:scale-105 transition-transform shadow-lg flex items-center justify-between group"
              style={{ background: `linear-gradient(to right, ${theme.start}, ${theme.end})` }}
              onClick={() => changeTheme(theme)}
            >
              <span className="text-lg font-medium">{theme.name}</span>

              {/* Check icon shows on hover OR if selected */}
              <span
                className={`material-symbols-outlined transition-opacity ${
                  selectedTheme === theme.name
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                check_circle
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Click-outside overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/30 z-10"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}

export default Menu;
