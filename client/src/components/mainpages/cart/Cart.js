import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
// import PaypalButton from './PaypalButton'
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async cart => {
    await axios.patch(
      '/user/addcart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = id => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = id => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = id => {
    if (window.confirm('Do you want to delete this product?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart Empty</h2>
    );

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      {cart.map(product => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />

          <div className="box-detail">
            <h2>{product.title}</h2>

            <h3>Rp. {product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <Button
                outline
                color="danger"
                onClick={() => decrement(product._id)}
              >
                {' '}
                -{' '}
              </Button>
              <span style={{ fontWeight: '700' }}>{product.quantity}</span>
              <Button
                outline
                color="info"
                onClick={() => increment(product._id)}
              >
                {' '}
                +{' '}
              </Button>
            </div>

            <Button
              color="danger"
              className="delete"
              onClick={() => removeProduct(product._id)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>
          Total: <span> Rp. {total} </span>
        </h3>
        <Button
          href="https://wa.me/6289671338220?text=Nama%3A%0ANo.%20HP%3A%0AAlamat%3A%0APesanan%3A%0AJumlah%3A"
          color="primary"
          target="_blank"
        >
          Order now
        </Button>
      </div>
    </div>
  );
}

export default Cart;
