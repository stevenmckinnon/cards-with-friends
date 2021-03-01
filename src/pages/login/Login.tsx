import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { auth, uiConfig } from "../../App";

interface ILogin {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

const Login: React.FC<ILogin> = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cards With Friends
        </Typography>
        <Typography variant="h5">Login</Typography>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Paper>
    </Container>
  );
};

export default Login;
