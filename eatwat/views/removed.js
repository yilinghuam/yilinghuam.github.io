// for express-fileupload with cloudinary


// const fileupload = require('express-fileupload');
// app.use(fileupload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

// if image is updated then new image file uploaded
        // if (req.files !== null) {
        //     let image = req.files.image.tempFilePath

        //     try {
        //         const upload= await cloudinary.uploader.upload(image, 
        //             {public_id: slug, //set option parameter
        //             folder: 'eatwat',
        //             overwrite: true} , // allow overwriting if image already exist	
        //             function(error, result) {
        //                 imageURL = result.url
        //             });
        //     } catch (error) {
        //         console.log(error)
        //         return `single upload error`
        //     }
        // }