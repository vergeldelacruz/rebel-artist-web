import React from "react";
import Box from "@mui/material/Box";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CssBaseline from "@mui/material/CssBaseline";

export default function Layout(props) {
  const { window, children } = props;
  const drawerWidth = 200;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CssBaseline />
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      ></Header>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Sidebar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          container={container}
        ></Sidebar>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 6,
          width: { sm: `calc(90% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
