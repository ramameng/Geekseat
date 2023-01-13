import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Appbar from "./Appbar";
import Main from "./Main";

function App() {
  const darkTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Appbar>
        <Main />
      </Appbar>
    </ThemeProvider>
  );
}

export default App;
