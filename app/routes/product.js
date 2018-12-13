const express = require('express');
const router = express.Router();
const productController = require("./../controllers/productController");
const appConfig = require("./../../config/appConfig")


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/product`;


    app.post(`${baseUrl}/create`,  productController.createProduct);

    app.get(`${baseUrl}/:productId/view`,  productController.getProductById);

    app.get(`${baseUrl}/all`,  productController.getAllProduct);


}