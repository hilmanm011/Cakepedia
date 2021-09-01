import React from 'react';
import { Container } from 'reactstrap';

const Footer = () => {
  return (
    <Container>
      <p
        style={{ textAlign: 'center', marginTop: '100px' }}
        className="text-muted"
      >
        Created by Muhamad Hilman. © 2021
      </p>
    </Container>
  );
};

export default Footer;
