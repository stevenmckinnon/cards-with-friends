import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import firebase from "firebase/app";
import React, { useState } from "react";
import { firestore } from "../../App";
import { IGame, IPlayer } from "../../pages/create-game";
import { IBlackCard } from "../BlackCard";
import WhiteCard, { IWhiteCard } from "../WhiteCard";

interface ISelectionProps {
  selections: IWhiteCard[];
  playerCount: number;
  isCzar: boolean;
  gameId: string;
  blackCards: IBlackCard[];
  whiteCards: IWhiteCard[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      padding: theme.spacing(2),
    },
    submitButton: {
      float: "right",
    },
  })
);

const getNextCzar = (players: IPlayer[], currentCzar: string) => {
  const czarIndex = players.findIndex((player) => player.uid === currentCzar);
  if (czarIndex === players.length - 1) {
    return 0;
  }
  return czarIndex + 1;
};

const Selection: React.FC<ISelectionProps> = ({
  selections,
  playerCount,
  isCzar,
  gameId,
  blackCards,
  whiteCards,
}) => {
  const classes = useStyles();
  const [winningCard, updateWinningCard] = useState<IWhiteCard | null>(null);

  const drawNewCard = (gameData: IGame) => {
    const usedWhiteCards = [...gameData.usedWhiteCards];
    const { players } = gameData!;
    const updatedPlayers: IPlayer[] = [];
    (players as IPlayer[]).forEach((player) => {
      const cardList: IWhiteCard[] = [...player.cards];
      while (cardList.length < 10) {
        const randomWhiteCard =
          whiteCards[Math.floor(Math.random() * whiteCards.length)];
        if (
          usedWhiteCards.findIndex((item) => item === randomWhiteCard.id) === -1
        ) {
          cardList.push(randomWhiteCard);
          usedWhiteCards.push(randomWhiteCard.id);
        }
      }
      updatedPlayers.push({
        ...player,
        cards: cardList,
      });
    });
    return { updatedPlayers, usedWhiteCards };
  };

  const onSelectWinner = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const gamesRef = firestore.collection("games");
    const currentData = (await gamesRef.doc(gameId).get()).data();
    if (currentData) {
      const { usedWhiteCards, updatedPlayers } = drawNewCard(
        currentData as IGame
      );
      const updateWinner = [...updatedPlayers];
      const winnerIndex = updateWinner.findIndex(
        (player) => player.uid === winningCard!.uid
      );
      const winningPlayer = {
        ...updateWinner[winnerIndex],
        points: updateWinner[winnerIndex].points + 1,
      };
      updateWinner.splice(winnerIndex, 1, winningPlayer);

      await gamesRef.doc(gameId).update({
        players: updateWinner,
        usedWhiteCards,
        currentCzar:
          currentData.players[
            getNextCzar(currentData.players, currentData.currentCzar)
          ].uid,
        round: {
          blackCard: blackCards[Math.floor(Math.random() * blackCards.length)],
          picks: [],
        },

        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <Paper className={classes.root}>
      {isCzar && selections.length === playerCount && (
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={!winningCard}
              onClick={onSelectWinner}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
      {selections.map((selection) => (
        <WhiteCard
          key={selection.id}
          card={selection}
          selectedCard={winningCard}
          selectCard={updateWinningCard}
        />
      ))}
    </Paper>
  );
};

export default Selection;
