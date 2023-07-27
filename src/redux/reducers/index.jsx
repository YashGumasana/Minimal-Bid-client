import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import user from './userReducer'
import seller from './sellerReducer'

export default combineReducers({
    auth,
    alert,
    user,
    seller
})