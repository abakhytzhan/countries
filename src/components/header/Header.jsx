import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PublicIcon from "@mui/icons-material/Public";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CountrySelect from "../countrySelect/CountrySelect";
import { incrementByAmount } from "../flagCards/flagCardsSlice";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { ColorModeContext } from "../../App";

const pages = ["Flags", "Coat Of Arms", "Quiz", "Drag&Drop"];

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const count = useSelector((state) => state.flag.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageUrl = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pageHandler = (page) => {
    if (
      (page === "Flags" && pageUrl === "flags") ||
      (page === "Flags" && pageUrl === "") ||
      (page === "Coat Of Arms" && pageUrl === "coatofarms")
    ) {
      return;
    }
    if (page === "Flags") {
      dispatch(incrementByAmount(-count + 12));
      navigate("/flags");
    } else if (page === "Coat Of Arms") {
      dispatch(incrementByAmount(-count + 12));
      navigate("/coatofarms");
    } else if (page === "Quiz") {
      navigate("/quiz");
    } else if (page === "Drag&Drop") {
      navigate("/draganddrop");
    }
  };

  return (
    <AppBar position="sticky" sx={{ marginBottom: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PublicIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COUNTRIES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    pageHandler(page);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PublicIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COUNTRIES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  pageHandler(page);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton
            sx={{ mr: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
          <CountrySelect showMode={{ xs: "none", sm: "flex" }} />
        </Toolbar>
      </Container>
      <CountrySelect
        showMode={{ xs: "flex", sm: "none" }}
        inputWidth={"100%"}
      />
    </AppBar>
  );
};
export default Header;
