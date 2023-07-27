import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/authAction'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { Button } from 'react-bootstrap'



const Login = () => {

    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const { auth, alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const nevigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
            }
        })
        if (auth.token) {
            nevigate('/')
        }
    }, [auth.token, nevigate, dispatch, alert.category])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    console.log('alert.category', alert.category);

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData, alert.category))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" id="email" name="email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            required onChange={handleChangeInput} value={email} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input type="password" id="password" name="password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            required onChange={handleChangeInput} value={password} />
                        <Button className='m-2' onClick={togglePassword}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </div>

                    <button type="submit" className="w-full website-seller-bg text-white py-2 px-4 rounded-lg ">Login</button>
                    {/* <button type="submit" className="w-full m-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"><Link to="/">Login</Link></button> */}
                    <p className="my-5 text-center">
                        Don't have an account? <Link to="/signup" className='website-gradient-bg text-white py-2 px-4 rounded-lg'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login