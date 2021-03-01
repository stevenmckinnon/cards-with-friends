import React from "react";
import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { Redirect, RouteProps, useHistory, useParams } from "react-router";
import {
  useCollectionDataOnce,
  useDocument,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import BlackCard, { IBlackCard } from "../../components/BlackCard";
import UserDeck from "../../components/UserDeck";
import { auth, firestore } from "../../App";
import PlayerList from "../../components/PlayerList";
import { IGame } from "../create-game";
import Loading from "../../components/Loading";
import Selections from "../../components/Selections";
import GameStateButtons from "../../components/GameStateButtons";
import { IWhiteCard } from "../../components/WhiteCard";

interface IGameBoard extends RouteProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    inactiveGame: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    homeButton: {
      marginTop: theme.spacing(2),
    },
  })
);

const GameBoard: React.FC<IGameBoard> = () => {
  const classes = useStyles();
  const { gameId }: { gameId: string } = useParams();
  const [user] = useAuthState(auth);
  const history = useHistory();
  const [gameData, gameLoading, error] = useDocument(
    firestore.doc(`games/${gameId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const blackCardsRef = firestore.collection("black-cards");
  const [blackCardsData, blackCardsLoading] = useCollectionDataOnce(
    blackCardsRef,
    {
      idField: "id",
    }
  );
  const whiteCardsRef = firestore.collection("white-cards");
  const [whiteCardsData, whiteCardsLoading] = useCollectionDataOnce(
    whiteCardsRef,
    {
      idField: "id",
    }
  );

  if (gameLoading || blackCardsLoading || whiteCardsLoading) {
    return <Loading />;
  }
  
  const game = gameData.data() as IGame;
  
  if (!game) {
    return <Redirect to="/not-found" />
  }

  const blackCards = blackCardsData as IBlackCard[];
  const whiteCards = whiteCardsData as IWhiteCard[];
  const isCreator = user.uid === game.createdBy.uid;

  const selections: IWhiteCard[] = game.round?.picks || [];

  const myCards = game.players.find((player) => player.uid === user.uid)?.cards;

  if (!game.active) {
    return (
      <Container>
        <Paper className={classes.inactiveGame}>
          <Typography variant="h4" component="h1">
            Game is no longer active.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/")}
            className={classes.homeButton}
          >
            Go Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container alignContent="center">
        <Grid item xs={9} className={classes.header}>
          <Typography variant="h4" component="h1">
            {game.name}
          </Typography>
        </Grid>
        {isCreator && (
          <Grid item xs={3}>
            <GameStateButtons
              gameId={gameId}
              started={game.started}
              blackCards={blackCards}
              whiteCards={whiteCards}
            />
          </Grid>
        )}
      </Grid>
      {game.started ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <BlackCard blackCard={game.round!.blackCard} />
            </Grid>
            <Grid item xs={9}>
              <Selections
                selections={selections}
                playerCount={game.players.length}
                isCzar={game.currentCzar === user.uid}
                gameId={gameId}
                blackCards={blackCards}
                whiteCards={whiteCards}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <PlayerList
                players={game.players}
                host={game.createdBy.uid}
                currentCzar={game.currentCzar}
              />
            </Grid>
            <Grid item xs={9}>
              <UserDeck gameId={gameId} whiteCards={myCards!} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container alignContent="center">
          <Grid item xs={12}>
            <PlayerList
              players={game.players}
              host={game.createdBy.uid}
              currentCzar={game.currentCzar}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default GameBoard;
