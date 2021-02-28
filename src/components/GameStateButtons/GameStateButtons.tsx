import React from "react";
import firebase from "firebase/app";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../App";
import { IBlackCard } from "../BlackCard";
import { IWhiteCard } from "../WhiteCard";
import { IGame, IPlayer } from "../../pages/create-game";

interface IGameStateButtonsProps {
  started: boolean;
  gameId: string;
  blackCards: IBlackCard[];
  whiteCards: IWhiteCard[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gameButton: {
      float: "right",
    },
  })
);

const GameStateButtons: React.FC<IGameStateButtonsProps> = ({
  started,
  gameId,
  blackCards,
  whiteCards,
}) => {
  const [user] = useAuthState(auth);
  const classes = useStyles();

  const getPlayerCards = async (gameData: IGame) => {
    const usedWhiteCards: string[] = [];
    const { players } = gameData!;
    const updatedPlayers: IPlayer[] = [];
    (players as IPlayer[]).forEach((player) => {
      const cardList: IWhiteCard[] = [];
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

  const onStart = async () => {
    const gamesRef = firestore.collection("games");
    const currentData = (await gamesRef.doc(gameId).get()).data();
    const { usedWhiteCards, updatedPlayers } = await getPlayerCards(
      currentData as IGame
    );
    await gamesRef.doc(gameId).update({
      started: true,
      currentCzar: user.uid,
      players: updatedPlayers,
      usedWhiteCards,
      round: {
        blackCard: blackCards[Math.floor(Math.random() * blackCards.length)],
        picks: [],
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const onStop = async () => {
    const gamesRef = firestore.collection("games");
    await gamesRef.doc(gameId).update({
      started: false,
      active: false,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return started ? (
    <Button
      variant="contained"
      color="default"
      className={classes.gameButton}
      onClick={onStop}
    >
      End Game
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      className={classes.gameButton}
      onClick={onStart}
    >
      Start Game
    </Button>
  );
};
export default GameStateButtons;
