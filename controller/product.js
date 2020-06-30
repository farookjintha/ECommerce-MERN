const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        const { name, description, price, category, quantity, shipping } = fields;

        if(!name || !description || !price || !category || !quantity || !shipping){
            res.status(400).json({
                error: "All fields are required."
            });
        }


        let product = new Product(fields);

        //File Size
        // 1 kb = 1000
        // 1 mb = 1000000


        if(files.photo){

            // If the photo size is more that 1 mb
            if(files.photo.size > 1000000){
                res.status(400).json({
                    error : "File size exceeded. Image should be less than 1 MB size."
                });
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
}
