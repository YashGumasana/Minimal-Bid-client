import { USER_TYPE } from "../actions/user/userAction"

const initialState = {
    loading: false,
    products: [],
    past_bid: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_TYPE.LOADING:
            return {
                ...state,
                loading: action.payload.loading
            }
        case USER_TYPE.GET_PRODUCTS_DETAIL:
            return {
                ...state,
                products: action.payload.product_data
            }
        case USER_TYPE.GET_PAST_BIDS_DETAIL:
            return {
                ...state,
                past_bid: action.payload.past_bid_data
            }

        default:
            return state;
    }
}


export default userReducer;
