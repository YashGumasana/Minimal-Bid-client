export const checkImage = (file) => {
    let err = ""
    if (!file) {
        return err = "File does not exist."
    }

    if (file.size > 1024 * 1024) // 1mb
    {
        err = "The largest image size is 1mb"
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        err = "Image format is incorrect"
    }

    return err
}

export const imageUpload = async (images) => {
    console.log("image upload", images);
    let imgArr = [];

    for (const item of images) {
        const formData = new FormData()

        if (item.camera) {
            formData.append("file", item.camera)
        }
        else {
            formData.append("file", item)
        }

        formData.append("upload_preset", "qfpmvyxn")  // chnage the preset for uploading in others folder
        // formData.append("cloud_name", "dkqimhvk8")

        const res = await fetch("https://api.cloudinary.com/v1_1/dkqimhvk8/upload", {
            method: "POST",
            body: formData
        })

        console.log("response cloudinary", res);
        const data = await res.json()
        imgArr.push({ public_id: data.public_id, url: data.url })
    }
    console.log("image arr", imgArr);
    return imgArr;
}