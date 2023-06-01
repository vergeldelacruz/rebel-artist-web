import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { AppProvider } from "./components/context/AppProvider";
import { config } from "./config";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";

import CreateEditArtist from "./components/home/CreateEditArtist";

// const errorLink = onError(({ graphqlErrors, networkError }) => {
//   if (graphqlErrors) {
//     graphqlErrors.map(({ message, location, path }) => {
//       alert(`Graphql error ${message}`);
//       return `Graphql error ${message}`;
//     });
//   }
// });

const httpLink = new HttpLink({
  //uri: config.httpLinkUrl,
  uri:"https://rebel-artist-api.azurewebsites.net/graphql"
});

// const wsLink = new WebSocketLink({
//   uri: config.wsLinkUrl,
//   options: {
//     reconnect: true,
//   },
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //link: splitLink,
  link: httpLink,
});

const theme = createTheme({
  palette: {
    // mode: 'light',
    primary: {
      main: "#1D4ED8",
    },
    secondary: {
      main: '#9c27b0',
    },
    // background: {
    //   paper: '#111827',
    // },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          textTransform: "none",
          minHeight: "45px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          "& span": {
            fontSize: ".9rem",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgba(0,0,0,.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <Router>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/artists" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/updateArtist/:artistId" element={<CreateEditArtist />} />
                  <Route path="/createArtist" element={<CreateEditArtist />} />
                  <Route path="/error" element={<ErrorPage />} />
                </Routes>
              </Layout>
            </ThemeProvider>
          </StyledEngineProvider>
        </Router>
      </ApolloProvider>
    </AppProvider>
  );
}

export default App;
