import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./utils/theme";
import Frontapge from "./frontpage"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Frontapge/>
      </div>
    </ThemeProvider>
  );
}

export default App;
