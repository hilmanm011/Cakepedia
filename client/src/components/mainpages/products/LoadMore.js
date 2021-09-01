import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { GlobalState } from '../../../GlobalState';
import './products.css';

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;

  return (
    <div className="load_more">
      {result < page * 9 ? (
        ''
      ) : (
        <Button
          outline
          color="secondary"
          style={{ fontWeight: '500' }}
          onClick={() => setPage(page + 1)}
        >
          Load more..
        </Button>
      )}
    </div>
  );
}

export default LoadMore;
