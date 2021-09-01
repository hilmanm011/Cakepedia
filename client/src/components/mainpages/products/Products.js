import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = id => {
    products.forEach(product => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      if (window.confirm('You are sure?')) {
        setLoading(true);
        const destroyImg = axios.post(
          '/api/destroy',
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteProduct = axios.delete(`/api/products/${id}`, {
          headers: { Authorization: token },
        });

        await destroyImg;
        await deleteProduct;
        setCallback(!callback);
        setLoading(false);

        toast.error('Deleted!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach(product => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach(product => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <Filters />

      {isAdmin && (
        <div className="delete-all">
          <div
            className="clearfix"
            style={{ padding: '.3rem', backgroundColor: '#022E57' }}
          >
            <span className="float-left text-white">Select all</span>
            <input type="checkbox" checked={isCheck} onChange={checkAll} />
            <Button className="float-right" color="danger" onClick={deleteAll}>
              Delete ALL
            </Button>
          </div>
        </div>
      )}

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

      <div className="products">
        {products.map(product => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>

      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
