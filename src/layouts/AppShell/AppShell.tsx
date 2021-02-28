import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { auth } from "../../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    titleLink: {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  })
);

interface IAppShell {
  children: React.ReactNode;
}

const AppShell: React.FC<IAppShell> = ({ children }) => {
  const classes = useStyles();
  const [user] = useAuthState(auth);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Cards With Friends
            </Link>
          </Typography>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default AppShell;
