import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";
import { auth, firestore } from "../../App";
import { IBlackCard } from "../../components/BlackCard";
import { IWhiteCard } from "../../components/WhiteCard";

interface ICreateGameProps {}

export interface IPlayer {
  uid: string;
  displayName: string;
  photoURL: string;
  points: number;
  cards: IWhiteCard[];
}

export interface IGame {
  name: string;
  players: IPlayer[];
  createdBy: { uid: string; displayName: string; photoURL: string };
  started: boolean;
  active: boolean;
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
  currentCzar: string | null;
  round?: { blackCard: IBlackCard; picks: any[] };
  usedWhiteCards: string[];
  usedBlackCards: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    form: {
      marginTop: theme.spacing(2),
    },
    submit: {
      marginTop: theme.spacing(1),
      float: "right",
    },
  })
);

const CreateGame: React.FC<ICreateGameProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useAuthState(auth);
  const gamesRef = firestore.collection("games");
  const [existingGames] = useCollectionDataOnce(gamesRef);
  const [name, updateName] = useState("");
  const [error, updateError] = useState<{
    isError: boolean;
    errorText: null | string;
  }>({ isError: false, errorText: null });

  const checkIfNameExists = () => {
    let exists = false;
    if (existingGames) {
      (existingGames as IGame[]).forEach((existingGame) => {
        if (
          existingGame.name.toLowerCase() === name.toLowerCase() &&
          existingGame.active
        ) {
          exists = true;
        }
      });
    }
    return exists;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const exists = checkIfNameExists();
    if (exists) {
      return updateError({ isError: true, errorText: "Name already exists" });
    }
    if (error.isError) {
      updateError({ isError: false, errorText: null });
    }
    const { uid, displayName, photoURL } = user;
    const newGameData: IGame = {
      name,
      players: [{ uid, displayName, photoURL, points: 0, cards: [] }],
      createdBy: { uid, displayName, photoURL },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      started: false,
      active: true,
      currentCzar: null,
      usedBlackCards: [],
      usedWhiteCards: []
    };
    const newGame = await gamesRef.add(newGameData);
    updateName("");
    const newGameId = (await newGame.get()).id;
    return history.push(`/game/${newGameId}`);
  };

  return (
    <Container>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h1">
          Create A New Game
        </Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <Grid container spacing={1} alignContent="center" alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Game Name"
                onChange={(e) => updateName(e.target.value)}
                value={name}
                variant="outlined"
                fullWidth
                required
                focused
                error={error.isError}
                helperText={error.errorText}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={name.length === 0}
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateGame;
