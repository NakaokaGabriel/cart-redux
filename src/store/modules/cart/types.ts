export enum ActionTypes  {
  addProductToCartRequest = 'PRODUCT/ADD_TO_CART_REQUEST',
  addProductToCartSuccess = 'PRODUCT/ADD_TO_CART_SUCCESS',
  addProductToCartFailure = 'PRODUCT/ADD_TO_CART_FAILURE',
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
  failedStockCheck: number[];
}