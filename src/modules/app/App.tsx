// App.tsx
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import Routing from "../../routes/Routing";
import Header from "../../shared/components/Header"; // Import the Header component
import { store } from "../../shared/services/store";
import { GlobalStyles } from "../../shared/styles/GlobalStyles";
import { darkTheme, lightTheme } from "../../shared/styles/theme";
import { eagerConnection } from "../../wallets/helpers/EagerConnect";

const App: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const [theme, setTheme] = useState(darkTheme);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    eagerConnection();
  }, []);

  useEffect(() => {
    setOpen(true);
    setTheme(checked ? lightTheme : darkTheme);
    const data = JSON.stringify(checked ? "lightTheme" : "darkTheme");
    localStorage.setItem("theme", data);
    setOpen(false);
  }, [checked]);

  const handleSwitchChange = (isChecked: boolean) => {
    setChecked(!isChecked);
  };


  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header onSwitchChange={handleSwitchChange} />
          <Routing />
        </ThemeProvider>
      </Provider>
    </Router>
  );
};

export default App;
