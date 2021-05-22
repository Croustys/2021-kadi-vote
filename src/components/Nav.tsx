import React, { FC } from 'react';
import { Navbar } from 'react-bootstrap';

type navProps = { canVote: boolean };

const Nav: FC<navProps> = ({ canVote }) => {
  return (
    <Navbar bg="light">
      <Navbar.Brand>{canVote ? 'Szavazhat' : 'nem szavazhat'}</Navbar.Brand>
    </Navbar>
  );
};

export default Nav;
