import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MicrosoftLogin from 'react-microsoft-login';
import './App.css';
//components
import { Nav, Banner, Logout } from './components';

import type { AppProps, dataProps, msalProps } from './interfaces';
import { CLINET_ID, EMAIL_ENDING, CLASSES } from './Constants';

function App({}: AppProps) {
  const [userData, setUserData] = useState<dataProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [canVote, setCanVote] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [msalInstance, onMsalInstanceChange] = useState<msalProps>();

  function authHandler(
    err: unknown,
    data: dataProps,
    instance: msalProps,
  ): void {
    if (!err && data) {
      setUserData(data);
      setToken(data.uniqueId);
      onMsalInstanceChange(instance);
      const {
        account: { userName },
      } = data;

      setCanVote(checkValidity(userName));
      setEmail(userName);
      console.log(instance);
    } else console.log(err);
  }
  function checkValidity(em: string): boolean {
    return em.endsWith(EMAIL_ENDING);
  }
  function logoutHandler(): void {
    const logoutRequest = {
      account: instance.getAccountByHomeId(homeAccountId),
      mainWindowRedirectUri: 'your_app_main_window_redirect_uri',
      postLogoutRedirectUri: 'your_app_logout_redirect_uri',
    };
    msalInstance?.logoutPopup(logoutRequest);
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            {token && <Nav canVote={canVote} />}
            {!token && (
              <MicrosoftLogin
                buttonTheme="dark"
                clientId={CLINET_ID}
                authCallback={authHandler}
              />
            )}
            <div className="outer-container">
              {canVote
                ? CLASSES.map((each, i) => (
                    <Banner
                      cls={each.cls}
                      name={each.name}
                      key={i}
                      image={each.image}
                      email={email}
                    />
                  ))
                : null}
            </div>
          </div>
        </Route>
        <Route exact path="/voted">
          <Logout {...logoutHandler} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
