const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const _ = require('lodash')


module.exports = {
    uploadImage: async(req,res) => {
        const {placeName, slug, address} = processPlaceNameAndAddress(req)

        try {
            let result = await streamUpload(req,slug);
            return result
        } catch (error) {
            console.log(error)
            res.redirect('/eats/new')
        }
    },
    deleteImage: async(req,res) => {
        try {
            const singleImageDelete = await cloudinary.uploader.destroy(
                req.params.slug, 
                function(error,result) {
                console.log(result, error) });
        } catch (err) {
            console.log(err)
            res.statusCode = 500
            res.redirect('/eats/'+req.params.slug)
            return  `single data delete error`
        }
    }
}


let streamUpload = (req, slug) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            {public_id: slug, //set option parameter
            folder: 'eatwat',
            overwrite:true},
          (error, result) => {
            if (result) {
                resolve(result)
            } else {
              reject(error);
            }
          }
        );

       streamifier.createReadStream(req.file.buffer).pipe(stream);
    })
}
function processPlaceNameAndAddress(req) {
    console.log(req.body)
    let placeNameAndAddress = req.body.placeNameAndAddress
    let index = placeNameAndAddress.indexOf(',')
    let placeNameAndAddressArray = [placeNameAndAddress.substring(0,index),placeNameAndAddress.substring(index+1)] 
    let placeName = placeNameAndAddressArray[0]
    let slug = _.kebabCase(placeName)
    let address = placeNameAndAddressArray[1]
    let placeNameAndAddressObject = {placeName,slug,address}
    return placeNameAndAddressObject
}