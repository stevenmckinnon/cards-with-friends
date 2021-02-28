import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export interface ILoadingProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const Loading: React.FC<ILoadingProps> = () => {
  const classes = useStyles();

  return (
    <Container>
      <Backdrop data-testid="loading-spinner" className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Loading;
