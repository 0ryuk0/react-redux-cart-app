const initialState = {
    totalOrderCalc: {
        cartTotal: 0,
        cartItemCount: 0,
        totalRawPrice: 0,
        totalDiscount: 0,
        typeDiscount: 0
    },
    cart: (JSON.parse(localStorage.getItem('cart'))) || []
}
const cartWithoutItem = (cart, item) => cart.filter(cartItem => cartItem.id !== item.id);
const itemInCart = (cart, item) => cart.filter(cartItem => cartItem.id === item.id)[0];

const saveCart = (updatedCart) => localStorage.setItem('cart', JSON.stringify(updatedCart));

const addToCart = (state, item) => {
    const cartItem = itemInCart(state.cart, item);
    const updatedCart = cartItem  === undefined 
            ? [ ...cartWithoutItem(state.cart, item), {...item, quantity: 1}]
            : [ ...cartWithoutItem(state.cart, item), {...cartItem, quantity: cartItem.quantity + 1}];
    saveCart(updatedCart);
    return {
        cart: updatedCart,
        totalOrderCalc: countCartTotal(updatedCart)
    }
}


const decreaseItem = (state, item) => {
    let updatedCart = [];
    if(item.quantity > 1){
        updatedCart = state.cart.map((cartItem) => {
            if(cartItem.id === item.id){
                cartItem.quantity-=1;
            };
            return cartItem;
        });
        saveCart(updatedCart);
        return {
            cart: updatedCart,
            totalOrderCalc: countCartTotal(updatedCart)
        };
    }else{
        return removeItem(state, item);
    }
    return{
        cart: updatedCart,
        totalOrderCalc: countCartTotal(updatedCart)
    }
}

const increaseItem = (state, item) => {
    const updatedCart = state.cart.map((cartItem) => {
        if(cartItem.id === item.id){
            cartItem.quantity+=1;
        };
        return cartItem;
    });
    saveCart(updatedCart);
    return{
        cart: updatedCart,
        totalOrderCalc: countCartTotal(updatedCart)
    }
}

const removeItem = (state, item) => {
    const updatedCart = [...cartWithoutItem(state.cart, item)];
    saveCart(updatedCart);
    return{
        cart: updatedCart,
        totalOrderCalc: countCartTotal(updatedCart)
    }
}

const countCartTotal = (cart) => {
    let totalSummary = {
        cartTotal: 0,
        cartItemCount: 0,
        totalRawPrice: 0,
        totalDiscount: 0,
        typeDiscount: 0
    }

    cart.forEach((cartItem) => {
        cartItem['updatedPrice'] = cartItem.price - (cartItem.discount*cartItem.price*0.01);
        totalSummary.cartItemCount += (cartItem.quantity? cartItem.quantity: 0);
        totalSummary.totalRawPrice += cartItem.price * (cartItem.quantity? cartItem.quantity: 1);
        totalSummary.typeDiscount += cartItem.type === 'fiction' ? 
                                        (cartItem.updatedPrice ? (cartItem.updatedPrice*0.15) : (cartItem.price*0.15)) * 
                                        (cartItem.quantity? cartItem.quantity : 1) :
                                        0;
        totalSummary.cartTotal += (cartItem.quantity * (cartItem.updatedPrice? cartItem.updatedPrice :cartItem.price)) - totalSummary.typeDiscount;                                        
        totalSummary.totalDiscount = totalSummary.totalRawPrice - totalSummary.cartTotal - totalSummary.typeDiscount;
    });

    return totalSummary;
};

export default function cart(state = initialState, action){
    switch(action.type){
        case 'FETCH_CART':
            return{
                cart: [...state.cart],
                totalOrderCalc: countCartTotal(state.cart)
            }
        case 'ADD_TO_CART':
            return addToCart(state, action.payload)
        case 'DECREASE_ITEM':
            return decreaseItem(state, action.payload);
        case 'INCREASE_ITEM':
            return increaseItem(state, action.payload);
        case 'REMOVE_FROM_CART':
            return removeItem(state,action.payload);
        default:
            return{
                cart: [...state.cart],
                totalOrderCalc: countCartTotal(state.cart)
            }
    }
};


