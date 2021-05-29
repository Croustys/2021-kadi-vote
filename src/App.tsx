import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import MicrosoftLogin from 'react-microsoft-login';
import './App.css';
//components
import { Nav, Banner, Logout } from './components';
//types
import type { AppProps, dataProps, msalProps } from './interfaces';
import { CLINET_ID, EMAIL_ENDING, CLASSES } from './Constants';

function App({}: AppProps) {
  const [token, setToken] = useState<string | null>(null);
  const [canVote, setCanVote] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [msalInstance, onMsalInstanceChange] = useState<msalProps>();

  function authHandler(
    err: unknown,
    data: dataProps,
    instance: msalProps,
  ): void {
    if (!err && data) {
      setToken(data.uniqueId);
      onMsalInstanceChange(instance);
      const {
        account: { userName },
      } = data;

      setCanVote(checkValidity(userName));
      setEmail(userName);
    } else console.log(err);
  }
  function checkValidity(em: string): boolean {
    return em.endsWith(EMAIL_ENDING);
  }
  function logoutHandler(): void {
    // @ts-expect-error: couldn't find logout function in the object
    msalInstance.logout();
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/voted">
          {msalInstance ? (
            <Logout ClickHandler={logoutHandler} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/">
          <div className="App">
            {token ? <Nav canVote={canVote} {...msalInstance} /> : (
              <div id="landing">
                <h1>Kérlek lépj be az iskolai email címeddel!</h1>
                <MicrosoftLogin
                  buttonTheme="dark"
                  clientId={CLINET_ID}
                  // @ts-expect-error: https://www.npmjs.com/package/react-microsoft-login code example no TS support
                  authCallback={authHandler}
                />
              </div>
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
      </Switch>
    </Router>
  );
}

export default App;
