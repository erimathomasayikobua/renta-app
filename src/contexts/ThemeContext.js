import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

const validThemes = ['default', 'dark', 'light'];

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('default');

	useEffect(() => {
		const saved = localStorage.getItem('rentaAppTheme');
		if (saved && validThemes.includes(saved)) {
			applyTheme(saved);
		} else {
			applyTheme('default');
		}
	}, []);

	const applyTheme = (nextTheme) => {
		setTheme(nextTheme);
		localStorage.setItem('rentaAppTheme', nextTheme);
		document.documentElement.setAttribute('data-theme', nextTheme);
	};

	const value = {
		theme,
		setTheme: applyTheme,
		themes: validThemes
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export default ThemeContext;




