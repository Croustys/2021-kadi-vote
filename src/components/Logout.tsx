import React from 'react';
import type { msalProps } from '../interfaces/';

export default function Logout(msalInstance: msalProps): React.ReactElement {
  function logoutHandler() {
    msalInstance?.logout();
  }
  return <button onClick={logoutHandler}>Logout</button>;
}
