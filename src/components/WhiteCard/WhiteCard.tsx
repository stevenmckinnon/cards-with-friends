import {
  Card,
  CardActionArea,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { emphasize } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { whiteCards } from "../../mock-data/white-cards";
import { lightTheme } from "../../themes";

export interface IWhiteCard {
  id: string;
  value: string;
  uid?: string;
}

interface IWhiteCardProps {
  card: IWhiteCard;
  selectedCard: IWhiteCard | null;
  selectCard: (whiteCard: IWhiteCard | null) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: "11rem",
      width: "100%",
      height: "13rem",
      cursor: "pointer",
      "&:hover": {
        transition: theme.transitions.create(["transform"], {
          duration: theme.transitions.duration.standard,
        }),
        transform: "scale(1.1)",
      },
    },
    selectedCard: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    title: {
      fontWeight: "bold",
    },
  })
);

const WhiteCard: React.FC<IWhiteCardProps> = ({
  card,
  selectCard,
  selectedCard,
}) => {
  const classes = useStyles();
  const { value, id } = card;
  return (
    <ThemeProvider theme={lightTheme}>
      <Card
        className={clsx(
          classes.card,
          selectedCard?.id === id && classes.selectedCard
        )}
        onClick={() => selectCard(card)}
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            component="h3"
            className={classes.title}
          >
            {value}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default WhiteCard;
