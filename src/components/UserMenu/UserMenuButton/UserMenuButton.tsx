import { Button, ButtonProps } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";

interface IUserMenuButtonProps extends ButtonProps {
  displayName: string;
  photoURL: string;
}

const UserMenuButton: React.FC<IUserMenuButtonProps> = ({
  displayName,
  photoURL,
  ...props
}) => (
  <Button {...props}>
    <Avatar alt={displayName} src={photoURL} />
  </Button>
);

export default UserMenuButton;
