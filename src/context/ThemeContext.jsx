import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('theme') || 'light';
	});

	const toggleTheme = () => {
		setTheme(prev => prev === 'light' ? 'dark' : 'light');

		console.log({ theme })
	};

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className={`app ${theme}`}>
				{children}
			</div>
		</ThemeContext.Provider>
	)
}

export default ThemeContext;
// Currently not used.
