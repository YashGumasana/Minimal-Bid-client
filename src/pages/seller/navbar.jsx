import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';


const Navbar = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <nav className="website-seller-bg p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-bold text-lg">My Website</Link>

                    <div className="space-x-4 flex items-center">
                        <Link to="/" className="text-white hover:text-blue-200">Home</Link>
                        <Link to="/create" className="text-white hover:text-blue-200">Create</Link>
                        <Link to="/" onClick={() => dispatch(logout())}><button className="text-blue-500 rounded-md bg-white py-2 px-4">Sign Out</button></Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
