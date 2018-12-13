'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let productSchema = new Schema({
    
  productId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  name: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  createdOn :{
    type: Date, 
    default: Date.now()
  }

})


mongoose.model('Product', productSchema);