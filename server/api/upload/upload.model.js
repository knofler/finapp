'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  etag:String,
  signature:String,
  original_name:String,
  new_name: String,
  mimeType:String,
  path:String,
  ext:String,
  size:Number,
  upload_date:Date,
  uploaded_by:String,
  active: Boolean
});

module.exports = mongoose.model('Upload', UploadSchema);