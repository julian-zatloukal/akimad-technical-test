import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./utils/theme";
import Frontapge from "./frontpage";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Frontapge />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
