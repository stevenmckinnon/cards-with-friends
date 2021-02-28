import { Button } from "@material-ui/core";
import React from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../App";
import { IPlayer } from "../../pages/create-game";

interface IJoinGameProps {
  game: any;
}

const JoinGame: React.FC<IJoinGameProps> = ({ game }) => {
  const [user] = useAuthState(auth);
  const history = useHistory();

  const onJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { uid, displayName, photoURL } = user;
    const gamesRef = firestore.collection("games");
    const updatedPlayersList: IPlayer[] = [...game.players];
    if (updatedPlayersList.findIndex((player) => player.uid === uid) === -1) {
      updatedPlayersList.push({ uid, displayName, photoURL, points: 0, cards: [] });
    }
    await gamesRef.doc(game.id).update({
      players: updatedPlayersList,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    history.push(`/game/${game.id}`);
  };

  return (
    <Button variant="contained" color="primary" onClick={onJoin}>
      Join Game
    </Button>
  );
};

export default JoinGame;
