import { userStatus } from "../../../common";
import { getDataAPI, postDataAPI } from "../../../utils/fetchData";
import { imageUpload } from "../../../utils/imageUpload";
import { validProduct } from "../../../utils/valid";
import { GLOBALTYPES } from "../globalTypes";


export const SELLER_TYPE = {
    LOADING: 'LOADING_CONSTURCTOR_TYPE',
    PRODUCT: 'PRODUCT',
    GET_CREATED_PRODUCTS_DETAIL: 'GET_CREATED_PRODUCTS_DETAIL',

}


export const uploadproduct = ({ productData, productImage, auth }) => async (dispatch) => {

    const check = validProduct(productData)
    let media;

    if (!productImage) {
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {
                error: 'upload product Image'
            }
        })
    }

    if (check?.errLength > 0) {
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {
                error: check.errMsg
            }
        })
    }



    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (productImage) {
            media = await imageUpload([productImage]);
        }

        console.log(media[0].url);
        productData.productImage = media[0].url

        // const user = Object.keys(userStatus).find(
        //     (key) => userStatus[key] === productData.category
        // )
        const res = await postDataAPI(`seller/uploadProduct`, productData, auth.token)
        // console.log('register res', res);


        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
                // category: user
            }
        })

    } catch (err) {
        console.log("err", err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.message
            }
        })
    }
}


export const getCreatedProducts = (token) => async (dispatch) => {
    try {
        dispatch({ type: SELLER_TYPE.LOADING, payload: { loading: true } })

        const res = await getDataAPI('seller/getCreatedProducts', token)


        console.log("getCreatedProducts res", res);

        dispatch({
            type: SELLER_TYPE.GET_CREATED_PRODUCTS_DETAIL,
            payload: {
                created_product_data: res.data.data.created_product_data
            }
        })

        dispatch({ type: SELLER_TYPE.LOADING, payload: { loading: false } })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }
}