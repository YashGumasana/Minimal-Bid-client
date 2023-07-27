import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { genderStatus, userStatus } from '../common'
import { Button } from 'react-bootstrap';
import { register } from '../redux/actions/authAction';



const Signup = () => {
    const { alert } = useSelector(state => state)
    const navigate = useNavigate()


    const dispatch = useDispatch()

    const initialState = {
        userName: '', fullName: '', email: '',
        phoneNumber: '', password: '', confirmPassword: '', category: 0, gender: 0
    }

    const [userData, setUserData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleCfPassword = () => {
        setShowCfPassword(!showCfPassword);
    };

    const { userName, fullName, email, phoneNumber, password, confirmPassword, gender } = userData


    const handleChangeInput = e => {
        const { name, value } = e.target
        // categoryField.v
        console.log(name, value);
        if (name === 'gender') {
            const genderId = genderStatus[value]
            setUserData({ ...userData, gender: genderId })
        }
        else if (name === 'category') {
            const categoryId = userStatus[value]
            setUserData({ ...userData, category: categoryId })
        }
        else {
            setUserData({ ...userData, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(register(userData))
    }

    useEffect(() => {
        if (alert.success) {
            console.log('navigate to login');
            navigate('/');
        }
    }, [alert.success, navigate])

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">Username</label>
                            <input type="text" id="userName" name="userName"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                required onChange={handleChangeInput} value={userName} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
                            <input type="text" id="fullName" name="fullName"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                required onChange={handleChangeInput} value={fullName} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                required onChange={handleChangeInput} value={email} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                required onChange={handleChangeInput} value={phoneNumber} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" name="password"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                required onChange={handleChangeInput} value={password} />

                            <Button className='m-2' onClick={togglePassword}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
                            <input type={showCfPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                required onChange={handleChangeInput} value={confirmPassword} />
                            <Button className='m-2' onClick={toggleCfPassword}>
                                {showCfPassword ? 'Hide' : 'Show'}
                            </Button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Gender</label>
                            <div>
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio" name="gender" value="Male" checked={gender === 0} onChange={handleChangeInput} />
                                    <span className="ml-2">Male</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input type="radio" className="form-radio" name="gender" value="Female" onChange={handleChangeInput} />
                                    <span className="ml-2">Female</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category of User</label>
                            <select id="category" name="category"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                required value={Object.keys(userStatus).find(
                                    (key) => userStatus[key] === userData.category
                                )} onChange={handleChangeInput}>
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full website-gradient-bg text-white py-2 px-4 rounded-lg ">Sign
                            Up</button>
                        {/* <button type="submit" className="w-full m-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"><Link to="/">Login</Link></button> */}
                        <p className="my-5 text-center">
                            Already have an account? <Link to="/" className='website-seller-bg text-white py-2 px-4 rounded-lg'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup