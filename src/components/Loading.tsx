import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';

const Loading: FC = () => {
  return (
    <>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </>
  );
};

export default Loading;
