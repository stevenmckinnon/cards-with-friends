import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

interface INotFoundProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      width: "100%",
      height: "calc(100% - 60px)",
      background:
        "url(https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif) no-repeat center center fixed",
      backgroundSize: "cover",
    },
    textContainer: {
      textAlign: "center",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)",
    },
    home: {
      marginTop: theme.spacing(2),
    },
    text: {
      textShadow: "2px 2px #5a5a5a",
    },
  })
);

const NotFound: React.FC<INotFoundProps> = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      <div className={classes.textContainer}>
        <Typography variant="h2" className={classes.text}>
          404 Not Found
        </Typography>
        <Typography variant="h5" className={classes.text}>
          The page you were looking for could not be found, try heading back
          home.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push("/")}
          className={classes.home}
        >
          Home
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
