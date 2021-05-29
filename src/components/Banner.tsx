import React, { FC, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styles/components.css';

import { postVote } from '../API/index.js';
import { Redirect } from 'react-router-dom';
import { Loading } from '.';

interface bannerProps {
  name: string;
  cls: string;
  image: string;
  email: string;
}

const Banner: FC<bannerProps> = ({ name, cls, image, email }) => {
  const [loading, setLoading] = useState<boolean>(false);
  async function handleClick() {
    setLoading(!loading);
    const success = await postVote(name, email);
    if (success) setLoading(!loading);
  }
  return loading ? (
    <Redirect to="/voted" />
  ) : (
    <div className="container">
      <img src={`./images/${image}`} />
      <Card style={{ width: '18rem' }}>
        <div className="data">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{cls}</Card.Text>
            {!loading ? (
              <Button variant="primary" className="vote" onClick={handleClick}>
                Vote
              </Button>
            ) : (
              <p>Loading...</p>
            )}
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
export default Banner;
