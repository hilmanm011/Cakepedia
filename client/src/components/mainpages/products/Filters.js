import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Row, Col, Button } from 'reactstrap';

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = e => {
    setCategory(e.target.value);
    setSearch('');
  };

  return (
    <div>
      <div
        className="clearfix"
        style={{ padding: '.3rem', backgroundColor: '#022E57' }}
      >
        <Row style={{ margin: '10px', textAlign: 'center' }}>
          <Col xs="3">
            <div>
              <div>
                <span style={{ color: 'white', fontWeight: '500' }}>
                  Filters:{' '}
                </span>
                <select
                  name="category"
                  value={category}
                  onChange={handleCategory}
                >
                  <option value="">All Product</option>
                  {categories.map(category => (
                    <option
                      value={'category=' + category._id}
                      key={category._id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Col>
          <Col md="auto">
            <input
              style={{
                marginLeft: '20px',
                marginRight: '20px',
                fontSize: '12pt',
              }}
              type="text"
              value={search}
              placeholder="Enter your search..."
              onChange={e => setSearch(e.target.value.toLowerCase())}
            />
          </Col>
          <Col xs="3">
            <div>
              <span style={{ color: 'white', fontWeight: '500' }}>
                Sort By:{' '}
              </span>
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="">New</option>
                <option value="sort=oldest">Oldest</option>
                <option value="sort=-sold">Best sales</option>
                <option value="sort=-price">Price: Hight-Low</option>
                <option value="sort=price">Price: Low-Hight</option>
              </select>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Filters;
