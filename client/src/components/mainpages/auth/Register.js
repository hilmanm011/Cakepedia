import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CardImg,
  Container,
} from 'reactstrap';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/user/register', { ...user });

      localStorage.setItem('firstLogin', true);

      window.location.href = '/';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <Container>
        <br />
        <Row>
          <Col md={6}>
            <CardImg
              style={{ margin: '5px' }}
              width="100%"
              src="https://thumbs.dreamstime.com/b/advertisement-e-commerce-food-blogger-restaurant-meal-concept-blog-105170875.jpg"
            />
          </Col>
          <Col md={6} className="login-page">
            <h3 style={{ textAlign: 'center', fontWeight: '600' }}>
              CREATE ACCOUNT
            </h3>

            <hr />

            <Form onSubmit={registerSubmit}>
              <FormGroup>
                <Label style={{ fontWeight: '600' }} for="Name">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={user.name}
                  onChange={onChangeInput}
                />

                <Label style={{ fontWeight: '600' }} for="Email">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  value={user.email}
                  onChange={onChangeInput}
                />

                <Label style={{ fontWeight: '600' }} for="Password">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  required
                  autoComplete="on"
                  placeholder="Your password"
                  value={user.password}
                  onChange={onChangeInput}
                />
              </FormGroup>
              <FormGroup style={{ marginTop: '5px' }}>
                <Button className="btn-submit">Register</Button>
              </FormGroup>
            </Form>
            <div className="row">
              <p style={{ fontWeight: '600' }}>
                Already have an account?{' '}
                <Link style={{ textDecoration: 'none' }} to="/login">
                  Login
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
