import React, { useEffect } from 'react'
import Loading from '../../components/loading/loading'
import { useDispatch, useSelector } from 'react-redux'
import { getPastBid } from '../../redux/actions/user/userAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'


const Bids = () => {
    const { auth, user } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPastBid(auth.token))
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    }, [dispatch, auth.token])




    return (
        <>

            {
                user?.loading ? (<Loading className='alert-container loading' />
                )
                    :
                    (

                        <div className="container mx-auto p-4">
                            {
                                user?.past_bid.map(data => (
                                    <div className="bg-white rounded-lg shadow-lg p-6 m-4" key={data._id}>
                                        <div className="flex flex-col md:flex-row items-center">
                                            <div className="md:w-1/3 mb-4 md:mb-0">
                                                <img src={data.product[0].productImage} alt="product" className="w-full rounded-lg shadow-lg" />
                                            </div>

                                            <div className="md:w-2/3 md:pl-6">
                                                <h2 className="text-gray-600 font-bold mb-2">Product Name : {data.product[0].productName}</h2>
                                                <p className="text-gray-600 font-bold mb-2">Product Description : {data.product[0].productDescription}</p>
                                                <p className="text-gray-600 font-bold mb-2">Category: {data.product[0].productCategory}</p>
                                                <p className="text-gray-600 font-bold mb-2">Price: ${data.product[0].productPrice}</p>
                                                <p className="text-gray-600 font-bold mb-2">YourBid: ${data.bidPrice}</p>


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

export default Bids
