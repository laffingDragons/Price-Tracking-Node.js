const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require("fs");




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
		if (!fs.existsSync('./uploads/')) {
			fs.mkdirSync('./uploads/');
		}
		cb(null, './uploads/');
	},
    filename: function(req, file, cb) {
      var date = new Date();
      var timestamp = date.getTime();

      cb(null,  timestamp + "_" +file.originalname);
    }
  });

  
  const fileFilter = (req, file, cb) => {
  //  console.log('\x1b[36m', err, '\x1b[0m');
    checkFileType(file, cb);
  };


  // Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    
    cb('Error: Images Only!');
  }
}
  
  const upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 1
    // },
    // fileFilter: fileFilter
  });

  module.exports={
      upload : upload
  }