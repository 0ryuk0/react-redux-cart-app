import api from '../../mock-data/mockAPI';

const receiveProducts = products => ({
    type: 'FETCH_PRODUCTS',
    products
});

export const fetchAllProducts = () => dispatch => {
    api.fetchProducts(products => {
      dispatch(receiveProducts(products))
    })
}

export const addProductToCart = (product) => {
    console.log('actions add to cart', product);
    return { type: 'ADD_TO_CART', product }
}

export const fetchCart = () => {
    return { type: 'FETCH_CART', action: []}
}