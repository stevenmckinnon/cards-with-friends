import { Button, Grid, Paper, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import {
  DataGrid,
  GridColDef,
  ValueFormatterParams,
  GridCellParams,
} from "@material-ui/data-grid";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";
import { firestore } from "../../App";
import JoinGame from "../../components/JoinGame";

interface IGamesProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    games: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    createButton: {
      float: "right",
    },
    noGames: {
      textAlign: "center",
    },
  })
);

const columns: GridColDef[] = [
  {
    field: "id",
    hide: true,
  },
  {
    field: "createdAt",
    hide: true,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "players",
    headerName: "Number of Players",
    valueFormatter: (params: ValueFormatterParams) =>
      (params.value as any[]).length ?? 0,
    flex: 0.3,
  },
  {
    field: "started",
    headerName: "Game Started?",
    valueFormatter: (params: ValueFormatterParams) =>
      (params.value as boolean) ? "Yes" : "No",
    flex: 0.3,
  },
  {
    field: "actions",
    headerName: " ",
    renderCell: (params: GridCellParams) => <JoinGame game={params.row} />,
    flex: 0.3,
  },
];

const Games: React.FC<IGamesProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const gamesRef = firestore.collection("games");
  const query = gamesRef.where("active", "==", true).limit(10);
  const [games] = useCollectionData(query, { idField: "id" });

  const onCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/create-game');
  }

  return (
    <Container>
      <Paper className={classes.games}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography variant="h4" component="h4" className={classes.title}>
              Active Games
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.createButton}
              onClick={onCreate}
            >
              Create Game
            </Button>
          </Grid>
        </Grid>
        {games && games.length > 0 ? (
          <div>
            <DataGrid
              rows={games as any[]}
              columns={columns}
              autoHeight
              pageSize={10}
              sortModel={[{ field: "createdAt", sort: "desc"}]}
            />
          </div>
        ) : (
          <Typography variant="subtitle1" className={classes.noGames}>
            There&#39;s currently no games 🙁 try creating one
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Games;
