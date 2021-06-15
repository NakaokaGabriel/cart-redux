import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../services/api';
import { IState } from '../../store';
import { addProductToCartRequest } from '../../store/modules/cart/actions';
import { IProduct } from '../../store/modules/cart/types';

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([]);
  const dispatch = useDispatch();

  const stockCheck = useSelector<IState, number[]>(state => state.cart.failedStockCheck);

  useEffect(() => {
    function getProducts() {
      api.get('/products').then((response) => {
        setCatalog(response.data);
      });
    }

    getProducts();
  }, []);

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCartRequest(product))
  }, [dispatch]);

  function validateStock(product: number): boolean {
    return stockCheck.includes(product);
  }

  return (
    <>
      <h1>Catalog</h1>

      {catalog.map(catalogItem => (
        <article key={catalogItem.id}>
          <strong>{catalogItem.title}</strong> {" - "}
          <span>{catalogItem.price}</span> {"  "}

          <button 
            type="button"
            onClick={() => handleAddProductToCart(catalogItem)}
          >
            Comprar
          </button>

          { validateStock(catalogItem.id) && <span style={{ color: 'red' }}>Falta de estoque</span> }
        </article>
      ))}
    </>
  )
}

export default Catalog;