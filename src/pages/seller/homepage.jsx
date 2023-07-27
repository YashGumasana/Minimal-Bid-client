import React, { useEffect } from 'react'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useDispatch, useSelector } from 'react-redux'
import { getCreatedProducts } from '../../redux/actions/seller/sellerAction'
import Loading from '../../components/loading/loading'



const Homepage = () => {
    const { auth, seller } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCreatedProducts(auth.token))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    }, [dispatch, auth.token])

    console.log('seller', seller)

    return (
        <>
            {
                seller?.loading ? (<Loading className='alert-container loading' />

                )
                    :
                    (
                        <div className="container mx-auto p-4 flex flex-col justify-center items-center">
                            <h2 className="text-2xl font-bold  text-[#e139fd]">Your Products</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 ">
                                {
                                    seller?.created_products.map(data => (
                                        <>
                                            <div className="bg-white rounded-lg shadow-lg p-6">
                                                <img src={data.productImage} alt="Product" className="w-full rounded-lg mb-4" />
                                                <h2 className="text-gray-600 font-bold mb-2">Product Name : {data.productName}</h2>
                                                <p className="text-gray-600 font-bold mb-2">Product Description : {data.productDescription}</p>
                                                <p className="text-gray-600 font-bold mb-2">Category: {data.productCategory}</p>
                                                <p className="text-gray-600 font-bold mb-2">Price: ${data.productPrice}</p>

                                                <div className="mt-4">
                                                    <h4 className="text-lg font-bold mb-2">Bids from Users:</h4>
                                                    <ul className="list-disc pl-6">
                                                        {data.bidPrice.map((innerData) => (
                                                            <li>{innerData.user[0].userName} - Bid Amount: ${innerData.bidPrice}</li>
                                                        ))}

                                                    </ul>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Homepage