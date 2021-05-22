import React, { useState } from 'react';
import MicrosoftLogin from 'react-microsoft-login';
import './App.css';


//components
import { Nav, Banner } from './components';

import type { AppProps, dataProps } from './interfaces';
import { CLINET_ID, EMAIL_ENDING, CLASSES } from './Constants';

function App({}: AppProps) {
  const [userData, setUserData] = useState<dataProps | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [canVote, setCanVote] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  function authHandler(err: unknown, data: dataProps): void {
    //console.log(err); //DEV
    if (err === null) {
      setUserData(data);
      setToken(data.uniqueId);
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
  );
}

export default App;
