import React, { FC } from 'react';
import { Navbar } from 'react-bootstrap';
import type { AccountProps } from 'src/interfaces/interfaces';

interface navProps {
  canVote: boolean;
  account?: AccountProps | undefined;
}

const Nav: FC<navProps> = ({ canVote, account }) => {
  return (
    <Navbar className="hght" bg="dark" variant="dark">
      <h2>
        {canVote
          ? account?.name
          : 'Sajnos nem Boronkays email címmel jelentkeztél be, így nem vagy jogosult a szavazásra!'}
      </h2>
    </Navbar>
  );
};

export default Nav;
