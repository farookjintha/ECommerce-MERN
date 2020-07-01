const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

// Getting the product by Id
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            });
        }

        req.product = product;
        next();
    })
}

//Reading the product using the productId

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

// Creating a product
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

//Removing the product from the database
exports.remove = (req, res) =>{
    let product = req.product;
    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "Product Deleted Successfully"
        });
    });
}

//To update a product
exports.update = (req, res) => {
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


        let product = req.product;
        product = _.extend(product, fields);

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


/**
 * sell/arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

 exports.list = (req, res) => {
    let order =    req.query.order ? req.query.order : "asc";
    let sortBy =    req.query.sortBy ? req.query.sortBy : "_id";
    let limit =    req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) =>{
            if(err){
                return res.status(400).json({
                    error: "Product not found"
                });
            }

            res.send(products);
        })

 }