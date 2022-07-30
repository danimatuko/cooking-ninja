import React from "react";
import { useTheme } from "../../hooks/useTheme";
import "./ThemeSelector.css";
import ModeIcon from "../../assets/mode-icon.svg";

const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme();
  const themeColors = ["#58249c", "#249c6b", "#b70233"];

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={ModeIcon}
          onClick={toggleMode}
          alt="dark/light mode picker"
          style={{
            filter: mode === "dark" ? "invert(100%)" : "invert(20%)",
          }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
