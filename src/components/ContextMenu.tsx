import { IconButton, Menu, MenuItem, menuItemClasses } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export const ContextMenu = (props: {
  menuItems: Array<{ href: string; item: string; dataTestId?: string }>;
  dataTestId?: string;
}) => {
  const { menuItems, dataTestId } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div data-test={dataTestId}>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {menuItems.map((menuItem) => {
          return (
            <Link key={menuItem.item} href={menuItem.href} passHref>
              <MenuItem data-test={menuItem.dataTestId}>
                {menuItem.item}
              </MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
};
