import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import WhiteCard, { IWhiteCard } from "../WhiteCard";
import { auth, firestore } from "../../App";
import { IPlayer } from "../../pages/create-game";

interface IUserDeck {
  gameId: string;
  whiteCards: IWhiteCard[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myCards: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    submitBtn: {
      float: "right",
    },
  })
);

const UserDeck: React.FC<IUserDeck> = ({ gameId, whiteCards }) => {
  const classes = useStyles();
  const [selectedCard, setSelectedCard] = useState<IWhiteCard | null>(null);
  const [user] = useAuthState(auth);

  const onSubmit = async () => {
    const { uid } = user;
    const updatedUserDeck = [...whiteCards];
    const index = updatedUserDeck.findIndex(
      (card: any) => card.id === selectedCard
    );
    updatedUserDeck.splice(index, 1);
    setSelectedCard(null);
    const gamesRef = firestore.collection("games");
    const currentData = (await gamesRef.doc(gameId).get()).data();
    if (currentData) {
      const updatedRoundPicks = [...currentData.round.picks];
      updatedRoundPicks.push({
        uid,
        value: selectedCard?.value,
        id: selectedCard?.id,
      });
      const updatedPlayers: IPlayer[] = [...currentData.players];
      const currentPlayerIndex = updatedPlayers.findIndex(
        (player) => player.uid === user.uid
      );
      const myCards = [...updatedPlayers[currentPlayerIndex].cards];
      const selectedCardIndex = myCards.findIndex(
        (card) => card.id === selectedCard?.id
      );
      myCards.splice(selectedCardIndex, 1);
      const me = {
        ...updatedPlayers[currentPlayerIndex],
        cards: myCards,
      };
      updatedPlayers.splice(currentPlayerIndex, 1, me);
      
      await gamesRef.doc(gameId).update({
        round: {
          ...currentData.round,
          picks: updatedRoundPicks,
        },
        players: updatedPlayers,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <Paper className={classes.myCards}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Typography variant="h4" component="h4" className={classes.title}>
            My Cards
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedCard == null}
            className={classes.submitBtn}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {whiteCards.map((card) => (
          <Grid item xs={6} sm={4} md={3} key={card.id}>
            <WhiteCard
              card={card}
              selectedCard={selectedCard}
              selectCard={setSelectedCard}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UserDeck;
