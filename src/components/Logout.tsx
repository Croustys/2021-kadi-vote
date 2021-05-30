import React from 'react';
import Button from 'react-bootstrap/Button';

interface ToggleProps {
  ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function Logout(Props: ToggleProps): React.ReactElement {
  return (
    <Button className="logout-btn" variant="warning" onClick={Props.ClickHandler}>
      Logout
    </Button>
  );
}
