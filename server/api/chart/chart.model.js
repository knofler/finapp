'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChartSchema = new Schema({
  isActive:Boolean,
  isTodo: Boolean,
  goalName: String,
  goalDesc: String,
  taskItem:String,
  latitude:String,
  longitude:String,
  userLocation: String,
  data1:Number,
  data2:Number,
  data3:Number,
  data4:Number,
  data5:Number,
  data6:Number,
  isFav:Boolean,
  contact:String,
  taskProgress:Number,
  created_by: String,
  created_at:Date,
  goal_completed:Date,
  active: Boolean
});

module.exports = mongoose.model('Chart', ChartSchema);