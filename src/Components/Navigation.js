import React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import BookIcon from "@mui/icons-material/Book";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import store from "../Store/store";
import { Link } from "react-router-dom";
import { removeToken } from "../Store/slices/authSlice";
import { removeCart } from "../Store/slices/cartSlice";

import "./Navigation.css";

const Navigation = () => {
  const matches = useMediaQuery("(max-width:530px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    store.dispatch(removeToken());
    store.dispatch(removeCart());
  };
  return (
    <nav>
      <div className="header">
        <Link to="/">
          <img
            src="https://github.com/anapao-minchaca/Book2Up/blob/main/frontend/img/logo.png?raw=true"
            alt="book2uplogo"
          />
        </Link>
      </div>

      <div className="avatar-container">
        <div className="shopping-cart-logo">
          <Link to="/cart">
            <IconButton aria-label="delete">
              <ShoppingCartCheckoutIcon
                sx={
                  matches
                    ? { width: 28, height: 28 }
                    : { width: 36, height: 36 }
                }
              />
            </IconButton>
          </Link>
        </div>
        <IconButton
          id="account-menu"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            sx={matches ? { width: 36, height: 36 } : { width: 52, height: 52 }}
            className="avatar"
          />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link
            to="/history"
            className="link-menu"
            style={{ textDecoration: "none" }}
          >
            <MenuItem>
              <ListItemIcon>
                <BookIcon fontSize="small" />
              </ListItemIcon>
              My Library
            </MenuItem>
          </Link>
          <MenuItem onClick={logOut} className="link-menu">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navigation;
