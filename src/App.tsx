import { Router } from "./components/Router";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaulTheme } from "./components/styles/themes/default";
import { GlobalStyle } from "./components/styles/themes/global";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {

  return (
    <ThemeProvider theme={defaulTheme}>
      <BrowserRouter>
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
