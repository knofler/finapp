'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountingSchema = new Schema({
  created_at:Date,
  created_by:String,
  created_by_email:String,
  created_by_id:String,
  edited_at:Date,
  edited_by:String,
  edited_by_email:String,
  edited_by_id:String,
  longitude:String,
  latitude:String,
  location:String,
  Product:String,
  Cost:Number,
  Home:Number,
  Bill_Item:String,
  Bills:Number,
  Payoff:Number,
  Entertainment:Number,
  Ciger:Number,
  Groceries:Number,
  Mortgage:Number,
  Petrol:Number,
  Food:Number,
  Driving:Number,
  Toll:Number,
  Total_Expenses:Number,
  active: Boolean
});

module.exports = mongoose.model('Accounting', AccountingSchema);