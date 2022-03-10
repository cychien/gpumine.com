import * as React from "react";

type ThemeState = string;

type ThemeContext = {
  theme: ThemeState;
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const ThemeCtx = React.createContext<ThemeContext>({
  theme: "",
  setTheme: () => {},
});

function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = React.useState<ThemeState>("light");

  React.useEffect(() => {
    function getUserPreference() {
      if (window.localStorage.getItem("color-mode")) {
        return window.localStorage.getItem("color-mode");
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    const theme = getUserPreference();
    if (theme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  React.useEffect(() => {
    if (theme === "dark") {
      window.localStorage.setItem("color-mode", "dark");
      document.documentElement.classList.add("dark");
    } else {
      window.localStorage.setItem("color-mode", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeCtx);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme };
