import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList, postBidPrice } from '../../redux/actions/user/userAction'
import Loading from '../../components/loading/loading'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'


const Homepage = () => {

    const { auth, user } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductList(auth.token))
    }, [dispatch, auth.token])


    const [bidPrices, setBidPrices] = useState({});


    const handleChangeInput = (e, productId) => {
        const { name, value } = e.target;
        console.log('productId, name, value', productId, name, value);
        setBidPrices(prevBidPrices => ({ ...prevBidPrices, [productId]: value }));
    };

    const handleSubmit = async (productId) => {
        await dispatch(postBidPrice({ productId, bidPrices, auth }))
        dispatch(getProductList(auth.token))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    }

    return (
        <>

            {
                user?.loading ? (<Loading className='alert-container loading' />
                )
                    :
                    (

                        <div className="container mx-auto p-4">
                            {
                                user?.products.map(data => (
                                    <div className="bg-white rounded-lg shadow-lg p-6 m-4" key={data._id}>
                                        <div className="flex flex-col md:flex-row items-center">
                                            <div className="md:w-1/3 mb-4 md:mb-0">
                                                <img src={data.productImage} alt="product" className="w-full rounded-lg shadow-lg" />
                                            </div>

                                            <div className="md:w-2/3 md:pl-6">
                                                <h2 className="text-gray-600 font-bold mb-2">Product Name : {data.productName}</h2>
                                                <p className="text-gray-600 font-bold mb-2">Product Description : {data.productDescription}</p>
                                                <p className="text-gray-600 font-bold mb-2">Category: {data.productCategory}</p>
                                                <p className="text-gray-600 font-bold mb-2">Price: ${data.productPrice}</p>

                                                <form key={data._id} onSubmit={() => handleSubmit(data._id)} className="flex-col items-center">
                                                    <div className="md:mr-4 mb-4 md:mb-0 flex">
                                                        <label htmlFor={`bidAmount_${data._id}`} className="block text-gray-700 font-bold mb-2">Your Bid Amount:</label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            id={`bidAmount_${data._id}`}
                                                            name="bidAmount"
                                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                                            required
                                                            onChange={(e) => handleChangeInput(e, data._id)} // Pass the productId to the handleChangeInput
                                                            value={bidPrices[data._id] || ''} // Use bidPrices[data._id] as the value
                                                        />
                                                    </div>
                                                    <button type="submit" className="w-full md:w-auto website-gradient-bg text-white py-2 px-4 rounded-lg ">Place Bid</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>))

                            }
                        </div>
                    )
            }
        </>
    )
}

export default Homepage