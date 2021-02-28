import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import { Route, Switch } from "react-router";
import GameBoard from "./pages/gameboard";
import AppShell from "./layouts/AppShell";
import Login from "./pages/login";
import Games from "./pages/games";
import CreateGame from "./pages/create-game";
import { darkTheme, lightTheme } from "./themes";

firebase.initializeApp({
  apiKey: "AIzaSyD3bLrKyx6WgL37vzPrbfFdniIIhGVdSW8",
  authDomain: "cards-with-friends-22993.firebaseapp.com",
  projectId: "cards-with-friends-22993",
  storageBucket: "cards-with-friends-22993.appspot.com",
  messagingSenderId: "962205413317",
  appId: "1:962205413317:web:b0174f5dc2e1557f77a5ac",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => (prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {!user ? (
        <Login />
      ) : (
        <AppShell>
          <Switch>
            <Route exact path="/" component={Games} />
            <Route path="/game/:gameId" component={GameBoard} />
            <Route path="/create-game" component={CreateGame} />
          </Switch>
        </AppShell>
      )}
    </ThemeProvider>
  );
}

export default App;
