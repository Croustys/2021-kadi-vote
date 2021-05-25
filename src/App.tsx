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

  function authHandler(err: unknown, data: dataProps, msal: msalProps): void {
    if (!err && data) {
      onMsalInstanceChange(msal);
      setUserData(data);
      setToken(data.uniqueId);
      console.log(msal);
      console.log(data);
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

  return (
    <Router>
      <Switch>
        <Route path="/">
          <div className="App">
            {token && <Nav canVote={canVote} />}
            {!token && (
              <MicrosoftLogin clientId={CLINET_ID} authCallback={authHandler} />
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
         <Route path="/voted">
           <Logout msalInstance={msalInstance}/>
         </Route>
      </Switch>
    </Router>
  );
}

export default App;
