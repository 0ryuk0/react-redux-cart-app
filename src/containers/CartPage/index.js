import React from 'react';
import { connect } from 'react-redux';
import Cart from '../../components/Cart';
import styles from './styles.css';

class CartPage extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <Cart cartItems = {this.props.cart || []}
        increaseQuantity = {this.props.increaseProductInCart}
        decreaseQuantity = {this.props.decreaseProductInCart}
        removeProduct = {this.props.removeProductFromCart} 
        totalOrderCalc = {this.props.totalOrderCalc}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeProductFromCart: ((product) => {
      dispatch({type: 'REMOVE_FROM_CART', payload: product})
    }),
    increaseProductInCart: ((product) => {
      dispatch({type: 'INCREASE_ITEM', payload: product})
    }),
    decreaseProductInCart: ((product) => {
      dispatch({type: 'DECREASE_ITEM', payload: product})
    })
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  totalOrderCalc: state.cart.totalOrderCalc
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
