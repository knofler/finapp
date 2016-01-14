/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Accounting = require('./accounting.model');

exports.register = function(socket) {
  Accounting.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Accounting.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('accounting:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('accounting:remove', doc);
}