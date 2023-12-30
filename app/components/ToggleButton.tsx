'use client';

import { FaMoon, FaSun } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ToggleButton = () => {
  const themes = {
    garden: 'garden',
    night: 'forest',
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.setAttribute('data-theme', localTheme);
    }
  }, []);
  const [theme, setTheme] = useState(themes.night);

  const toggleTheme = () => {
    const newTheme = theme === themes.garden ? themes.night : themes.garden;
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button className="btn btn-sm bg-transparent" onClick={toggleTheme}>
      {theme === themes.garden ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ToggleButton;
