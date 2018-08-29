import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

function Cart(props) {
  console.log('cart dumb', props);
  return (
    <section className="section">
				<h2 className="page-title">
					<span className="back-button">
            <NavLink to="/"><i className="fa fa-chevron-left"></i></NavLink>
          </span> 
          Order Summary
				</h2>
        <div className="cart-main">
          <div className="cart">
            {props.cartItems.map((product, index) => {
              return (<div className="cart__item" key={`cartItem_ ${index}`}>
                        <img className="cart__item__image" src={product.img_url} alt="" />
                        <h3 className="cart__item__name">{product.name}</h3>
                        {(product.discount
                            ?<h3 className="cart__item__price"><s className="text-striked">{product.price}</s> ${product.price - (product.discount*product.price*0.01)}</h3>
                            :<h3 className="cart__item__price">{product.price}</h3>
                        )}
                        <button data-action="DECREASE_ITEM" onClick= {() => props.decreaseQuantity(product)}>&minus;</button>
                        <h3 className="cart__item__quantity">{product.quantity}</h3>
                        <button data-action="INCREASE_ITEM" onClick= {props.increaseQuantity.bind(this, product)}>+ </button>
                        <button data-action="REMOVE_ITEM" onClick= {() => props.removeProduct(product)}>&times;</button>
                      </div> )
             }) } 
          </div>
          <div className="total">
            <div className="total-box sticky">
                <strong>Total</strong>
                <p>Items({props.totalOrderCalc.cartItemCount}):      <span>${props.totalOrderCalc.totalRawPrice}</span></p>
                <p>Discount       <span>: -${props.totalOrderCalc.totalDiscount}</span></p>
                <p>Type Discount  <span>: -${props.totalOrderCalc.typeDiscount}</span></p>
                <p>Order Total <span>: ${props.totalOrderCalc.cartTotal}</span></p>
            </div>
          </div>
			</div>			
		</section>
  );
}

export default Cart;
