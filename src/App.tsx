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
import { Redirect, Route, Switch } from "react-router";
import GameBoard from "./pages/gameboard";
import AppShell from "./layouts/AppShell";
import Login from "./pages/login";
import Games from "./pages/games";
import CreateGame from "./pages/create-game";
import { darkTheme, lightTheme } from "./themes";
import NotFound from "./pages/NotFound";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

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
            <Route path="/not-found" component={NotFound} />
            <Route>
              <Redirect to="/not-found" />
            </Route>
          </Switch>
        </AppShell>
      )}
    </ThemeProvider>
  );
}

export default App;
