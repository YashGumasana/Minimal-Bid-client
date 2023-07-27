import { SELLER_TYPE } from "../actions/seller/sellerAction"

const initialState = {
    loading: false,
    created_products: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELLER_TYPE.LOADING:
            return {
                ...state,
                loading: action.payload.loading
            }
        case SELLER_TYPE.GET_CREATED_PRODUCTS_DETAIL:
            return {
                ...state,
                created_products: action.payload.created_product_data
            }

        default:
            return state;
    }
}


export default userReducer;
