/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { setDarkTheme } from "redux/reducer";
import { setLightTheme } from "redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "context";
import { Alert, Fade, Snackbar, Tooltip } from "@mui/material";
import Loader from "common/loaders/Loader";
import MDSnackbar from "components/MDSnackbar";
import { setNotification } from "redux/reducer";
import { set_accessToken } from "redux/action";
import { getUserDataFromStorage } from "lib/Utils";
import MDAlert from "components/MDAlert";
import MDTypography from "components/MDTypography";

export default function App() {

  const use_dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(store => store.common.loading);
  const notification_msg = useSelector(store => store.common.notification_msg);
  const notification_color = useSelector(store => store.common.notification_color);
  const notification_status = useSelector(store => store.common.notification_status);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (getUserDataFromStorage('loginData')) {
      use_dispatch(set_accessToken(getUserDataFromStorage('loginData').access))
    }
  }, [])


  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {

    setMiniSidenav(dispatch, true);
    // setDarkMode(dispatch, true);
  }, [])


  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    darkMode ? use_dispatch(setDarkTheme()) : use_dispatch(setLightTheme());
  }, [darkMode])

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {

      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={{ ...route.component, navigate }} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const chatButton = (
    <Tooltip title="Chat Bot" placement="top" >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.25rem"
        height="3.25rem"
        bgColor="linear-gradient(195deg, #49a3f1, #1A73E8)"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="6.2rem"
        zIndex={99}
        color="white"
        sx={{ cursor: "pointer" }}
      >
        <Icon fontSize="small" color="inherit">
          chat
        </Icon>
      </MDBox>
    </Tooltip>
  );


  return <ThemeProvider theme={darkMode ? themeDark : theme} >
    <CssBaseline />
    <Loader open={loading} />

    {notification_status && <div style={{ zIndex: 2000, minWidth: "20%", maxWidth: "50%", position: "absolute", right: 7, top: 7 }}>
      <Alert variant="filled" severity={notification_color} style={{ color: "#fff" }} >
        {notification_msg}
      </Alert>
    </div>}

    {/* <MDSnackbar
      color={notification_color ?? "light"}
      icon="notifications"
      title={notification_color && notification_color.toUpperCase()}
      content={notification_msg}
      open={notification_status}
      onClose={() => { console.log("i am calling") }}
      close={!notification_status}
    /> */}

    {layout === "dashboard" && (
      <>
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="EDI BOTS"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <Configurator />
        {configsButton}
        {chatButton}
      </>
    )}
    {layout === "vr" && <Configurator />}
    <Routes>
      {getRoutes(routes)}
      <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
    </Routes>
  </ThemeProvider>
}
