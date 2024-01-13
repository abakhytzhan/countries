import * as React from "react";
import PageNotFound from "./pages/PageNotFound";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Flags from "./pages/Flags";
import CoatOfArms from "./pages/CoatOfArms";
import CountryDetails from "./pages/CountryDetails";
import Quiz from "./pages/Quiz";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DragAndDrop from "./pages/DragAndDrop";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="flags" element={<Flags />} />
            <Route path="flags/:countryId" element={<CountryDetails />} />
            <Route path="coatofarms" element={<CoatOfArms />} />
            <Route path="coatofarms/:countryId" element={<CountryDetails />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="draganddrop" element={<DragAndDrop />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
