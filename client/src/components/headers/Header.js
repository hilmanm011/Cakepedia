import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    if (window.confirm('Logout?')) {
      await axios.get('/user/logout');

      localStorage.removeItem('firstLogin');

      window.location.href = '/';
    }
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/create_product">
            Create New
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/category">
            Categories
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/history">
            Orders
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : '-100%',
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link
            style={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: '800',
            }}
            to="/"
          >
            {isAdmin ? 'Admin' : 'CAKEPEDIA'}
          </Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link style={{ textDecoration: 'none' }} to="/">
            {isAdmin ? 'List Product' : 'Home'}
          </Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link style={{ textDecoration: 'none' }} to="/login">
              Login ✥ Register
            </Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ''
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link style={{ textDecoration: 'none' }} to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
