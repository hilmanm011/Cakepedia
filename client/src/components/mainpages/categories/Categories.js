import React, { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
// import './categories.css'
import { Button, Form, Col, Table, Input, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');

  const createCategory = async e => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success('Updated!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        const res = await axios.post(
          '/api/category',
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        toast.success('Created!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      setOnEdit(false);
      setCategory('');
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async id => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      if (window.confirm('Are you sure?')) {
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
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

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

      <h3 style={{ textAlign: 'center' }}>Categories</h3>
      <Row>
        <Col md={4} style={{ margin: '10px' }}>
          <Form onSubmit={createCategory}>
            <Input
              type="text"
              name="category"
              value={category}
              required
              onChange={e => setCategory(e.target.value)}
            />

            <Button style={{ margin: '5px' }} color="primary" type="submit">
              {onEdit ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <Table style={{ margin: '10px' }}>
            <thead style={{ textAlign: 'center' }}>
              <hr />

              {categories.map(category => (
                <tr
                  style={{ fontWeight: '600', marginLeft: '30px' }}
                  className="row"
                  key={category._id}
                >
                  {category.name}
                  <td>
                    <Button
                      size="sm"
                      color="warning"
                      onClick={() => editCategory(category._id, category.name)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      style={{ marginLeft: '5px' }}
                      color="danger"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </thead>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Categories;
