'use strict';

var _ = require('lodash');
var Poem = require('./poem.model');

// Get list of poems
exports.index = function(req, res) {
  Poem.find(function (err, poems) {
    if(err) { return handleError(res, err); }
    return res.json(200, poems);
  });
};

// Get a single poem
exports.show = function(req, res) {
  Poem.findById(req.params.id, function (err, poem) {
    if(err) { return handleError(res, err); }
    if(!poem) { return res.send(404); }
    return res.json(poem);
  });
};

// Creates a new poem in the DB.
exports.create = function(req, res) {
  Poem.create(req.body, function(err, poem) {
    if(err) { return handleError(res, err); }
    return res.json(201, poem);
  });
};

// Updates an existing poem in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poem.findById(req.params.id, function (err, poem) {
    if (err) { return handleError(res, err); }
    if(!poem) { return res.send(404); }
    var updated = _.merge(poem, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, poem);
    });
  });
};

// Deletes a poem from the DB.
exports.destroy = function(req, res) {
  Poem.findById(req.params.id, function (err, poem) {
    if(err) { return handleError(res, err); }
    if(!poem) { return res.send(404); }
    poem.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}