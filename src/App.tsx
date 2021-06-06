import React, { useState, FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import MicrosoftLogin from 'react-microsoft-login';
import { Nav, Banner, Logout } from './components';

import type {
  dataProps,
  msalProps,
  voteSuccess,
} from './interfaces/interfaces';
import { CLINET_ID, EMAIL_ENDING, CLASSES } from './Constants';

import { VoteLoadingContext } from './context';

import './App.css';

const App: FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [canVote, setCanVote] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [msalInstance, onMsalInstanceChange] = useState<msalProps>();

  //context states
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<voteSuccess | undefined>();

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
    } else console.error(err);
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
        <VoteLoadingContext.Provider
          value={{ loading, success, setLoading, setSuccess }}
        >
          <Route exact path="/voted">
            {msalInstance ? (
              <Logout ClickHandler={logoutHandler} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/">
            <div className="App">
              {token ? (
                <Nav canVote={canVote} {...msalInstance} />
              ) : (
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
              {canVote ? (
                <div className="outer-container">
                  {!loading && success === undefined ? (
                    CLASSES.map((each, i) => (
                      <Banner
                        cls={each.cls}
                        name={each.name}
                        key={i}
                        image={each.image}
                        email={email}
                      />
                    ))
                  ) : loading ? (
                    <h1>Loading...</h1>
                  ) : success ? (
                    <div className="success-container">
                      <h1 id="success">Success!</h1>
                      <Logout ClickHandler={logoutHandler} />
                    </div>
                  ) : (
                    <h1>Error!</h1>
                  )}
                </div>
              ) : null}
            </div>
          </Route>
        </VoteLoadingContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;
