import React, { FC, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styles/components.css';

import { postVote } from '../API/index.js';
import { Redirect } from 'react-router-dom';

import { VoteLoadingContext } from '../context';

interface bannerProps {
  name: string;
  cls: string;
  image: string;
  email: string;
}

const Banner: FC<bannerProps> = ({ name, cls, image, email }) => {
  const { setLoading, setSuccess } = useContext(VoteLoadingContext);
  async function handleClick() {
    setLoading(true);
    const success = await postVote(name, email);
    
    setSuccess(success);
    setLoading(false);
  }
  return (
    <div className="container">
      <img src={`./images/${image}`} />
      <Card style={{ width: '18rem' }}>
        <div className="data">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{cls}</Card.Text>
            <Button variant="primary" className="vote" onClick={handleClick}>
              Vote
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
export default Banner;
