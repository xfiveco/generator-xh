'use strict';

var fileName = '.yo-rc.json';
var fs = require('fs');
var Q = require('q');
var deferred = Q.defer();

var checkConfig = {
  fileContent: function () {
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  }
};

module.exports.checkConfig = checkConfig;