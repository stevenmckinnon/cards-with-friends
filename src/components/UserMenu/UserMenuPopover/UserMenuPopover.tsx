import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  PopoverProps,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import React from "react";

interface IUserMenuPopoverProps extends PopoverProps {
    signOut: () => Promise<void>;
}

const UserMenuPopover: React.FC<IUserMenuPopoverProps> = ({signOut, ...props}) => {
  return (
    <Popover {...props}>
      <List>
        <ListItem button onClick={signOut}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </ListItem>
      </List>
    </Popover>
  );
};

export default UserMenuPopover;
