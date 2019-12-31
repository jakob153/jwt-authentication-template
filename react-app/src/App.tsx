import React, { FC, useEffect, useState, ComponentType } from 'react';
import { BrowserRouter, Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import qs from 'qs';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Container, CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import Dashboard from './Dashboard';
import Main from './Main';
import ResetPassword from './ResetPassword';
import ResetPasswordConfirm from './ResetPasswordConfirm';

import { UserContext } from './UserContext';

import { GET_CURRENT_USER_QUERY } from './GetCurrentUser.query';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: blue
  }
});

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
  credentials: 'include'
});

interface GetCurrentUserResponse {
  getCurrentUser: {
    user: {
      email: string;
    };
    loggedIn: boolean;
  };
}

interface PrivateRouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  exact: boolean;
  path: string;
  condition: boolean;
}

const App: FC = props => {
  const [user, setUser] = useState({ loggedIn: false, email: '' });
  const params = qs.parse(window.location.search.replace('?', ''));

  const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, condition, ...rest }) => (
    <Route
      {...rest}
      render={props => (condition ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );

  const getCurrentUser = async () => {
    try {
      const response = await client.query<GetCurrentUserResponse>({
        query: GET_CURRENT_USER_QUERY
      });
      if (!response.data.getCurrentUser.user) {
        return;
      }
      setUser({ email: response.data.getCurrentUser.user.email, loggedIn: true });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [props]);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <UserContext.Provider value={{ user, setUser }}>
            <Container>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/resetPassword" component={ResetPassword} />
                <PrivateRoute
                  exact
                  path="/dashboard"
                  condition={!!Object.entries(user).length}
                  component={Dashboard}
                />
                <PrivateRoute
                  exact
                  path="/resetPasswordConfirm"
                  condition={!!params?.emailToken}
                  component={ResetPasswordConfirm}
                />
                <Redirect to="/" />
              </Switch>
            </Container>
          </UserContext.Provider>
        </MuiThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
