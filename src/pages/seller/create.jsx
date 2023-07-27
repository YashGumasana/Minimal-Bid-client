import React, { useState, useRef } from 'react'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useDispatch, useSelector } from 'react-redux'
import { uploadproduct } from '../../redux/actions/seller/sellerAction'


const Create = () => {
    const { auth, } = useSelector(state => state);

    const fileInputRef = useRef(null);
    const initialState = {
        productName: '', productDescription: '', productCategory: '', productPrice: 0
    }

    const [productData, setProductData] = useState(initialState)
    const { productName, productDescription, productCategory, productPrice } = productData

    const dispatch = useDispatch()

    const [productImage, setProductImage] = useState('')

    const handleUploadProfile = (e) => {


        if (e.target.files.length > 0) {
            const file = e.target.files[0]
            // const photo = URL.createObjectURL(file)
            const err = checkImage(file)
            if (err) {
                return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
            }
            setProductImage(file)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        console.log('name value', name, value);
        setProductData({ ...productData, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(uploadproduct({ productData, productImage, auth }))
        setProductData(initialState);
        fileInputRef.current.value = '';
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Product Upload</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
                            <input type="text" id="productName" name="productName" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" onChange={handleChangeInput} value={productName} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Product Description</label>
                            <textarea id="productDescription" name="productDescription" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" onChange={handleChangeInput} value={productDescription} required></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productCategory" className="block text-gray-700 font-bold mb-2">Product Category</label>
                            <input type="text" id="productCategory" name="productCategory" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" onChange={handleChangeInput} value={productCategory} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">Product Price</label>
                            <input type="number" step="0.01" id="productPrice" name="productPrice" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" onChange={handleChangeInput} value={productPrice} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">Product Image</label>
                            <input type="file" id="productImage" name="productImage" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" accept="image/*" required onChange={handleUploadProfile} ref={fileInputRef} />
                        </div>
                        <button type="submit" className="w-full website-seller-bg text-white py-2 px-4 rounded-lg ">Upload Product</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Create
