import { getDataAPI, postDataAPI } from "../../../utils/fetchData"
import { GLOBALTYPES } from "../globalTypes"

export const USER_TYPE = {
    LOADING: 'LOADING_LABOUR_TYPE',
    GET_PRODUCTS_DETAIL: 'GET_PRODUCTS_DETAIL',
    GET_PAST_BIDS_DETAIL: 'GET_PAST_BIDS_DETAIL'


}

export const getProductList = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_TYPE.LOADING, payload: { loading: true } })


        const res = await getDataAPI('user/getProductList', token)
        console.log('res getProductList', res);


        dispatch({
            type: USER_TYPE.GET_PRODUCTS_DETAIL,
            payload: {
                product_data: res.data.data.product_data,
            }
        })

        dispatch({ type: USER_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const postBidPrice = ({ productId, bidPrices, auth }) => async (dispatch) => {
    try {
        dispatch({ type: USER_TYPE.LOADING, payload: { loading: true } })


        const bidPrice = bidPrices[productId];
        console.log('productId, bidPrice,', productId, bidPrice);

        const res = await postDataAPI('user/postBidPrice', { productId, bidPrice }, auth.token)

        console.log('postBidPrice res :>> ', res);

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
            }
        })

        dispatch({ type: USER_TYPE.LOADING, payload: { loading: false } })
    }
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}

export const getPastBid = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI('user/getPastBid', token)


        console.log("getPastBid res", res);

        dispatch({
            type: USER_TYPE.GET_PAST_BIDS_DETAIL,
            payload: {
                past_bid_data: res.data.data.past_bid_data
            }
        })

        dispatch({ type: USER_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}
