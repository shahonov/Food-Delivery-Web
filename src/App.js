/* istanbul ignore file */

import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import ApplicationLoader from "./components/ApplicationLoader";
import Notification from "./components/Notification";
import NavigationBar from "components/NavigationBar";
import AppRouter from "AppRouter";

import theme from "global/theme";
import { history } from "data/store";

import 'global-styles.scss';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <ApplicationLoader />
        <NavigationBar />
        <Notification />
        <AppRouter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
