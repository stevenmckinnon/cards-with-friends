import {
  Avatar,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { IPlayer } from "../../pages/create-game";

interface IPlayerListProps {
  players: IPlayer[];
  host: string;
  currentCzar: string | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playerList: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

const PlayerList: React.FC<IPlayerListProps> = ({
  players,
  host,
  currentCzar,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.playerList}>
      <Typography variant="h5" component="h1" className={classes.title}>
        Players
      </Typography>
      <List>
        {players.map((player) => (
          <ListItem
            alignItems="flex-start"
            key={player.uid}
            selected={currentCzar === player.uid}
          >
            <ListItemAvatar>
              <Avatar alt={player.displayName} src={player.photoURL} />
            </ListItemAvatar>
            <ListItemText
              primary={`${player.displayName}${
                host === player.uid ? " (Host)" : ""
              }`}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {`${player.points} points`}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PlayerList;
