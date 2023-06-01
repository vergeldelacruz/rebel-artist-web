import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from "@mui/material/Divider";
import AlbumIcon from "@mui/icons-material/Album";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar(props) {
  const { drawerWidth, handleDrawerToggle, mobileOpen, container } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const mainMenuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: "Artists",
      icon: <AlbumIcon />,
      path: "/artists",
    },
  ];
  const accountMenuItems = [
    {
      text: "My Profile",
      icon: <PersonIcon />,
      path: "/profile",
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      path: "/logout",
    },
  ];
  const drawer = (
    <div>
      <Typography color="white" variant="h5" align="center" margin={2}>
        Artist
      </Typography>
      <Divider color="gray" />
      <Box padding={2}>
        <Button variant="contained" fullWidth size="large" onClick={()=> navigate("createArtist")}>
          Create New +{" "}
        </Button>
        <Typography
          color="gray"
          variant="h3"
          sx={{ fontSize: ".75rem", mt: 2 }}
        >
          MAIN
        </Typography>
        <List>
          {mainMenuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: location.pathname === item.path ? "white" : "",
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? "black" : "gray",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: location.pathname === item.path ? "black" : "white",
                  }}
                  primary={item.text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography
          color="gray"
          variant="h3"
          sx={{ fontSize: ".75rem", mt: 2 }}
        >
          ACCOUNT
        </Typography>
        <List>
          {accountMenuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: location.pathname === item.path ? "white" : "",
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? "black" : "gray",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: location.pathname === item.path ? "black" : "white",
                  }}
                  primary={item.text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#111827",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#111827",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
