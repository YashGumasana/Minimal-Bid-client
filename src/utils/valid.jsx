export const valid = ({ userName, fullName, email, phoneNumber, password, confirmPassword, category }) => {
    let err = ''
    if (!userName) {
        err = "Please add your user name."
    } else if (userName.replace(/ /g, '').length > 25) {
        err = "User name is up to 25 characters long."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }
    if (!fullName) {
        err = "Please add your full name."

    } else if (fullName.length > 25) {
        err = "Full name is up to 25 characters long."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }



    if (!email) {
        err = "Please add your email."
    } else if (!validateEmail(email)) {
        err = "Email format is incorrect."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!phoneNumber) {
        err = "Please add your phoneNumber."
    } else if (phoneNumber.length !== 10) {
        err = "phoneNumber must be at least 10 characters."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!(category === 0 || category === 1)) {
        err = "Invalid category."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!password) {
        err = "Please add your password."
    } else if (password.length < 6) {
        err = "Password must be at least 6 characters."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (password !== confirmPassword) {
        err = "Password and Confirm password did not match."
    }
    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }


}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export const validProduct = ({ productName, productDescription, productCategory, productPrice }) => {
    let err = ''
    if (!productName) {
        err = "Please add Product Name"
    } else if (productName.replace(/ /g, '').length > 25) {
        err = "Product Name is up to 25 characters long."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }
    if (!productDescription) {
        err = "Please add Product Description"
    } else if (productDescription.replace(/ /g, '').length > 300) {
        err = "Product Description is up to 300 characters long."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!productCategory) {
        err = "Please add Product Category"
    } else if (productCategory.replace(/ /g, '').length > 25) {
        err = "Product Category is up to 25 characters long."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!productPrice) {
        err = "Please add Product Price"
    }
    else if (productPrice < 1) {
        err = "Please Set Valid Price"
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }



}