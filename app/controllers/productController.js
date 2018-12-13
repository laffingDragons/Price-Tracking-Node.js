const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const mail = require('../libs/mailLib');
const fs = require("fs");

/* Models */
const ProductModel = mongoose.model('Product');


/* Get all Product Details */
let getAllProduct = (req, res) => {

                ProductModel.find()
                    .select(' -__v -_id')
                    .lean()
                    .exec((err, result) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'ProductController: getAllProduct', 10)
                            let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
                            res.send(apiResponse)
                        } else if (check.isEmpty(result)) {
                            logger.info('No Product Found', 'ProductController: getAllProduct')
                            let apiResponse = response.generate(true, 'No Product Found', 404, null)
                            res.send(apiResponse)
                        } else {
                            let apiResponse = response.generate(false, 'All Product Details Found', 200, result);
                            res.send(apiResponse);
                        }
                    })
        
}// end get all Products



let getProductById = (req, res) => {

    ProductModel.findOne({ 'productId': req.params.productId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'ProductController: getSingleProduct', 10)
                let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Product Found', 'ProductController:getSingleProduct')
                let apiResponse = response.generate(true, 'No Product Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Product Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single Product


let createProduct = (req, res) => {
    console.log('\x1b[36m', req.body, '\x1b[0m');

    ProductModel.findOne({ 'name': req.body.name })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'ProductController: getSingleProduct', 10)
                let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {

                let newProduct = new ProductModel({
                    productId: shortid.generate(),
                    name: req.body.name,
                    price: req.body.price,
                    createdOn: time.now()
                })
        
        
                newProduct.save((err, newProduct) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'ProductController: createProduct', 10)
                        let apiResponse = response.generate(true, 'Failed to create new Product', 500, null)
                        res.send(apiResponse)
                    } else {
                        let newProductObj = newProduct.toObject();
                        let apiResponse = response.generate(false, 'Product Created successfully', 200, newProductObj)
                        res.send(apiResponse)
                    }
                })
        

            } else {

                let apiResponse = response.generate(true, 'Product already exist', 400, result)
                res.send(apiResponse)
            }
        })
  

}
// end create Product function

module.exports = {

    createProduct:createProduct,
    getProductById: getProductById,
    getAllProduct: getAllProduct,
    
}