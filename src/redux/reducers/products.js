const initialState = {
    products: []
}

export default function products(state = initialState.products, action){
    switch(action.type){
        case 'FETCH_PRODUCTS':
            return action.products;
        default:
            return state;
    }
}