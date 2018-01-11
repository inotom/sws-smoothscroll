'use strict';

var INTERVAL = 16;
var SPEED = 1000;
var easing = require('./easing.js');

var intervalId = void 0;

module.exports = function (from, to) {
  var startTime = new Date();
  var distance = to - from;

  intervalId = setInterval(function () {
    var time = new Date() - startTime;
    var current = easing(time, from, distance, SPEED);

    if (time > SPEED) {
      clearInterval(intervalId);
      current = from + distance;
    }

    window.scrollTo(0, current);
  }, INTERVAL);
};