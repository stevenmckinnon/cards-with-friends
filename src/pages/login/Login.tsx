import React from "react";
import Container from "@material-ui/core/Container";
import { Button, Typography } from "@material-ui/core";
import firebase from "firebase";
import { auth } from "../../App";

interface ILogin {}

const Login: React.FC<ILogin> = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Container>
      <Typography variant="h5">Login</Typography>
      <Button variant="contained" color="default" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </Container>
  );
};

export default Login;
