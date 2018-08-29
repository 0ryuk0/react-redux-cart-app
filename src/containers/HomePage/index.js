import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProductList from '../../components/ProductList';
import styles from './styles.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let mainContent = null;
    return (
      <section className="section">
        <h2 className="page-title">All Items
          <span>
          <NavLink to='/cart'><button className="btn btn--primary align-right">
               Go To Cart
              <span className="fa fa-shopping-cart"></span>              
            </button></NavLink>
          </span>
        </h2>
        <ProductList products = {this.props.products || []} addToCartClicked = {this.props.addProductToCart}/>        
			  <div id="snackbar">Product added successfully!!</div>
		  </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: ((product) => {
      dispatch({type: 'ADD_TO_CART', payload: product})
    })
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
