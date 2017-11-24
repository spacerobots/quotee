'use strict';
var models = require('../models');

var Sequelize = require("sequelize")
var Models = require("../models")
// var Quote = require("quote")

exports.quoteIdGET = function(args, res, next) {
  /**
   * get a quote by id
   *
   * id Integer quote id
   * no response value expected for this operation
   **/

  res.end();
}

exports.quotes = function(args, res, next) {
  /**
   * fetches all the quotes
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "quote" : "Don\\'t be a cricket. You\\'re a cricket",
  "id" : 1234,
  "title" : "You're a cricket"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');

    
    //Checking connection status
    Models.quote.findAndCount()
    .then(result => {
      console.log(result.count);
      console.log(result.rows);
    });

    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {

    Models.quote.findAndCount()
    .then(result => {
      console.log(result.count);
      console.log(result.rows);
    });

    res.end();
  }
}

exports.quotesForTagIdGET = function(args, res, next) {
  /**
   * get all quotes for a tag
   *
   * id Integer tag id
   * no response value expected for this operation
   **/
  res.end();
}

exports.tags = function(args, res, next) {
  /**
   * gets all the tags
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "id" : 456,
  "tag" : "hash8mark"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.tagsForQuoteIdGET = function(args, res, next) {
  /**
   * get all the tags for a quote
   *
   * id Integer quote id
   * no response value expected for this operation
   **/
  res.end();
}

