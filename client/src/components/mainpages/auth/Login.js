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
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/user/login', { ...user });

      localStorage.setItem('firstLogin', true);

      window.location.href = '/';
      // toast.success('Logiin..!', {
      //   position: 'top-center',
      //   autoClose: 3000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      // });
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
              src="https://thumbs.dreamstime.com/b/online-shopping-concept-computer-keyboard-shopping-cart-cake-tea-copy-space-online-shopping-concept-computer-keyboard-158415632.jpg"
            />
          </Col>
          <Col md={6} className="login-page">
            <h3 style={{ textAlign: 'center', fontWeight: '600' }}>LOGIN</h3>

            <hr />

            <Form onSubmit={loginSubmit}>
              <FormGroup>
                <Label style={{ fontWeight: '600' }} for="Email">
                  Email
                </Label>
                <Input
                  type="email"
                  onChange={onChangeInput}
                  name="email"
                  id="Email"
                  placeholder="Input email"
                  value={user.email}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ fontWeight: '600' }} for="Password">
                  Password
                </Label>
                <Input
                  type="password"
                  onChange={onChangeInput}
                  name="password"
                  id="Password"
                  placeholder="Input Password"
                  value={user.password}
                  required
                />
              </FormGroup>
              <FormGroup style={{ marginTop: '5px' }}>
                <Button className="btn-submit">Login</Button>
              </FormGroup>
            </Form>
            <p style={{ fontWeight: '600' }}>
              Don't have an account?{' '}
              <Link style={{ textDecoration: 'none' }} to="/register">
                Register
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Login;
