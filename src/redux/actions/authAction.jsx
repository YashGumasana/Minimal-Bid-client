import { userStatus } from "../../common";
import { postDataAPI, refreshDataAPI } from "../../utils/fetchData";
import { valid } from "../../utils/valid";
import { GLOBALTYPES } from "./globalTypes";

export const register = (userData) => async (dispatch) => {

    const check = valid(userData)

    if (check?.errLength > 0) {
        return dispatch({
            type: GLOBALTYPES.ALERT, payload: {
                error: check.errMsg
            }
        })
    }

    const { confirmPassword, ...userDataWithoutConfirmPassword } = userData;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const user = Object.keys(userStatus).find(
            (key) => userStatus[key] === userDataWithoutConfirmPassword.category
        )
        const res = await refreshDataAPI(`auth/signup`, userDataWithoutConfirmPassword)
        console.log('register res', res);



        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message,
                category: user
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

export const login = (userData, category) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const res = await refreshDataAPI(`auth/login`, userData)

        console.log('login res', res);

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.data.token,
                user: res.data.data.response,
            }
        })
        localStorage.setItem("firstLogin", true)
        // localStorage.setItem("user", JSON.stringify(res.data.data.response))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.message
            }
        })
    }
    catch (err) {
        console.log("err", err);
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")

    if (firstLogin) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        try {

            const res = await refreshDataAPI('auth/refresh_token')


            console.log("res", res);

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.data.token,
                    user: res.data.data.user
                }
            })
            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        // localStorage.removeItem('user')
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}