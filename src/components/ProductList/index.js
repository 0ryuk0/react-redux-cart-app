import React from 'react';
import styles from './styles.css';

function ProductList(props) {
  return (
    	<div className="products">
      {props.products.map((product, index) => {        
        return (<div className="product" key={`product ${index}`}>
        {(product.discount <= 0 
          || <div className="discount-ribbon">{product.discount}% off</div>
        )}
            <img className="product__image" src={product.img_url} alt={product.name} />
            <div className="product-info">
                <small className="product__name">{product.name}</small>
                {(product.discount ?
                    <p className="product__price"><s className="text-striked">{product.price}</s> ${product.price - (product.discount*product.price*0.01)}
                        <button className="btn btn--primary" data-action="ADD_TO_CART" onClick={() => props.addToCartClicked(product)}>Add To Cart</button>
                    </p>
                    : 
                    <p className="product__price">{product.price}
                        <button className="btn btn--primary" data-action="ADD_TO_CART" onClick={() => props.addToCartClicked(product)}>Add To Cart</button>
                    </p>
                  )}
            </div>
        </div>)
      })}
      </div>
  );
}

export default ProductList;
