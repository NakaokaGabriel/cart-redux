import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '../../services/api';
import { addProductToCart } from '../../store/modules/cart/actions';
import { IProduct } from '../../store/modules/cart/types';

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    function getProducts() {
      api.get('/products').then((response) => {
        setCatalog(response.data);
      });
    }

    getProducts();
  }, []);

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCart(product))
  }, [dispatch]);

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
        </article>
      ))}
    </>
  )
}

export default Catalog;