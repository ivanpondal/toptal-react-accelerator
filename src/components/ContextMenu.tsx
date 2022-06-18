import { IconButton, Menu, MenuItem, menuItemClasses } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export const ContextMenu = (props: {
  menuItems: Array<{ href: string; item: string }>;
}) => {
  const { menuItems } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {menuItems.map((menuItem) => {
          return (
            <Link key={menuItem.item} href={menuItem.href} passHref>
              <MenuItem>{menuItem.item}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </>
  );
};
