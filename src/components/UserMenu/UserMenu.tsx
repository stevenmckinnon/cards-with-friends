import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";
import UserMenuButton from "./UserMenuButton";
import UserMenuPopover from "./UserMenuPopover";

interface IUserMenuProps {}

const UserMenu: React.FC<IUserMenuProps> = () => {
  const [user] = useAuthState(auth);
  const { displayName, photoURL } = user;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const signOut = async () => {
    setAnchorEl(null);
    await auth.signOut();
  };

  return (
    <div data-testid="user-menu">
      {user && (
        <>
          <UserMenuButton
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleClick}
            displayName={displayName}
            photoURL={photoURL}
          />

          <UserMenuPopover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            signOut={signOut}
          />
        </>
      )}
    </div>
  );
};

export default UserMenu;
