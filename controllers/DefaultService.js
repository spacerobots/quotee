'use strict';
var models = require('../models');

var Sequelize = require("sequelize")
var Models = require("../models")

var request = require("request")

exports.quoteRandomGET = function(args, res, next) {

  Models.quote.find({
    order: [
          Sequelize.fn( 'RAND' ),
        ]
  }).then( result => {
    res.writeHead(200,{"Content-Type": "application/json"});
    res.end(JSON.stringify(result));
  })

}

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

    Models.quote.findAndCount()
    .then(result => {
      
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(result));
    });

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

exports.slackrandomPOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * token (String)
  * team_id (String)
  * team_domain (String)
  * channel_id (String)
  * channel_name (String)
  * used_id (String)
  * user_name (String)
  * text (String)
  **/
 	
  var channel = args.channel_id.value
  Models.quote.find({
    order: [
          Sequelize.fn( 'RAND' ),
        ]
  }).then( result => {

    var slackURL = "https://slack.com/api/chat.postMessage";
    var quote = result.quote;
    var slackBody = {
      "text" : quote,
      "channel" : channel,
    }
	
    request.post({
      url: slackURL,	
    	headers: {
        "content-type": "application/json",
        "Authorization": "Bearer "
      },
      body: slackBody,
	    json: true
    },function(error, response, body) {
        if (error) {
          return console.log(error);
        }
    })

    res.end();
  })
}

exports.searchquotesGET = function(args, res, next) {

  var searchTerm = args.searchterm.value;
  
  var op = Sequelize.Op
  Models.quote.findAndCountAll({
    where: {
      quote: {
        [op.like] : "%" + searchTerm + "%"
      }
    },
    limit: 10
  }).then(result => {
    res.writeHead(200, {"Content-Type": "application/json"});
    var jsonResults = JSON.stringify(result);

    res.end(jsonResults);
  });
  
}