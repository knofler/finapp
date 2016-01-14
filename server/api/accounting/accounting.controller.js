'use strict';

var _ = require('lodash');
var Accounting = require('./accounting.model');

// Get list of accountings
exports.index = function(req, res) {
  Accounting.find(function (err, accountings) {
    if(err) { return handleError(res, err); }
    return res.json(200, accountings);
  });
};

// Get a single accounting
exports.show = function(req, res) {
  Accounting.findById(req.params.id, function (err, accounting) {
    if(err) { return handleError(res, err); }
    if(!accounting) { return res.send(404); }
    return res.json(accounting);
  });
};

// Get monthly accountingdata 
exports.months = function(req, res) {
  var month = req.query.month;
  var days  = req.query.days;
  var year  = req.query.year;
  console.log("month is:: ", month, "days are:: ",  days, "and year is::  ", year)
  var start = new Date(year, month, 1);
  var end = new Date(year, month, days);

  console.log("start : ", start, " end : ", end);

  Accounting.find({created_at: {$gte: start, $lt: end}}, function (err, accounting) {
    if(err) { return handleError(res, err); }
    if(!accounting) { return res.send(404); }
    return res.json(accounting);
  });
};

// Get yearly accountingdata 
exports.years = function(req, res) {
  var year  = req.query.year;
  console.log("year is::  ", year)
  var start = new Date(year, 0, 1);
  var end = new Date(year, 11, 32);

  console.log("start : ", start, " end : ", end);

  Accounting.find({created_at: {$gte: start, $lt: end}}, function (err, accounting) {
    if(err) { return handleError(res, err); }
    if(!accounting) { return res.send(404); }
    return res.json(accounting);
  });
};

// Creates a new accounting in the DB.
exports.create = function(req, res) {
  Accounting.create(req.body, function(err, accounting) {
    if(err) { return handleError(res, err); }
    return res.json(201, accounting);
  });
};

// Updates an existing accounting in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Accounting.findById(req.params.id, function (err, accounting) {
    if (err) { return handleError(res, err); }
    if(!accounting) { return res.send(404); }
    var updated = _.merge(accounting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, accounting);
    });
  });
};

// Deletes a accounting from the DB.
exports.destroy = function(req, res) {
  Accounting.findById(req.params.id, function (err, accounting) {
    if(err) { return handleError(res, err); }
    if(!accounting) { return res.send(404); }
    accounting.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}