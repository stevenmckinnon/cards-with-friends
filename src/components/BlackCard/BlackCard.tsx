import {
  Card,
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import { darkTheme } from "../../themes";

export interface IBlackCard {
  value: string;
  id: string;
  takes: number;
}

interface IBlackCardProps {
  blackCard: IBlackCard;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: "14rem",
      width: "100%",
      height: "15rem",
      backgroundColor: "black",
      margin: "0 auto"
    },
    title: {
      fontWeight: "bold",
    },
  })
);

const BlackCard: React.FC<IBlackCardProps> = ({ blackCard }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            variant="subtitle1"
            component="h3"
            className={classes.title}
          >
            {blackCard.value}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default BlackCard;
