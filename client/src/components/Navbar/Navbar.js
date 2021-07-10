import React, { useState, useEffect,useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import decode from "jwt-decode";
import souvenirsLogo from "../../images/souvenirsLogo.png";
import souvenirsText from "../../images/souvenirsText.png";
import { LOGOUT } from "../../constants/authContants";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  },[dispatch,history])

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to='/' className={classes.brandContainer}>
      <img
          className={classes.image}
          src={souvenirsText}
          alt="icon"
          height="100"
        />
        <img
          className={classes.image}
          src={souvenirsLogo}
          alt="souvenirs"
          height="80"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
